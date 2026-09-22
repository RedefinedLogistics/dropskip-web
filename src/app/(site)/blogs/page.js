import PostGrid from "@/components/blog/PostGrid";
import { getBlogs } from "@/lib/strapi";
import "@/styles/blog.css";

// Pulled from Strapi and revalidated, so publishing in the admin panel shows up
// without a redeploy.
export const revalidate = 60;

export const metadata = {
  title: { absolute: "Blog | DropSkip" },
  description:
    "Notes on demand planning, inventory positioning, trade and working capital, written by the operators building DropSkip.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="wrap">
          <p className="eyebrow">Blog</p>
          <h1>
            Notes on demand, inventory and <span className="accent">working capital.</span>
          </h1>
          <p className="blog-lede">
            Written by operators who have run these cycles — what we keep seeing go wrong in
            planning, and what tends to fix it.
          </p>

          {/* The count is its own line rather than being folded into the
              sentence, which read awkwardly with a single post. */}
          {blogs.length > 0 && (
            <p className="blog-count">
              {blogs.length} {blogs.length === 1 ? "article" : "articles"}
            </p>
          )}
        </div>
      </section>

      <section className="section blog-list">
        <div className="wrap">
          {blogs.length === 0 ? (
            <p className="post-empty">Nothing published yet. The first articles are on the way.</p>
          ) : (
            <PostGrid posts={blogs} />
          )}
        </div>
      </section>
    </div>
  );
}
