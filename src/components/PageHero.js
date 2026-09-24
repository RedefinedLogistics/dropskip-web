export default function PageHero({ eyebrow, title, highlight, intro }) {
  return (
    <section className="bg-ink">
      <div className="wrap py-14 sm:py-20 lg:py-24">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
          <span aria-hidden="true" className="h-[2px] w-7 bg-brand" />
          {eyebrow}
        </p>
        <h1 className="font-display mt-6 max-w-4xl text-[clamp(2.25rem,8vw,3.25rem)] text-white lg:text-[clamp(3.25rem,4.5vw,4.5rem)]">
          {title} {highlight ? <span className="text-brand">{highlight}</span> : null}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-base leading-7 text-mist sm:text-lg sm:leading-8">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
