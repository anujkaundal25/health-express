import { bookingOptions } from "@/components/data/site";
import {
  bad,
  clean,
  forwardWeb3Forms,
  ok,
  unavailable,
  validEmail,
  validPhone,
} from "@/lib/forms";

/** "Schedule Your Appointment" — short form (service + phone) and the full /schedule form. */
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b) return bad("Invalid request.");
  const data = {
    service: clean(b.service, 40),
    phone: clean(b.phone, 25),
    name: clean(b.name, 120),
    email: clean(b.email, 160),
    pickup: clean(b.pickup, 300),
    date: clean(b.date, 20),
    time: clean(b.time, 20),
    message: clean(b.message, 2000),
    receivedAt: new Date().toISOString(),
  };
  if (!bookingOptions.includes(data.service)) return bad("Please choose a transportation service.");
  if (!validPhone(data.phone)) return bad("Please enter a valid contact number.");
  if (!validEmail(data.email)) return bad("Please enter a valid email address.");

  return (await forwardWeb3Forms("booking", data)) ? ok() : unavailable();
}
