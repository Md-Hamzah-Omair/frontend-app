const PARTNERS = ["Aetna", "Cigna", "Anthem", "Humana", "Oscar"];

export default function SocialProof() {
  return (
    <section
      aria-label="Trusted partner logos"
      className="overflow-hidden border-y border-mystic-mint/10 bg-oceanic-noir px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-center font-heading text-xs font-semibold uppercase tracking-[0.28em] text-arctic-powder/40">
          Trusted by data teams across healthcare and insurance
        </p>

        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_16%,black_84%,transparent)]">
          <div className="social-proof-marquee flex w-max items-center gap-12 pr-12">
            {[...PARTNERS, ...PARTNERS].map((partner, index) => (
              <span
                aria-hidden={index >= PARTNERS.length}
                className="font-heading text-2xl font-semibold uppercase tracking-[0.18em] text-arctic-powder opacity-50 grayscale sm:text-3xl"
                key={`${partner}-${index}`}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
