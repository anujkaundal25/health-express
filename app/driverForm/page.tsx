import type { Metadata } from "next";
import { DriverForm } from "@/components/Forms";
import PageHero from "@/components/PageHero";
import { driverRequirements, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply as a Driver | Health Express Ambulette",
  description:
    "Join the Health Express Ambulette team. Apply online as an ambulette driver in Brooklyn, NY — Article 19-A compliant drivers wanted.",
  alternates: { canonical: "/driverForm" },
};

export default function DriverPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>Apply as a <span className="gold">Driver</span></>}
        text="Join a team that has served New York City since 2009. Fill in the application below — fields marked * are required."
        photo="ph-van1"
        crumbs={[{ label: "Apply as Driver", href: "/driverForm" }]}
        cta={false}
      />
      <section style={{ paddingTop: 70 }}>
        <div className="wrap svc-layout">
          <div className="reveal"><DriverForm /></div>
          <aside className="svc-side">
            <div className="side-card reveal">
              <h3>What you’ll need</h3>
              <ul className="ticks">
                {driverRequirements.map((r) => <li key={r}>{r}</li>)}
              </ul>
              <p style={{ marginTop: 16 }}>Questions? Call <a href={site.phoneHref}>{site.phone}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
