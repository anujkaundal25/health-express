import type { Metadata } from "next";
import { ScheduleFullForm } from "@/components/Forms";
import PageHero from "@/components/PageHero";
import { Steps } from "@/components/Sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedule an Ambulette Ride Online | Health Express Ambulette",
  description:
    "Schedule your ambulette, wheelchair, 2 man assist or livery ride online with Health Express Ambulette. Same-day requests: call (917) 514-3080.",
  alternates: { canonical: "/schedule" },
};

export default function SchedulePage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Ride"
        title={<>Schedule your ride with <span className="gold">Health Express Ambulette</span></>}
        text="We guarantee that our staff and service will give you the best transportation — for you, your parents or any family member."
        photo="ph-slide2"
        crumbs={[{ label: "Schedule", href: "/schedule" }]}
        cta={false}
      />
      <section style={{ paddingTop: 70 }}>
        <div className="wrap svc-layout">
          <div><ScheduleFullForm /></div>
          <aside className="svc-side">
            <div className="side-card gold-card reveal">
              <h3>Same Day Request?</h3>
              <p>Call us now — we’re open 24/7.</p>
              <a href={site.phoneHref} className="btn btn-dark">📞 {site.phone}</a>
              <ul className="ticks dark">
                <li>Your driver calls 15 minutes before pickup</li>
                <li>Medicaid accepted for qualified riders</li>
                <li>Wheelchair provided when needed</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <Steps />
    </>
  );
}
