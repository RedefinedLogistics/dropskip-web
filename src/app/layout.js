import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/site.css";
import "../styles/theme.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://dropskip.ai"),
  title: {
    default: "DropSkip | AI-Enabled Supply Chain Decisions",
    template: "%s | DropSkip",
  },
  description:
    "DropSkip connects demand, inventory, and incoming supply so DTC operators can make confident supply-chain decisions.",
  // favicon.png is the 1254px master and is not served: a browser renders the
  // tab icon at 32px, so shipping the full-size file cost 329KB on every page
  // load for a 2KB result.
  icons: { icon: "/favicon-32.png", apple: "/apple-icon.png" },

  // Each route resolves "./" against its own URL, so every page gets a
  // canonical pointing at itself without repeating the host per page.
  alternates: { canonical: "./" },

  // Without these, a link pasted into LinkedIn, Slack or a message renders as
  // a bare URL. Per-page title and description flow in through the template
  // above, so only the shared parts are declared here.
  openGraph: {
    type: "website",
    siteName: "DropSkip",
    locale: "en_US",
    url: "./",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DropSkip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071c2d",
};

/**
 * Document shell only. The public site's header and footer live in the (site)
 * layout, so the admin area can render without them.
 */
export default function RootLayout({ children }) {
  return (
    // data-scroll-behavior tells Next the smooth scrolling in site.css is
    // deliberate, so it can suspend it during route transitions and land a
    // new page at the top instantly instead of gliding there.
    <html
      lang="en"
      className={inter.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Sets the theme before first paint so there is no light flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("dropskip-theme");var d=s||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=d;}catch(e){document.documentElement.dataset.theme="light";}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
