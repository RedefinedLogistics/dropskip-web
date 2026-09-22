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
 * without a second component.
 */
export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <Link href={`/blogs/${post.slug}`} className="post-card-link">
        <div className="post-card-media">
          {post.image ? (
            <Image
              src={post.image.url}
              alt={post.image.alt}
              fill
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
          <h3>{post.title}</h3>
          <span className="post-card-rule" aria-hidden="true" />
          <span className="post-card-cta">
            Read the post <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
