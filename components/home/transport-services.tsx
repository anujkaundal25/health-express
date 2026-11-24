import { transportServices } from "@/components/data/site";
import { TiltCard } from "@/components/shared/effects";
import { Icon } from "@/components/shared/icons";

export default function TransportServices() {
  return (
    <section style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Health Express Ambulette <span className="gold">Transportation Services</span></h2>
          <p>Schedule private medical transportation services NYC for all your medical appointments.</p>
          <div className="divider" />
        </div>
        <div className="grid-3">
          {transportServices.map((service) => (
            <TiltCard key={service.title}>
              <div className="icon3d"><Icon name={service.icon} /></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
