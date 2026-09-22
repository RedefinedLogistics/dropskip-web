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
  icons: { icon: "/favicon.png" },
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
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
