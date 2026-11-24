import Hero3D from "@/components/shared/hero-3d";
import { site } from "@/components/data/site";

export default function Hero() {
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
