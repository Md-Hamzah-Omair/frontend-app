export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden bg-oceanic-noir px-4 py-24 text-center sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#114C5A_0%,rgba(17,76,90,0.45)_34%,transparent_62%)]" />
      <div className="absolute left-1/2 top-16 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-forsythia/20 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <p className="hero-enter hero-enter-0 mx-auto mb-6 inline-flex rounded-full border border-mystic-mint/25 bg-white/5 px-4 py-2 font-heading text-xs font-semibold uppercase tracking-[0.28em] text-mystic-mint backdrop-blur">
          Autonomous data operations
        </p>

        <h1 className="hero-enter hero-enter-0 font-heading text-4xl font-bold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
          Automate your data stack with{" "}
          <span className="text-forsythia">AI precision</span> and{" "}
          <span className="text-forsythia">zero drag</span>.
        </h1>

        <p className="hero-enter hero-enter-150 mx-auto mt-7 max-w-3xl font-sans text-base leading-8 text-arctic-powder/85 sm:text-xl">
          Build intelligent pipelines that clean, route, enrich, and monitor data
          in real time, so teams can move from raw inputs to trusted decisions
          without manual engineering bottlenecks.
        </p>

        <div className="hero-enter hero-enter-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-forsythia px-7 py-3 text-sm font-bold text-oceanic-noir shadow-lg shadow-forsythia/20 transition-transform duration-[180ms] ease-out hover:-translate-y-0.5 hover:bg-deep-saffron focus:outline-none focus:ring-2 focus:ring-forsythia focus:ring-offset-2 focus:ring-offset-oceanic-noir"
            href="#pricing"
          >
            Start automating
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-mystic-mint px-7 py-3 text-sm font-bold text-mystic-mint transition-colors duration-[180ms] ease-out hover:bg-mystic-mint hover:text-oceanic-noir focus:outline-none focus:ring-2 focus:ring-mystic-mint focus:ring-offset-2 focus:ring-offset-oceanic-noir"
            href="#features"
          >
            Explore platform
          </a>
        </div>
      </div>
    </section>
  );
}
