import PostCard from "./PostCard";

/**
 * The published posts, under a single "All posts" label.
 *
 * The row used to hold one chip per topic, which filtered the grid. Those are
 * gone: every post shares a topic today, so the extra chip only repeated what
 * "All posts" already showed. The label is a span rather than a button, since
 * nothing happens when it is clicked and it should not be announced as an
 * action. Nothing here needs the browser, so this is a server component.
 */
export default function PostGrid({ posts }) {
  return (
    <>
      <div className="post-filters">
        <span className="filter-pill active">All posts</span>
      </div>

      <div className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
