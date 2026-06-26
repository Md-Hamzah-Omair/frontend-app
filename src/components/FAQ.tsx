"use client";

import { useState, type CSSProperties } from "react";

const FAQ_ITEMS = [
  {
    question: "How does DataForge AI validate pipeline quality before deployment?",
    answer:
      "Each pipeline run is checked against schema drift, missing lineage, late-arriving events, and transformation regressions before promotion. Failed checks can block release or route an alert to the owning agent.",
  },
  {
    question: "Can AI agents safely modify production data workflows?",
    answer:
      "Agents operate through scoped permissions, dry-run plans, and approval gates. They can recommend patches, generate tests, and execute low-risk remediations while sensitive production mutations stay auditable.",
  },
  {
    question: "What happens when source data changes unexpectedly?",
    answer:
      "DataForge AI monitors contracts and runtime signals continuously. When a breaking source change appears, the platform can quarantine affected jobs, explain downstream impact, and propose rollback or mapping updates.",
  },
  {
    question: "How are pipeline incidents surfaced to engineering teams?",
    answer:
      "Incidents include the failing node, upstream context, recent agent actions, and suggested recovery steps. Teams can route them into chat, issue trackers, or dashboards without losing the operational timeline.",
  },
] as const;

function maskStyle(path: string): CSSProperties {
  return {
    maskImage: `url(${path})`,
    WebkitMaskImage: `url(${path})`,
  };
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="bg-arctic-powder px-4 py-24 sm:px-6 lg:px-8"
      id="faq"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-5 w-5 bg-current text-nocturnal-expedition [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
            style={maskStyle("/assets/svgs/search.svg")}
          />
          <h2 className="font-heading text-3xl font-semibold text-nocturnal-expedition sm:text-4xl">
            FAQ
          </h2>
        </div>

        <div className="mt-10 divide-y divide-mystic-mint overflow-hidden rounded-3xl border border-mystic-mint bg-white/80 shadow-sm">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const chevronPath = isOpen
              ? "/assets/svgs/chevron-up.svg"
              : "/assets/svgs/chevron-down.svg";

            return (
              <article key={item.question}>
                <button
                  aria-controls={`faq-panel-${index}`}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-mystic-mint/20 sm:px-8"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  type="button"
                >
                  <span className="font-heading text-base font-semibold text-oceanic-noir sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 bg-current text-oceanic-noir [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
                    style={maskStyle(chevronPath)}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  id={`faq-panel-${index}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-7 text-oceanic-noir/70 sm:px-8 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <a
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-oceanic-noir/15 px-5 py-3 text-sm font-bold text-oceanic-noir transition-colors hover:border-oceanic-noir hover:bg-oceanic-noir hover:text-mystic-mint focus:outline-none focus:ring-2 focus:ring-oceanic-noir focus:ring-offset-2 focus:ring-offset-arctic-powder"
          href="#"
        >
          <span
            aria-hidden="true"
            className="h-5 w-5 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
            style={maskStyle("/assets/svgs/link.svg")}
          />
          Read Documentation
        </a>
      </div>
    </section>
  );
}
