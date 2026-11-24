import Image from "next/image";
import Link from "next/link";
import { TiltCard } from "@/components/Effects";
import Hero3D from "@/components/Hero3D";
import { Icon } from "@/components/Icons";
import {
  fleetPoints, footerServices, homeServiceText, marquee, services, site, steps, transportServices,
} from "@/lib/site";

export function Hero() {
  return (
    <section className="hero" id="home">
      <svg className="ecg" viewBox="0 0 600 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline fill="none" stroke="#c9a55c" strokeWidth="1.5" points="0,60 220,60 235,50 245,70 260,10 278,95 292,60 310,55 330,60 600,60" />
      </svg>
      <Hero3D />
      <div className="hero-shade" />
      <div className="wrap">
        <div className="hero-content">
          <div className="eyebrow">NYC Medical Transport</div>
          <h1>
            <span>Your Trusted Partner in</span>
            <span className="gold">Ambulette Services</span>
          </h1>
          <p>
            We provide reliable and comfortable ambulette service NYC and non-emergency ambulette transportation
            services for medical appointments. We also accept Medicaid for non-emergency medical transport.
          </p>
          <div className="hero-ctas">
            <a href={site.phoneHref} className="btn btn-gold">📞 Call to Schedule</a>
            <a href="#schedule" className="btn btn-ghost">Schedule Online</a>
          </div>
          <ul className="hero-stats">
            <li><strong>24/7</strong><span>Open every day</span></li>
            <li><strong>{site.since}</strong><span>Serving NYC since</span></li>
            <li><strong>Medicaid</strong><span>Accepted</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function BookStrip() {
  return (
    <div className="book-strip wrap reveal" id="location">
      <div className="book-card">
        <div>
          <h3 className="gold">Need Transportation?</h3>
          <a href="#schedule" className="btn btn-gold" style={{ padding: "11px 24px" }}>Book Now</a>
        </div>
        <div>
          <h3>Location</h3>
          <div className="locs">
            <Link href="/ambuletteService" className="pill">Brooklyn</Link>
            <Link href="/southBrooklyn" className="pill">South Brooklyn</Link>
            <span className="pill">Staten Island</span>
          </div>
        </div>
        <div>
          <Link href="/schedule" className="btn btn-ghost">Make an Appointment</Link>
        </div>
      </div>
    </div>
  );
}

export function Marquee() {
  const items = [...marquee, ...marquee]; // doubled for a seamless loop
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track gold">
        {items.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

export function WorkPartners() {
  const partners = [
    { name: "MAS", icon: "hospital" as const },
    { name: "Ride Health", icon: "heart" as const },
    { name: "Sentry", icon: "shield" as const },
    { name: "MTM", icon: "van" as const },
  ];

  return (
    <section className="work-partners" id="partners">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Trusted Transportation Partners</div>
          <h2>We <span className="gold">Work</span></h2>
          <div className="divider" />
        </div>
        <div className="partner-grid">
          {partners.map((partner) => (
            <div className="partner-card reveal" key={partner.name}>
              <div className="partner-icon"><Icon name={partner.icon} /></div>
              <h3>{partner.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Our Ambulette Services</div>
          <h2>Ambulette Services that you can <span className="gold">depend on</span></h2>
          <p>We take pride in our medical transportation Ambulette services NYC.</p>
          <div className="divider" />
        </div>
        <div className="grid-3">
          {services.map((sv) => {
            const h = homeServiceText[sv.slug];
            return (
              <TiltCard key={sv.slug}>
                <div className={`card-photo photo ${h.photo}`} />
                <div className="icon3d"><Icon name={h.icon} /></div>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
                <Link href={`/services/${sv.slug}`} className="card-link">View service →</Link>
              </TiltCard>
            );
          })}
          <div className="all-services-link reveal"><Link href="/services" className="btn btn-ghost">All 5 Services →</Link></div>
        </div>
      </div>
    </section>
  );
}

export function Fleet() {
  return (
    <section className="fleet" id="fleet">
      <div className="wrap fleet-grid">
        <div className="photo-stack reveal">
          <div className="since-badge"><div><span>Serving NYC since</span><strong>{site.since}</strong></div></div>
          <div className="ps ps1 photo ph-van1"><span className="ps-tag">Our Fleet</span></div>
          <div className="ps ps2 photo ph-interior"><span className="ps-tag">State of Art Features</span></div>
        </div>
        <div>
          <div className="eyebrow reveal">About Us</div>
          <h2 className="reveal" style={{ fontSize: "clamp(1.8rem,3.4vw,2.6rem)", lineHeight: 1.2, marginBottom: 16 }}>
            Health Express Ambulette Inc. <span className="gold">transportation Fleet</span>
          </h2>
          <p className="reveal" style={{ color: "var(--muted)", marginBottom: 34 }}>
            Providing reliable, safe, and comfortable rides with professional medical transportation NYC for patients
            in need of transportation.
          </p>
          {fleetPoints.map((f, i) => (
            <div className="fleet-item reveal" key={f.title}>
              <div className="num gold">{String(i + 1).padStart(2, "0")}</div>
              <div><h3>{f.title}</h3><p>{f.text}</p></div>
            </div>
          ))}
          <Link href="/about" className="btn btn-ghost reveal" style={{ marginTop: 10 }}>More About Us →</Link>
        </div>
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <section style={{ paddingTop: 60 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>How to start Ambulette service in <span className="gold">3 simple steps</span></h2>
          <div className="divider" />
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step reveal" key={s.title}>
              <div className="step-num">{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PhotoBand() {
  return (
    <section className="photo-band photo ph-slide2" style={{ padding: 0 }}>
      <div className="wrap">
        <div className="eyebrow">Brooklyn, New York</div>
        <h2>We’re Open <span className="gold">24/7.</span></h2>
        <p>Same Day Request? Call Us!</p>
        <a href={site.phoneHref} className="btn btn-gold">📞 {site.phone}</a>
      </div>
    </section>
  );
}

export function TransportServices() {
  return (
    <section style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Health Express Ambulette <span className="gold">Transportation Services</span></h2>
          <p>Schedule private medical transportation services NYC for all your medical appointments.</p>
          <div className="divider" />
        </div>
        <div className="grid-3">
          {transportServices.map((s) => (
            <TiltCard key={s.title}>
              <div className="icon3d"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FacilitiesServices() {
  const facilities = [
    { title: "Dialysis Centers", icon: "dialysis" as const },
    { title: "Chemotherapy Centers", icon: "stethoscope" as const },
    { title: "Nursing Homes", icon: "hospital" as const },
    { title: "Adult Day Cares", icon: "daycare" as const },
    { title: "Children's Day Cares", icon: "heart" as const },
    { title: "Standing Orders", icon: "calendar" as const },
  ];

  return (
    <section className="facilities-section" id="facilities">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Reliable Facility Transportation</div>
          <h2>Facilities &amp; <span className="gold">Healthcare Transportation Services</span></h2>
          <div className="divider" />
        </div>
        <div className="facility-grid">
          {facilities.map((facility) => (
            <div className="facility-card reveal" key={facility.title}>
              <div className="facility-icon"><Icon name={facility.icon} /></div>
              <h3>{facility.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 18 }}>
              <Image className="logo-img" src="/images/logo-coin.png" alt="Health Express Ambulette logo" width={130} height={130} />
              <span>Health Express<small>AMBULETTE</small></span>
            </Link>
            <h4 style={{ marginTop: 22 }}>Follow Us</h4>
            <div className="social">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/ambuletteService">Ambulette Service Brooklyn</Link></li>
              <li><Link href="/southBrooklyn">South Brooklyn</Link></li>
              <li><Link href="/faq">F.A.Q</Link></li>
              <li><Link href="/driverForm">Apply as Driver</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>{footerServices.map((f) => <li key={f.href}><Link href={f.href}>{f.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={site.phoneHref}>📞 {site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>📧 {site.email}</a></li>
              <li><a href={site.mapLink} target="_blank" rel="noopener noreferrer">📍 {site.address.full}</a></li>
              <li>🕒 Open 24/7</li>
            </ul>
          </div>
        </div>
        <p className="tags">ambulette transportation, wheelchair assistance, private ride NYC, medicaid pickup, safe travel</p>
        <p className="copy">©{new Date().getFullYear()} {site.legalName} All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="fab">
      <a href={site.whatsapp} className="fab-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
        </svg>
      </a>
      <a href={site.phoneHref} className="fab-call" aria-label={`Call ${site.phone}`}>📞</a>
    </div>
  );
}
