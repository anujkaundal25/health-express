import { contactLocations } from "@/components/data/site";
import {
  bad,
  clean,
  forwardWeb3Forms,
  ok,
  unavailable,
  validEmail,
  validPhone,
} from "@/lib/forms";

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

  return (await forwardWeb3Forms("contact", data)) ? ok() : unavailable();
}
