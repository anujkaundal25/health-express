import Image from "next/image";
import Link from "next/link";
import { site } from "@/components/data/site";

type Crumb = { label: string; href: string };

/** 3D banner used at the top of every inner page, with breadcrumbs (+ BreadcrumbList schema). */
export default function PageHero({
  eyebrow,
  title,
  text,
  photo = "ph-hero",
  featuredImage,
  crumbs,
  cta = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  photo?: string;
  featuredImage?: { src: string; alt: string };
  crumbs: Crumb[];
  cta?: boolean;
}) {
  const all = [{ label: "Home", href: "/" }, ...crumbs];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: site.url + c.href })),
  };
  return (
    <section className="page-hero">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <svg className="ecg" viewBox="0 0 600 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline fill="none" stroke="#c9a55c" strokeWidth="1.5" points="0,60 220,60 235,50 245,70 260,10 278,95 292,60 310,55 330,60 600,60" />
      </svg>
      <div className="wrap page-hero-grid">
        <div className="page-hero-text">
          <nav className="crumbs" aria-label="Breadcrumb">
            {all.map((c, i) => (
              <span key={c.href}>
                {i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                {i < all.length - 1 && <em aria-hidden="true">/</em>}
              </span>
            ))}
          </nav>
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
          {cta && (
            <div className="hero-ctas">
              <a href={site.phoneHref} className="btn btn-gold">📞 Call {site.phone}</a>
              <Link href="/schedule" className="btn btn-ghost">Schedule Online</Link>
            </div>
          )}
        </div>
        <div className="page-hero-visual" aria-hidden={featuredImage ? undefined : true}>
          {featuredImage ? (
            <div className="ph-card blog-hero-image">
              <Image
                src={featuredImage.src}
                alt={featuredImage.alt}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 40vw"
              />
            </div>
          ) : (
            <>
              <div className={`ph-card photo ${photo}`} />
              <div className="ph-ring" />
              <div className="ph-chip"><strong>24/7</strong><span>Same day? Call us</span></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
