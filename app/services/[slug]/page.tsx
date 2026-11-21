import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallBand, ServicesGrid } from "@/components/Blocks";
import Faq from "@/components/Faq";
import { ScheduleFullForm } from "@/components/Forms";
import { Icon } from "@/components/Icons";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { servicePages, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = servicePages.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, images: [s.image] },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = servicePages.find((x) => x.slug === slug);
  if (!s) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: "Non-emergency medical transportation",
    description: s.intro,
    provider: { "@id": `${site.url}/#business` },
    areaServed: site.areasServed.map((a) => ({ "@type": "Place", name: a })),
    url: `${site.url}/services/${s.slug}`,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(s.faqs)} />
      <PageHero
        eyebrow="Our Services"
        title={s.title.split(" ").length > 2
          ? <>{s.title.split(" ").slice(0, -2).join(" ")} <span className="gold">{s.title.split(" ").slice(-2).join(" ")}</span></>
          : <span className="gold">{s.title}</span>}
        text={s.intro}
        photo={s.heroPhoto}
        crumbs={[{ label: "Services", href: "/services" }, { label: s.title, href: `/services/${s.slug}` }]}
      />

      <section style={{ paddingTop: 70 }}>
        <div className="wrap svc-layout">
          <div className="svc-main">
            {s.sections.map((sec) => (
              <div className="svc-block reveal" key={sec.heading}>
                <div className="icon3d small"><Icon name={s.icon} /></div>
                <div>
                  <h2>{sec.heading}</h2>
                  <p>{sec.text}</p>
                </div>
              </div>
            ))}
            <div className="svc-block reveal">
              <div className="icon3d small"><Icon name="heart" /></div>
              <div>
                <h2>{s.bullets.heading}</h2>
                <ul className="ticks two-col">
                  {s.bullets.items.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
            <div className="svc-block reveal">
              <div className="icon3d small"><Icon name="van" /></div>
              <div>
                <h2>Areas we serve</h2>
                <ul className="chips left">
                  {site.areasServed.map((a) => <li key={a}>{a}</li>)}
                </ul>
                <p style={{ marginTop: 14 }}>
                  See our <Link className="gold-link" href="/ambuletteService">Brooklyn ambulette service</Link> and{" "}
                  <Link className="gold-link" href="/southBrooklyn">South Brooklyn</Link> pages.
                </p>
              </div>
            </div>
          </div>
          <aside className="svc-side">
            <div className="side-card reveal">
              <h3>Book this ride</h3>
              <p>Same day request? Call <a href={site.phoneHref}>{site.phone}</a> — we’re open 24/7.</p>
              <ScheduleFullForm />
            </div>
          </aside>
        </div>
      </section>

      <Faq items={s.faqs} title={<>{s.title} <span className="gold">FAQs</span></>} id="service-faq" />
      <ServicesGrid title={<>Other <span className="gold">services</span></>} exclude={s.slug} />
      <CallBand />
    </>
  );
}
