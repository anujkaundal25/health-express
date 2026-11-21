import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="wrap">
        <div className="nf-code gold">404</div>
        <h1>Page not found</h1>
        <p>The page you’re looking for has moved or doesn’t exist.</p>
        <div className="hero-ctas" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn-gold">Back to Home</Link>
          <a href={site.phoneHref} className="btn btn-ghost">📞 {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
