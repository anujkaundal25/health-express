import { workPartners } from "@/components/data/home";
import { Icon } from "@/components/shared/icons";

export default function WorkPartners() {
  return (
    <section className="work-partners" id="partners">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow reveal">Trusted Transportation Partners</div>
          <h2>We <span className="gold">Work</span></h2>
          <div className="divider" />
        </div>
        <div className="partner-grid">
          {workPartners.map((partner) => (
            <div className="partner-card reveal" key={partner.name}>
              <div className="partner-icon"><Icon name={partner.icon} /></div>
              <h3>{partner.name}</h3>
              <p>{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
