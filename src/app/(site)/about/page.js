import Image from "next/image";
import { asset } from "@/lib/asset";
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

// Photos live in public/team. The initials stay as the alt text's fallback
// shape: if an image ever fails to load the card still reads correctly.
const team = [
  {
    name: "Rajeeb Mohapatra",
    role: "Founder & CEO",
    photo: "/team/rajeeb-mohapatra.jpg",
    width: 400,
    height: 400,
    linkedin: "https://www.linkedin.com/in/rajeebmohapatra/",
    bio: "Rajeeb has spent 20+ years leading retail, ecommerce, logistics, and global supply chains. He previously held leadership roles at Quince, Pitney Bowes, and Office Depot, with additional experience at PayPal and Dell.",
  },
  {
    name: "Kevin Nohl",
    role: "Co-Founder & COO",
    photo: "/team/kevin-nohl.jpg",
    width: 800,
    height: 800,
    linkedin: "https://www.linkedin.com/in/kevin-nohl-92518144/",
    bio: "Kevin brings 20+ years running complex global supply chain operations — lead integration partnership at Pipe17, SVP of Global Supply Chain at Aterian, and leadership roles across Rent the Runway, Bed Bath & Beyond and Amazon.",
  },
  {
    name: "Surajbhan Satpathy",
    role: "Co-Founder & CTO",
    photo: "/team/surajbhan-satpathy.jpg",
    width: 800,
    height: 800,
    linkedin: "https://www.linkedin.com/in/surajbhansatpathy/",
    bio: "Surajbhan is an AI/ML leader and published researcher with 15+ years building fintech, edtech, and supply-chain platforms. A former Morgan Stanley technology leader, he founded Kaman.AI and leads DropSkip's engineering and agentic AI infrastructure.",
  },
];

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
            DropSkip grew out of decades spent in retail, ecommerce, supply-chain, and logistics
            operations. Across companies and categories, our founders saw the same problem again and
            again: more systems and more data, but no clearer way to decide what matters and what to
            do next.
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
              That experience shaped how we built DropSkip: connect the signals, show the reasoning,
              and help operators act with confidence.
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
            <h2 className="team-heading">
              <span>Experience across retail ecommerce, product development,</span>{" "}
              <span>supply chain and logistics operations, and AI.</span>
            </h2>
          </div>
          <div className="team-grid">
            {team.map((person) => (
              <div className="team-card" key={person.name}>
                <span className="avatar">
                  <Image
                    src={asset(person.photo)}
                    alt={person.name}
                    width={person.width}
                    height={person.height}
                    sizes="80px"
                  />
                </span>
                <a
                  className="team-linkedin"
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} on LinkedIn`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
                    />
                  </svg>
                </a>
                <span className="name">{person.name}</span>
                <span className="role">{person.role}</span>
                <p>{person.bio}</p>
              </div>
            ))}
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
