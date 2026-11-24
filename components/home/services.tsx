import Link from "next/link";
import { homeServiceText, services } from "@/components/data/site";
import { TiltCard } from "@/components/shared/effects";
import { Icon } from "@/components/shared/icons";

export default function Services() {
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
          {services.map((service) => {
            const content = homeServiceText[service.slug];
            return (
              <TiltCard key={service.slug}>
                <div className={`card-photo photo ${content.photo}`} />
                <div className="icon3d"><Icon name={content.icon} /></div>
                <h3>{content.title}</h3>
                <p>{content.text}</p>
                <Link href={`/services/${service.slug}`} className="card-link">View service →</Link>
              </TiltCard>
            );
          })}
          <div className="all-services-link reveal"><Link href="/services" className="btn btn-ghost">All 5 Services →</Link></div>
        </div>
      </div>
    </section>
  );
}
