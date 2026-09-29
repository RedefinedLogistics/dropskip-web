import Image from "next/image";
import Link from "next/link";
import PostCover from "./PostCover";
import { formatDate } from "@/lib/format";

/**
 * One post in the grid, laid out like the Insights cards on
 * redefinedlogistics.com: the image fills the tile, the byline sits at the top
 * and the title sits over the foot of the picture.
 *
 * Used by the listing and the related-posts section, so both stay identical
 * without a second component. They sit at different depths in the document
 * outline though -- on the listing the cards come straight after the page h1,
 * while in "Related articles" they sit under that section's h2 -- so the
 * heading level is a prop rather than hard-coded.
 */
export default function PostCard({ post, headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;
  return (
    <article className="post-card">
      <Link href={`/blogs/${post.slug}`} className="post-card-link">
        <div className="post-card-media">
          {post.image ? (
            <Image
              src={post.image.url}
              alt={post.image.alt}
              fill
              // Already served from this site by /cms-media; the Next
              // optimiser would need the CMS host allow-listed at build time.
              unoptimized
              sizes="(max-width: 720px) 100vw, (max-width: 980px) 50vw, 380px"
            />
          ) : (
            <PostCover variant={post.cover} />
          )}
        </div>

        {/* Darkens the picture enough for white text to stay readable on a
            bright photograph. */}
        <span className="post-card-scrim" aria-hidden="true" />

        <div className="post-card-top">
          <span className="post-card-author">{post.author}</span>
          <span className="post-card-sub">
            {formatDate(post.date)} <span aria-hidden="true">·</span> {post.readTime}
          </span>
        </div>

        <div className="post-card-bottom">
          <Heading>{post.title}</Heading>
          <span className="post-card-rule" aria-hidden="true" />
          <span className="post-card-cta">
            Read the post <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
