import { contactLocations } from "@/components/data/site";
import { bad, clean, forward, ok, validEmail, validPhone } from "@/lib/forms";

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b) return bad("Invalid request.");
  const data = {
    name: clean(b.name, 120),
    phone: clean(b.phone, 25),
    email: clean(b.email, 160),
    location: clean(b.location, 40),
    message: clean(b.message, 3000),
    receivedAt: new Date().toISOString(),
  };
  if (!data.name) return bad("Please enter your name.");
  if (!validPhone(data.phone)) return bad("Please enter a valid phone number.");
  if (!validEmail(data.email)) return bad("Please enter a valid email address.");
  if (!contactLocations.includes(data.location)) return bad("Please select a location.");
  if (!data.message) return bad("Please enter a message.");

  const sent = await forward("contact", data);
  // no webhook set yet? keep the request in the Vercel logs so it is not lost
  if (!sent) console.log("[contact]", data);
  return ok();
}
