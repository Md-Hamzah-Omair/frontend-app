"use client";

import Image from "next/image";
import { useState } from "react";

const FEATURES = [
  {
    title: "Adaptive Launch Paths",
    eyebrow: "Signal routing",
    summary: "Route visitors into the highest-intent journey without rebuilding the page.",
    deepDive:
      "Behavior, campaign source, and device context shape the path in real time, so your landing page can speak directly to each segment while keeping one clean content model.",
    icon: "/assets/svgs/feature-routing.svg",
    metric: "42%",
    metricLabel: "faster activation",
    span: "md:col-span-2",
    accent: "from-forsythia/80 to-deep-saffron/80",
  },
  {
    title: "Live Proof Blocks",
    eyebrow: "Trust layer",
    summary: "Surface fresh customer proof beside the moments where visitors hesitate.",
    deepDive:
      "Pull quotes, partner logos, and proof points into compact modules that expand only when the visitor asks for more context.",
    icon: "/assets/svgs/feature-proof.svg",
    metric: "3.1x",
    metricLabel: "more proof viewed",
    span: "md:col-span-1",
    accent: "from-mystic-mint to-arctic-powder",
  },
  {
    title: "Conversion Guardrails",
    eyebrow: "Quality control",
    summary: "Catch broken journeys before campaigns start sending paid traffic.",
    deepDive:
      "Preflight checks validate links, forms, tracking events, and layout shifts across key breakpoints before a page is marked ready.",
    icon: "/assets/svgs/feature-guardrails.svg",
    metric: "96%",
    metricLabel: "issues caught preflight",
    span: "md:col-span-2",
    accent: "from-deep-saffron/30 to-forsythia/40",
  },
  {
    title: "Instant Experiment Loops",
    eyebrow: "Iteration",
    summary: "Ship page variants, compare intent signals, and keep the winning path visible.",
    deepDive:
      "Every content block can carry a hypothesis, success metric, and rollout state, making landing page optimization operational instead of ad hoc.",
    icon: "/assets/svgs/feature-loop.svg",
    metric: "18m",
    metricLabel: "to first variant",
    span: "md:col-span-1",
    accent: "from-nocturnal-expedition/20 to-mystic-mint",
  },
] as const;

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="features" className="bg-mystic-mint/30 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-deep-saffron">
            Feature Showcase
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-nocturnal-expedition sm:text-5xl">
            One responsive system from bento grid to accordion.
          </h2>
          <p className="mt-5 text-base leading-8 text-oceanic-noir/70 sm:text-lg">
            The same feature cards reshape across breakpoints, keeping state and
            content locked while the active item follows hover on desktop and taps
            on mobile.
          </p>
        </div>

        <div
          className="mt-12 grid auto-rows-min grid-cols-1 gap-6 md:grid-cols-3"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {FEATURES.map((feature, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                className={`${feature.span} group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-[box-shadow,transform] duration-[240ms] ease-out ${
                  isActive
                    ? "-translate-y-1 shadow-xl shadow-nocturnal-expedition/10"
                    : "hover:-translate-y-1 hover:shadow-lg hover:shadow-nocturnal-expedition/10"
                }`}
                key={feature.title}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <button
                  aria-controls={`feature-panel-${index}`}
                  aria-expanded={isActive}
                  className="flex h-full w-full flex-col text-left"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  type="button"
                >
                  <span
                    className={`flex min-h-36 items-start justify-between bg-gradient-to-br p-6 ${feature.accent}`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 shadow-sm">
                      <Image
                        alt=""
                        className="h-6 w-6"
                        height={24}
                        src={feature.icon}
                        width={24}
                      />
                    </span>
                    <span className="rounded-full bg-white/80 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-nocturnal-expedition">
                      {feature.eyebrow}
                    </span>
                  </span>

                  <span className="flex flex-grow flex-col p-8">
                    <span className="flex items-start justify-between gap-4">
                      <span>
                        <span className="block font-heading text-xl font-semibold text-nocturnal-expedition sm:text-2xl">
                          {feature.title}
                        </span>
                        <span className="mt-3 block text-sm leading-6 text-oceanic-noir/70">
                          {feature.summary}
                        </span>
                      </span>
                      <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-mystic-mint bg-arctic-powder transition-transform duration-[220ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:hidden">
                        <Image
                          alt=""
                          className={`h-4 w-4 transition-transform duration-[220ms] ease-out ${
                            isActive ? "rotate-180" : "rotate-0"
                          }`}
                          height={16}
                          src="/assets/svgs/chevron-down.svg"
                          width={16}
                        />
                      </span>
                    </span>

                    <span
                      className={`grid transition-[max-height,opacity,transform] duration-[240ms] ease-out ${
                        isActive
                          ? "max-h-64 translate-y-0 opacity-100 md:max-h-72"
                          : "max-h-0 -translate-y-2 opacity-0"
                      }`}
                      id={`feature-panel-${index}`}
                    >
                      <span className="mt-6 border-t border-mystic-mint pt-6">
                        <span className="block text-sm leading-6 text-oceanic-noir/75">
                          {feature.deepDive}
                        </span>
                        <span className="mt-5 flex items-end gap-3">
                          <span className="font-heading text-4xl font-bold tracking-tight text-deep-saffron">
                            {feature.metric}
                          </span>
                          <span className="pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-oceanic-noir/55">
                            {feature.metricLabel}
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
