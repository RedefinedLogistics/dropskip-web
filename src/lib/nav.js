export const navLinks = [
  { href: "/why-dropskip", label: "Why DropSkip" },
  { href: "/product", label: "Product" },
  {
    label: "Resources",
    children: [
      {
        href: "/blogs",
        label: "Blog",
        blurb: "Notes on demand, inventory and cash",
      },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// The footer groups the same destinations under headings, which reads better
// than one flat list once a site has more than a handful of pages.
export const footerGroups = [
  {
    title: "Platform",
    links: [
      { href: "/product", label: "Product" },
      { href: "/why-dropskip", label: "Why DropSkip" },
      { href: "/shopify", label: "Shopify app" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blogs", label: "Blog" },
      { href: "/contact", label: "Contact" },
      // The header and footer buttons open the demo dialog, which crawlers
      // cannot follow, so the page itself needs a real link somewhere.
      { href: "/book-demo", label: "Book a demo" },
    ],
  },
];
