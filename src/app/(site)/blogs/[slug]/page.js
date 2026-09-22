import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/blog/PostCard";
import PostCover from "@/components/blog/PostCover";
import ReadingProgress from "@/components/blog/ReadingProgress";
import RichText from "@/components/blog/RichText";
import { formatDate } from "@/lib/format";
import { getBlogs, getBlogBySlug } from "@/lib/strapi";
import "@/styles/blog.css";

export const revalidate = 60;
// A post published in Strapi after the last build is rendered on first request
// rather than 404ing.
export const dynamicParams = true;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};

  return {
    title: { absolute: `${blog.seoTitle} | DropSkip` },
    description: blog.seoDescription,
    alternates: { canonical: `/blogs/${blog.slug}` },
    keywords: blog.tags.length ? blog.tags : undefined,
    openGraph: {
      type: "article",
      title: blog.seoTitle,
      description: blog.seoDescription,
      url: `/blogs/${blog.slug}`,
      publishedTime: blog.date,
      authors: [blog.author],
      images: blog.image ? [{ url: blog.image.url, alt: blog.image.alt }] : undefined,
    },
    twitter: {
      card: blog.image ? "summary_large_image" : "summary",
      title: blog.seoTitle,
      description: blog.seoDescription,
      images: blog.image ? [blog.image.url] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const others = (await getBlogs()).filter((p) => p.slug !== blog.slug).slice(0, 2);

  // Editors often paste the opening paragraph into Short Description. It earns
  // its place on the cards and in search results, but printing it directly
  // above the identical first paragraph reads as a mistake, so drop it here.
  const firstParagraph =
    blog.body
      .find((block) => block.type === "p")
      ?.content.map((n) => n.text)
      .join("") ?? "";
  const ledeRepeatsOpening =
    blog.excerpt.length > 40 &&
    firstParagraph.slice(0, 40).trim() === blog.excerpt.slice(0, 40).trim();
  const showLede = blog.excerpt && !ledeRepeatsOpening;

  // Tells search engines this is an article rather than a marketing page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.seoDescription,
    datePublished: blog.date,
    author: { "@type": "Person", name: blog.author },
    publisher: { "@type": "Organization", name: "DropSkip" },
    keywords: blog.tags.join(", ") || undefined,
    image: blog.image?.url,
  };

  return (
    <div className="blog-page post-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <article className="post-sheet">
        <div className="post-head">
          <Link className="post-back" href="/blogs">
            <span aria-hidden="true">←</span> All posts
          </Link>
          <h1>{blog.title}</h1>
          {showLede ? <p className="post-lede">{blog.excerpt}</p> : null}

          <div className="post-byline">
            <div className="post-meta">
              <span className="post-author">{blog.author}</span>
              <span>{formatDate(blog.date)}</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>

        <figure className="post-hero">
          {blog.image ? (
            <Image
              className="post-hero-image"
              src={blog.image.url}
              alt={blog.image.alt}
              width={blog.image.width}
              height={blog.image.height}
              sizes="(max-width: 1000px) 100vw, 880px"
              priority
            />
          ) : (
            // No featured image in Strapi: fall back to the drawn artwork.
            <PostCover variant={blog.cover} />
          )}
        </figure>

        <div className="post-body">
          {blog.body.map((block, index) => {
            if (block.type === "h2") {
              return (
                <h2 key={index}>
                  <RichText nodes={block.content} />
                </h2>
              );
            }
            if (block.type === "h3") {
              return (
                <h3 key={index}>
                  <RichText nodes={block.content} />
                </h3>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={index}>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <RichText nodes={item} />
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index}>
                <RichText nodes={block.content} />
              </p>
            );
          })}
        </div>

        {blog.tags.length > 0 && (
          <div className="post-tags">
            <span className="post-tags-label">Tagged</span>
            {blog.tags.map((tag) => (
              <span key={tag} className="post-tag post-tag-quiet">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {others.length > 0 && (
        <section className="section related">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">Keep reading</p>
                <h2>Related articles</h2>
              </div>
            </div>

            <div className="post-grid">
              {others.map((other) => (
                <PostCard key={other.slug} post={other} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
