import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Book a Demo",
  description:
    "A 30-minute walkthrough of DropSkip using your categories, lead times, and fulfilment map.",
};

const fields = [
  { name: "name", label: "Full name", required: true, autoComplete: "name" },
  {
    name: "email",
    label: "Work email",
    type: "email",
    required: true,
    autoComplete: "email",
    placeholder: "you@brand.com",
  },
  { name: "company", label: "Company", required: true, autoComplete: "organization" },
  { name: "website", label: "Store URL", placeholder: "brand.com" },
  {
    name: "volume",
    label: "Monthly orders",
    type: "select",
    required: true,
    options: ["Under 5,000", "5,000 – 25,000", "25,000 – 100,000", "More than 100,000"],
  },
  {
    name: "locations",
    label: "Fulfilment locations",
    type: "select",
    options: ["1", "2 – 3", "4 – 6", "7 or more"],
  },
  {
    name: "notes",
    label: "What should we cover?",
    type: "textarea",
    full: true,
    placeholder:
      "A SKU that keeps stocking out, a category you overbought, a planning cycle you want to shorten.",
  },
];

const expectations = [
  ["30 minutes", "Enough to see the product working on your kind of catalogue."],
  ["Your data, not ours", "We prepare using your categories, lead times, and nodes."],
  ["No slides", "The walkthrough starts in the product and stays there."],
];

export default function BookDemoPage() {
  return (
    <div className="tw-page">
      <PageHero
        eyebrow="Book a demo"
        title="See DropSkip run against"
        highlight="your own SKUs."
        intro="Thirty minutes, in the product, using your catalogue. You will leave knowing which of your current coverage gaps a transfer could close today."
      />

      <section className="bg-cream">
        <div className="wrap grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.75rem,6vw,2.25rem)] text-ink">
              What to expect
            </h2>
            <dl className="mt-8 space-y-7">
              {expectations.map(([label, body]) => (
                <div key={label}>
                  <dt className="text-base font-bold text-ink">{label}</dt>
                  <dd className="mt-1.5 text-[15px] leading-7 text-ink/70">{body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <LeadForm
            fields={fields}
            submitLabel="Request my demo"
            successTitle="Thanks — we'll be in touch."
            successBody="You will get a scheduling link within one business day, along with a short note on what we will prepare."
          />
        </div>
      </section>
    </div>
  );
}
