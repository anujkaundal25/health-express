import { bad, clean, forward, ok, validEmail, validPhone } from "@/lib/forms";

const REQUIRED_SELECTS = ["diploma", "defensive", "bgCheck", "drugTest", "dmvAbstract", "medReport", "annualReview", "felony", "art19a", "preService", "weekends"];
const FILES = ["docLicense", "docSsn", "docMedical"];
const TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_TOTAL = 4.4 * 1024 * 1024;

/**
 * Driver applications. These contain sensitive personal documents, so nothing personal is logged —
 * the full application (with files) is only forwarded to FORMS_WEBHOOK_URL.
 */
export async function POST(req: Request) {
  const fd = await req.formData().catch(() => null);
  if (!fd) return bad("Invalid request.");

  if (!clean(fd.get("fullName"))) return bad("Please enter your full name.");
  if (!validPhone(clean(fd.get("phone")))) return bad("Please enter a valid phone number.");
  const email = clean(fd.get("email"));
  if (!email || !validEmail(email)) return bad("Please enter a valid email address.");
  for (const k of REQUIRED_SELECTS) if (!clean(fd.get(k))) return bad("Please answer all required (*) questions.");
  if (fd.get("certify") !== "yes") return bad("Please confirm the information is true and complete.");

  let total = 0;
  for (const k of FILES) {
    const f = fd.get(k);
    if (!(f instanceof File) || f.size === 0) return bad("Please upload all three required documents.");
    if (!TYPES.includes(f.type)) return bad("Documents must be PDF, JPG or PNG files.");
    total += f.size;
  }
  if (total > MAX_TOTAL) return bad("Your documents are too large. Please keep them under 4 MB in total.");

  console.log("[driver] application received", new Date().toISOString());
  const sent = await forward("driver", fd);
  if (!sent && process.env.NODE_ENV === "production") {
    return NextResponseError();
  }
  return ok();
}

function NextResponseError() {
  return new Response(
    JSON.stringify({ error: "We couldn't submit your application right now. Please call us or email info@healthexpressambulette.com." }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );
}
