import Link from "next/link";
import { fleetPoints, site } from "@/components/data/site";

export default function About() {
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
          {fleetPoints.map((point, index) => (
            <div className="fleet-item reveal" key={point.title}>
              <div className="num gold">{String(index + 1).padStart(2, "0")}</div>
              <div><h3>{point.title}</h3><p>{point.text}</p></div>
            </div>
          ))}
          <Link href="/about" className="btn btn-ghost reveal" style={{ marginTop: 10 }}>More About Us →</Link>
        </div>
      </div>
    </section>
  );
}
