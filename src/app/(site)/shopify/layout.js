export const metadata = {
  title: {
    absolute: "DropSkip for Shopify | AI-Enabled Inventory Positioning",
  },
  description:
    "Connect Shopify sales with inventory, incoming supply, suppliers, warehouses and purchasing so your team knows what to buy, how much, when and where.",
  // Kept out of search results but open to anyone with the link. It must stay
  // crawlable (not disallowed in robots.txt), or Google never sees this tag.
  robots: { index: false, follow: true },
};

export default function ShopifyLayout({ children }) {
  return children;
}
