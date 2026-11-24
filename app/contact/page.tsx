import type { Metadata } from "next";
import { AreaMap } from "@/components/shared/blocks";
import { ContactForm } from "@/components/shared/forms";
import PageHero from "@/components/shared/page-hero";
import { site } from "@/components/data/site";

export const metadata: Metadata = {
  title: "Contact Us | Health Express Ambulette – (917) 514-3080",
  description:
    "Contact Health Express Ambulette at 155 Water Street, Brooklyn NY 11201. Call (917) 514-3080, WhatsApp or email info@healthexpressambulette.com. Open 24/7.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const cards = [
    { icon: "📞", title: "Call us", lines: [site.phone], href: site.phoneHref },
    { icon: "💬", title: "WhatsApp", lines: ["Message us on WhatsApp"], href: site.whatsapp, ext: true },
    { icon: "📧", title: "Email", lines: [site.email], href: `mailto:${site.email}` },
    { icon: "📍", title: "Address", lines: [site.address.full], href: site.mapLink, ext: true },
    { icon: "🕒", title: "Availability", lines: ["Open 24/7", "Same-day requests by phone"] },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={<>Get in <span className="gold">Touch</span></>}
        text="Questions about a ride, Medicaid coverage or our services? Call, message or send us the form — our dispatch team is available 24/7."
        photo="ph-van2"
        crumbs={[{ label: "Contact Us", href: "/contact" }]}
      />
      <section style={{ paddingTop: 70 }}>
        <div className="wrap contact-grid">
          <ContactForm />
          <div className="contact-cards">
            {cards.map((c) => {
              const inner = (
                <>
                  <span className="c-icon">{c.icon}</span>
                  <span>
                    <strong>{c.title}</strong>
                    {c.lines.map((l) => <em key={l}>{l}</em>)}
                  </span>
                </>
              );
              return c.href ? (
                <a key={c.title} className="contact-card reveal" href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
              ) : (
                <div key={c.title} className="contact-card reveal">{inner}</div>
              );
            })}
            <div className="social reveal" style={{ marginTop: 6 }}>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
      </section>
      <AreaMap />
    </>
  );
}
