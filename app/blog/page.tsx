import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/page-hero";
import blog from "@/components/data/blog";

export const metadata: Metadata = {
  title: "Blog | Health Express Ambulette",
  description:
    "Helpful guides and advice about ambulette services and non-emergency medical transportation in Brooklyn and NYC.",
  alternates: { canonical: "/blog" },
};

function getExcerpt(content: string) {
  const excerpt = content
    .replace(/[#*`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return excerpt.length > 180 ? `${excerpt.slice(0, 180).trimEnd()}…` : excerpt;
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Health Express Blog"
        title={<>Helpful <span className="gold">guides</span></>}
        text="Read practical advice for patients and families arranging non-emergency medical transportation."
        crumbs={[{ label: "Blog", href: "/blog" }]}
        cta={false}
      />
      <section className="blog-list-section">
        <div className="wrap">
          <div className="blog-grid">
            {blog.map((post) => (
              <article className="blog-card reveal" key={post.slug}>
                <Link
                  className="blog-card-image"
                  href={`/blog/${post.slug}`}
                  aria-label={`Read ${post.title}`}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(8, 17, 28, .08), rgba(8, 17, 28, .6)), url("${post.img}")`,
                  }}
                />
                <div className="blog-card-content">
                  <p className="blog-kicker">Patient &amp; family guide</p>
                  <h2>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="blog-excerpt">{getExcerpt(post.content)}</p>
                  <Link className="blog-read-more" href={`/blog/${post.slug}`}>
                    Read the article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}