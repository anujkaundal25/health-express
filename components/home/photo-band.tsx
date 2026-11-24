import { site } from "@/components/data/site";

export default function PhotoBand() {
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
