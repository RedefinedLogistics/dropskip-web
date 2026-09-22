import Link from "next/link";
import BookDemoButton from "@/components/BookDemoButton";
import "@/styles/about.css";

export const metadata = {
  title: {
    absolute: "About DropSkip | Built by Operators Who've Lived Your Chaos",
  },
  description:
    "Meet the operators and technologists behind DropSkip, and the experience and principles shaping what we build.",
};

const principles = [
  {
    index: "01",
    title: "Planning should lead to action.",
    body: "A forecast matters only when it changes what a team buys, moves, or positions.",
  },
  {
    index: "02",
    title: "Recommendations should explain themselves.",
    body: "Operators should see the signals and assumptions behind every recommendation.",
  },
  {
    index: "03",
    title: "The operator remains in control.",
    body: "Technology can prioritize the decision. People apply context and make the call.",
  },
  {
    index: "04",
    title: "Intelligence should refuse to guess.",
    body: "Missing information should be surfaced, not hidden behind an assumption.",
  },
  {
    index: "05",
    title: "Work with what already exists.",
    body: "Better decisions should not require replacing trusted systems.",
  },
  {
    index: "06",
    title: "Every outcome improves the next plan.",
    body: "What happened becomes context for what happens next.",
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <a className="skip" href="#origin">
        Skip to content
      </a>

      <section className="about-hero wrap">
        <div className="hero-top">
          <span className="eyebrow">About DropSkip</span>
          <h1>Built by operators who&apos;ve lived your chaos.</h1>
          <p className="hero-lede">
            DropSkip grew out of decades spent inside retail, ecommerce, logistics, and supply-chain
            operations. Across companies and categories, our founders kept seeing the same problem:
            more systems and more data, but no clearer way to decide what to do next.
          </p>
          <div className="hero-actions">
            <a className="text-link" href="#team">
              Meet the team{" "}
              <span className="arr" aria-hidden="true">
                ↓
              </span>
            </a>
            <Link className="text-link" href="/product">
              See what we&apos;re building{" "}
              <span className="arr" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
        <div className="hero-aside">
          <span className="eyebrow">Where we began</span>
          <strong>Built from operating experience, not theory.</strong>
        </div>
      </section>

      <section className="section" id="origin">
        <div className="wrap">
          <div className="section-heading center">
            <span className="eyebrow">Our origin</span>
            <h2>The same problem followed us everywhere.</h2>
          </div>
          <div className="copy-block">
            <p>
              Forecasts lived in spreadsheets. Purchase orders lived in ERPs. Inventory came from
              warehouses and 3PLs. Supplier updates arrived through email. Teams spent more time
              assembling the picture than acting on it.
            </p>
            <p>
              That experience shaped DropSkip: connect the signals, make the reasoning clear, and
              help operators move with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="principles">
        <div className="wrap">
          <div className="section-heading center">
            <span className="eyebrow">What we believe</span>
            <h2>Technology should strengthen operator judgment.</h2>
          </div>
          <div className="principles-grid">
            {principles.map((principle) => (
              <div className="principle" key={principle.index}>
                <span className="index">{principle.index}</span>
                <strong>{principle.title}</strong>
                <p>{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--mint)" }} id="team">
        <div className="wrap">
          <div className="section-heading center">
            <span className="eyebrow">The team</span>
            <h2>Experience across operations, supply chain, and AI.</h2>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <span className="avatar" title="Rajeeb Mohapatra">
                RM
              </span>
              <span className="name">Rajeeb Mohapatra</span>
              <span className="role">Founder &amp; CEO</span>
              <p>
                Rajeeb has spent 20+ years leading retail, ecommerce, logistics, and global supply
                chains. He previously held leadership roles at Quince, Pitney Bowes, and Office
                Depot, with additional experience at PayPal and Dell.
              </p>
            </div>
            <div className="team-card">
              <span className="avatar" title="Kevin Nohl">
                KN
              </span>
              <span className="name">Kevin Nohl</span>
              <span className="role">Co-Founder &amp; COO</span>
              <p>
                Kevin brings 20+ years in global supply-chain operations, including leadership roles
                at Aterian, Rent the Runway, Bed Bath &amp; Beyond, and Amazon.
              </p>
            </div>
            <div className="team-card">
              <span className="avatar" title="Surajbhan Satpathy">
                SS
              </span>
              <span className="name">Surajbhan Satpathy</span>
              <span className="role">Co-Founder &amp; CTO</span>
              <p>
                Surajbhan is an AI/ML leader and published researcher with 15+ years building
                fintech, edtech, and supply-chain platforms. A former Morgan Stanley technology
                leader, he founded Kaman.AI and leads DropSkip&apos;s engineering and agentic AI
                infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark" id="ambition">
        <div className="wrap">
          <div className="section-heading center">
            <span className="eyebrow">Our ambition</span>
            <h2>Better judgment should scale with the business.</h2>
          </div>
          <div className="copy-block tight">
            <p>
              Our ambition is to help growing brands protect cash, margins, and customer trust by
              making supply-chain decisions earlier and with greater confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="about-closing wrap" id="demo">
        <span className="eyebrow">What we&apos;re building</span>
        <h2>See the thinking behind DropSkip in action.</h2>
        <p className="copy">
          Explore how DropSkip turns connected supply-chain signals into clearer decisions.
        </p>
        <div className="hero-actions">
          <BookDemoButton className="button primary">Book a demo</BookDemoButton>
          <Link className="text-link" href="/product">
            See the product{" "}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
