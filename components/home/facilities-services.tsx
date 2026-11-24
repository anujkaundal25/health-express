import { facilityServices } from "@/components/data/home";
import { Icon } from "@/components/shared/icons";

export default function FacilitiesServices() {
  return (
    <section className="facilities-section" id="facilities">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Reliable Facility Transportation</div>
          <h2>Facilities &amp; <span className="gold">Healthcare Transportation Services</span></h2>
          <div className="divider" />
        </div>
        <div className="facility-grid">
          {facilityServices.map((facility) => (
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
