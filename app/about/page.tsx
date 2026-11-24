import type { Metadata } from "next";
import { CallBand, Split } from "@/components/shared/blocks";
import { TiltCard } from "@/components/shared/effects";
import FleetCarousel from "@/components/shared/fleet-carousel";
import PageHero from "@/components/shared/page-hero";
import Steps from "@/components/home/steps";
import { about, site } from "@/components/data/site";

export const metadata: Metadata = {
  title: "About Us | Health Express Ambulette – NYC Medical Transportation Since 2009",
  description:
    "Health Express Ambulette Inc. has provided luxury ambulette and wheelchair medical transportation across NYC since 2009. Licensed by USDOT & NYSDOT, registered NY State Medicaid provider.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>Health Express Ambulette <span className="gold">Inc.</span></>}
        text={about.intro}
        photo="ph-amb"
        crumbs={[{ label: "About", href: "/about" }]}
      />

      <section style={{ paddingTop: 60, paddingBottom: 40 }}>
        <div className="wrap stat-row">
          {about.stats.map((s) => (
            <div className="stat reveal" key={s.label}>
              <strong className="gold">{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Split eyebrow="Our Mission" title={<>Safe, comfortable and <span className="gold">on time</span></>} photo="ph-van5">
        <p>{about.mission}</p>
        <p>We serve patients across all five boroughs of New York City for doctor visits, hospital discharges and non-emergency medical travel, and we’re open 24/7 for same-day requests.</p>
        <ul className="ticks">
          {about.values.map((v) => <li key={v}>{v}</li>)}
        </ul>
      </Split>

      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Why families <span className="gold">trust us</span></h2>
            <div className="divider" />
          </div>
          <div className="grid-4 grid-3">
            {about.highlights.map((h, i) => (
              <TiltCard key={h.title}>
                <div className="num gold" style={{ fontFamily: "var(--font-oswald)", fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <Split eyebrow="Licensed & Registered" title={<>Credentials you can <span className="gold">count on</span></>} photo="ph-van6" reverse>
        <ul className="ticks">
          {about.credentials.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <p style={{ marginTop: 18 }}>Our drivers speak English, Spanish and Russian. Call us any time at <a className="gold-link" href={site.phoneHref}>{site.phone}</a>.</p>
      </Split>

      <FleetCarousel />
      <Steps />
      <CallBand />
    </>
  );
}
