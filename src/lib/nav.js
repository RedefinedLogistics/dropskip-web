export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/product", label: "Product" },
  { href: "/why-dropskip", label: "Why DropSkip" },
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
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blogs", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
];
