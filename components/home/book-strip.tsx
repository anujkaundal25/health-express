import Link from "next/link";

export default function BookStrip() {
  return (
    <div className="book-strip wrap reveal" id="location">
      <div className="book-card">
        <div>
          <h3 className="gold">Need Transportation?</h3>
          <a href="#schedule" className="btn btn-gold" style={{ padding: "11px 24px" }}>Book Now</a>
        </div>
        <div>
          <h3>Location</h3>
          <div className="locs">
            <Link href="/ambuletteService" className="pill">Brooklyn</Link>
            <Link href="/southBrooklyn" className="pill">South Brooklyn</Link>
            <span className="pill">Staten Island</span>
          </div>
        </div>
        <div>
          <Link href="/schedule" className="btn btn-ghost">Make an Appointment</Link>
        </div>
      </div>
    </div>
  );
}
