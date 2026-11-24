import Link from "next/link";
import { TiltCard } from "@/components/shared/effects";
import { Icon } from "@/components/shared/icons";
import { servicePages, site } from "@/components/data/site";

/** Service cards linking to their detail pages. */
export function ServicesGrid({ title, exclude }: { title?: React.ReactNode; exclude?: string }) {
  const list = servicePages.filter((s) => s.slug !== exclude);
  return (
    <section className="services-all">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Our Ambulette Services</div>
          <h2>{title ?? <>Ambulette Services that you can <span className="gold">depend on</span></>}</h2>
          <div className="divider" />
        </div>
        <div className={`grid-3${list.length === 4 ? " grid-4" : ""}`}>
          {list.map((s) => (
            <TiltCard key={s.slug}>
              <div className={`card-photo photo ${s.photo}`} />
              <div className="icon3d"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <Link href={`/services/${s.slug}`} className="card-link">View service →</Link>
            </TiltCard>
          ))}
        </div>
        <p className="help-line reveal">
          Need help choosing? <a href={site.phoneHref}>Call us now: {site.phone}</a>
        </p>
      </div>
    </section>
  );
}

/** Gold "Same day request? Call us" band. */
export function CallBand() {
  return (
    <section className="call-band-wrap">
      <div className="wrap">
        <div className="call-band reveal">
          <div>
            <div className="eyebrow" style={{ color: "var(--blue-900)" }}>Brooklyn, New York</div>
            <h2>Same Day Request? Call Us!</h2>
            <p>We’re Open 24/7.</p>
          </div>
          <div className="call-band-ctas">
            <a href={site.phoneHref} className="btn btn-dark">📞 {site.phone}</a>
            <Link href="/schedule" className="btn btn-outline-dark">Schedule Online</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Brooklyn service area cards + Google Map. */
export function AreaMap() {
  return (
    <section style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="area">
          <div className="area-card reveal">
            <div className="eyebrow">Service Area</div>
            <h2>Ambulette Service <span className="gold">Brooklyn</span></h2>
            <p style={{ color: "var(--muted)" }}>
              Professional ambulette services NYC serving the whole of Brooklyn on doctor visits, hospital discharges, and
              non-emergency medical travel. Our staff guarantees quality, safe and caring service all the time.
            </p>
          </div>
          <div className="info-card reveal">
            <h3>Brooklyn, New York</h3>
            <div className="big">We’re Open 24/7.</div>
            <p style={{ fontWeight: 600 }}>Same Day Request? Call Us!</p>
            <p><a href={site.phoneHref}>{site.phone}</a></p>
            <p>{site.address.full}</p>
          </div>
        </div>
        <div className="map-wrap reveal">
          <iframe src={site.mapEmbed} title={`Map – ${site.address.full}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </div>
    </section>
  );
}

/** Neighborhood chips. */
export function Neighborhoods({ list, title }: { list: string[]; title: React.ReactNode }) {
  return (
    <section style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>{title}</h2>
          <p>We cover all Brooklyn ZIP codes. Our vans run daily routes, so you can call for a same-day pickup or request a callback.</p>
          <div className="divider" />
        </div>
        <ul className="chips reveal">
          {list.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </section>
  );
}

/** Text + image split section with a 3D photo. */
export function Split({
  eyebrow, title, children, photo, reverse = false,
}: { eyebrow?: string; title: React.ReactNode; children: React.ReactNode; photo: string; reverse?: boolean }) {
  return (
    <section className="split-sec">
      <div className={`wrap split${reverse ? " reverse" : ""}`}>
        <div className="split-photo reveal"><div className={`photo ${photo}`} /></div>
        <div className="split-text reveal">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}
