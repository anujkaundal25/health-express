import Image from "next/image";
import { workPartners } from "@/components/data/home";
import { Icon } from "@/components/shared/icons";

export default function WorkPartners() {
  return (
    <section className="work-partners" id="partners">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow reveal">Trusted Transportation Partners</div>
          <h2>Partners We <span className="gold">Work With</span></h2>
          <div className="divider" />
        </div>
        <div className="partner-grid">
          {workPartners.map((partner) => (
            <article className="partner-card reveal" key={partner.name}>
              <div className="partner-image">
                <Image
                  src={partner.image}
                  alt={`${partner.name} transportation partner`}
                  fill
                  sizes="(max-width: 560px) calc(100vw - 48px), (max-width: 960px) calc(50vw - 34px), 276px"
                />
                <div className="partner-icon" aria-hidden="true">
                  <Icon name={partner.icon} />
                </div>
              </div>
              <div className="partner-content">
                <h3>{partner.name}</h3>
                <p>{partner.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
