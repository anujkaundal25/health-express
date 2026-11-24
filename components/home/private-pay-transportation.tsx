import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/shared/icons";

const privatePayServices = [
  {
    title: "Doctor Appointments",
    text: "Comfortable rides to routine visits, clinics, and specialists.",
    icon: "stethoscope",
  },
  {
    title: "Hospital Discharges",
    text: "A dependable ride home or to your next care destination.",
    icon: "hospital",
  },
  {
    title: "Wheelchair Transportation",
    text: "Accessible travel in vehicles equipped for wheelchair users.",
    icon: "wheelchair",
  },
  {
    title: "Personal Medical Rides",
    text: "Private, one-to-one transportation planned around your needs.",
    icon: "heart",
  },
  {
    title: "Scheduled Transportation",
    text: "Plan ahead for recurring appointments and important visits.",
    icon: "calendar",
  },
] as const;

export default function PrivatePayTransportation() {
  return (
    <section className="private-pay-section" id="private-pay-transportation">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Comfort, Care &amp; Convenience</div>
          <h2>Private Pay <span className="gold">Transportation</span></h2>
          <p>Personalized, non-emergency rides for the care and appointments that matter.</p>
          <div className="divider" />
        </div>
        <div className="private-pay-layout">
          <div className="private-pay-photo reveal">
            <Image
              src="/images/home/van-interior.jpg"
              alt="Comfortable interior of a Health Express transportation van"
              fill
              sizes="(max-width: 960px) 100vw, 42vw"
            />
            <div className="private-pay-photo-caption">
              <span>Private rides. Personal care.</span>
              <strong>Travel with confidence</strong>
            </div>
          </div>
          <div className="private-pay-content">
            <div className="private-pay-grid">
              {privatePayServices.map((service) => (
                <article className="private-pay-card reveal" key={service.title}>
                  <div className="private-pay-icon"><Icon name={service.icon} /></div>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="private-pay-cta reveal">
              <p>Ready to arrange a private ride?</p>
              <Link href="/schedule" className="btn btn-gold">Request a Ride <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
