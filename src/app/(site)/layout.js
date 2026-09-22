import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/nav.css";
import "@/styles/footer.css";

/** Chrome for every public page. */
export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main id="top">{children}</main>
      <Footer />
    </>
  );
}
