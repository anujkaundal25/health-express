import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import blog from "@/components/data/blog";
import PageHero from "@/components/shared/page-hero";
import Image from "next/image";
import Faq from "@/components/shared/faq";

type Props = { params: Promise<{ slug: string }> };

function getExcerpt(content: string) {
  const excerpt = content.replace(/[#*`]/g, "").replace(/\s+/g, " ").trim();
  if (excerpt.length <= 180) return excerpt;

  const truncated = excerpt.slice(0, 177);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : truncated.length)}…`;
}

function extractFaqs(content: string) {
  const faqHeading = /^### Frequently Asked Questions ###[ \t]*$/m.exec(content);
  if (!faqHeading) return { content, faqs: [] };

  const afterHeading = content.slice(faqHeading.index + faqHeading[0].length);
  const nextHeading = /^### .+ ###[ \t]*$/m.exec(afterHeading);
  const faqContent = nextHeading ? afterHeading.slice(0, nextHeading.index) : afterHeading;
  const remainingContent = nextHeading ? afterHeading.slice(nextHeading.index) : "";
  const faqs = faqContent
    .trim()
    .split(/\n\s*\n(?=\*\*)/)
    .map((item) => {
      const [question = "", ...answer] = item.trim().split(/\n\s*\n/);
      return {
        q: question.replace(/^\*\*|\*\*$/g, "").trim(),
        a: answer.join("\n\n").trim(),
      };
    })
    .filter((item) => item.q && item.a);

  return {
    content: `${content.slice(0, faqHeading.index)}${remainingContent}`.trim(),
    faqs,
  };
}

function BlogContent({ content, slug }: { content: string; slug: string }) {
  const extracted = extractFaqs(content.trim().replace(/^[ \t]+/gm, ""));
  const sections = extracted.content
    .split(/(?=^### .+ ###\s*$)/gm);
  let imageIndex = 0;

  return (
    <div className="blog-content">
      {sections.map((section, index) => {
        const image = section.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (!image) {
          const sectionType = section.startsWith("### Ambulette vs Ambulance vs Taxi ###")
            ? " blog-comparison-section"
            : section.startsWith("### How to Book an Ambulette in Brooklyn ###")
              ? " blog-booking-section"
              : section.startsWith("### Transportation Options for Seniors in NYC ###")
                ? " blog-senior-options-section"
                : section.startsWith("### Appointment-Day Checklist ###")
                  ? " blog-checklist-section"
                  : "";

          return (
            <div className={`blog-markdown blog-text-section${sectionType}`} key={index}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{section}</ReactMarkdown>
            </div>
          );
        }

        const imageSide = imageIndex++ % 2 === 0 ? "image-right" : "image-left";
        const text = section.replace(image[0], "").trim();

        return (
          <section className={`blog-feature-card ${imageSide}`} key={index}>
            <div className="blog-markdown blog-feature-copy">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </div>
            <div className="blog-feature-visual">
              <Image
                src={image[2]}
                alt={image[1]}
                fill
                sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 45vw, 500px"
              />
            </div>
          </section>
        );
      })}
      {extracted.faqs.length > 0 && (
        <Faq
          id={`blog-faq-${slug}`}
          items={extracted.faqs}
          title={<>Frequently Asked <span className="gold">Questions</span></>}
          singleOpen
        />
      )}
    </div>
  );
}

export function generateStaticParams() {
  return blog.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blog.find((item) => item.slug === slug);
  if (!post) return {};

  return {
    title: post.metaTitle ?? `${post.title} | Health Express Ambulette`,
    description: post.metaDescription ?? getExcerpt(post.content),
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? getExcerpt(post.content),
      images: [post.img],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blog.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow="Health Express Blog"
        title={post.title}
        text={post.metaDescription ?? getExcerpt(post.content)}
        featuredImage={{ src: post.img, alt: post.imgAlt ?? post.title }}
        backLink={{ label: "All Blogs", href: "/blog" }}
        crumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
        cta={false}
      />
      <section className="blog-article-section">
        <article className="wrap blog-article">
          <div className="blog-article-body">
            <BlogContent content={post.content} slug={post.slug} />
          </div>
        </article>
      </section>
    </>
  );
}