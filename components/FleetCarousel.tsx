"use client";

import { fleetPhotos } from "@/lib/site";

const FALLBACK = "/images/home/fleet-hero.jpg";

/** Rotating 3D ring of real fleet photos. Pauses on hover. */
export default function FleetCarousel() {
  const n = fleetPhotos.length;
  const radius = 420; // distance of each photo from the ring centre (px)
  return (
    <section className="gallery" aria-label="Our fleet photos">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Our Fleet</div>
          <h2>
            Wheelchair Accessible <span className="gold">Vans</span>
          </h2>
          <p>Safe, reliable and comfortable rides across Brooklyn and Staten Island.</p>
          <div className="divider" />
        </div>
        <div className="carousel reveal">
          <div className="carousel-floor" />
          <div className="carousel-ring">
            {fleetPhotos.map((src, i) => (
              <div
                key={src}
                className="carousel-item"
                style={{ transform: `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Health Express Ambulette wheelchair accessible van"
                  loading="lazy"
                  onError={(e) => {
                    if (!e.currentTarget.src.endsWith(FALLBACK)) e.currentTarget.src = FALLBACK;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
