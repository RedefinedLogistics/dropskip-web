export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/product", label: "Product" },
  { href: "/shopify", label: "Shopify" },
  { href: "/inventory-planning", label: "Inventory Planning" },
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
      { href: "/inventory-planning", label: "Inventory Planning" },
      { href: "/shopify", label: "Shopify" },
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
