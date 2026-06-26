"use client";

import { useRef } from "react";

const PRICING_MATRIX = {
  currencies: {
    USD: {
      label: "USD",
      symbol: "$",
      tariff: 1,
      locale: "en-US",
    },
    EUR: {
      label: "EUR",
      symbol: "€",
      tariff: 0.92,
      locale: "de-DE",
    },
    INR: {
      label: "INR",
      symbol: "₹",
      tariff: 83,
      locale: "en-IN",
    },
  },
  billingCycles: {
    monthly: {
      label: "Monthly",
      multiplier: 1,
      discount: 0,
      period: "/mo",
      note: "Billed monthly",
    },
    annual: {
      label: "Annual",
      multiplier: 12,
      discount: 0.2,
      period: "/yr",
      note: "20% annual discount applied",
    },
  },
  tiers: [
    {
      id: "starter",
      name: "Starter",
      baseRate: 19,
      description: "For focused teams validating a new product surface.",
      icon: "/assets/svgs/spark.svg",
      cta: "Start lean",
      featured: false,
      features: ["One workspace", "5 published pages", "Basic analytics"],
    },
    {
      id: "growth",
      name: "Growth",
      baseRate: 49,
      description: "For teams scaling acquisition and iteration velocity.",
      icon: "/assets/svgs/bolt.svg",
      cta: "Scale faster",
      featured: true,
      features: ["Unlimited pages", "A/B experiments", "Priority builds"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      baseRate: 129,
      description: "For organizations that need governance and control.",
      icon: "/assets/svgs/shield.svg",
      cta: "Contact sales",
      featured: false,
      features: ["SAML SSO", "Dedicated support", "Custom workflows"],
    },
  ],
} as const;

type CurrencyCode = keyof typeof PRICING_MATRIX.currencies;
type BillingCycle = keyof typeof PRICING_MATRIX.billingCycles;
type TierId = (typeof PRICING_MATRIX.tiers)[number]["id"];

type PriceNodeSet = {
  symbol: HTMLSpanElement | null;
  integer: HTMLSpanElement | null;
  period: HTMLSpanElement | null;
  note: HTMLSpanElement | null;
};

type PriceNodeRefs = Record<TierId, PriceNodeSet>;

function TierIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3.75 19.25 8v8L12 20.25 4.75 16V8L12 3.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M4.95 8.15 12 12.25l7.05-4.1M12 20.25v-8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m5 12.5 4.25 4.25L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const DEFAULT_SELECTION = {
  currency: "USD" as CurrencyCode,
  billingCycle: "monthly" as BillingCycle,
};

function calculatePrice(
  baseRate: number,
  currency: CurrencyCode,
  billingCycle: BillingCycle,
) {
  const regionalRate = baseRate * PRICING_MATRIX.currencies[currency].tariff;
  const cycle = PRICING_MATRIX.billingCycles[billingCycle];
  const discountedTotal = regionalRate * cycle.multiplier * (1 - cycle.discount);

  return Math.round(discountedTotal).toLocaleString(
    PRICING_MATRIX.currencies[currency].locale,
  );
}

function updateButtonState<T extends string>(
  buttonRefs: Record<T, HTMLButtonElement | null>,
  activeValue: T,
) {
  (Object.keys(buttonRefs) as T[]).forEach((value) => {
    const button = buttonRefs[value];

    if (!button) {
      return;
    }

    const isActive = value === activeValue;
    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute("data-active", String(isActive));
  });
}

function updatePricingTextNodes({
  priceRefs,
  currencyButtonRefs,
  billingButtonRefs,
  selection,
  currency,
  billingCycle,
}: {
  priceRefs: PriceNodeRefs;
  currencyButtonRefs: Record<CurrencyCode, HTMLButtonElement | null>;
  billingButtonRefs: Record<BillingCycle, HTMLButtonElement | null>;
  selection: { currency: CurrencyCode; billingCycle: BillingCycle };
  currency?: CurrencyCode;
  billingCycle?: BillingCycle;
}) {
  const nextCurrency = currency ?? selection.currency;
  const nextBillingCycle = billingCycle ?? selection.billingCycle;
  const currencyConfig = PRICING_MATRIX.currencies[nextCurrency];
  const billingConfig = PRICING_MATRIX.billingCycles[nextBillingCycle];

  selection.currency = nextCurrency;
  selection.billingCycle = nextBillingCycle;

  PRICING_MATRIX.tiers.forEach((tier) => {
    const refs = priceRefs[tier.id];

    if (refs.symbol) {
      refs.symbol.innerText = currencyConfig.symbol;
    }

    if (refs.integer) {
      refs.integer.innerText = calculatePrice(
        tier.baseRate,
        nextCurrency,
        nextBillingCycle,
      );
    }

    if (refs.period) {
      refs.period.innerText = billingConfig.period;
    }

    if (refs.note) {
      refs.note.innerText = billingConfig.note;
    }
  });

  updateButtonState(currencyButtonRefs, nextCurrency);
  updateButtonState(billingButtonRefs, nextBillingCycle);
}

export default function PricingSection() {
  const selectionRef = useRef({ ...DEFAULT_SELECTION });
  const priceRefs = useRef<PriceNodeRefs>(
    PRICING_MATRIX.tiers.reduce((refs, tier) => {
      refs[tier.id] = {
        symbol: null,
        integer: null,
        period: null,
        note: null,
      };

      return refs;
    }, {} as PriceNodeRefs),
  );
  const currencyButtonRefs = useRef<Record<CurrencyCode, HTMLButtonElement | null>>({
    USD: null,
    EUR: null,
    INR: null,
  });
  const billingButtonRefs = useRef<Record<BillingCycle, HTMLButtonElement | null>>({
    monthly: null,
    annual: null,
  });

  return (
    <section id="pricing" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-deep-saffron">
            Pricing Matrix
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-nocturnal-expedition sm:text-5xl">
            Regional pricing without React re-renders.
          </h2>
          <p className="mt-5 text-base leading-8 text-oceanic-noir/70 sm:text-lg">
            Switch currency and billing terms instantly. Values are calculated
            from base tier rates, regional tariffs, and the annual discount.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div
            aria-label="Choose currency"
            className="grid grid-cols-3 rounded-full border border-mystic-mint bg-arctic-powder p-1 shadow-sm"
            role="group"
          >
            {(Object.keys(PRICING_MATRIX.currencies) as CurrencyCode[]).map(
              (currency) => (
                <button
                  aria-pressed={currency === DEFAULT_SELECTION.currency}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-oceanic-noir/70 transition-colors data-[active=true]:bg-nocturnal-expedition data-[active=true]:text-white"
                  data-active={currency === DEFAULT_SELECTION.currency}
                  key={currency}
                  onClick={() => {
                    updatePricingTextNodes({
                      priceRefs: priceRefs.current,
                      currencyButtonRefs: currencyButtonRefs.current,
                      billingButtonRefs: billingButtonRefs.current,
                      selection: selectionRef.current,
                      currency,
                    });
                  }}
                  ref={(node) => {
                    currencyButtonRefs.current[currency] = node;
                  }}
                  type="button"
                >
                  {PRICING_MATRIX.currencies[currency].label}
                </button>
              ),
            )}
          </div>

          <div
            aria-label="Choose billing cycle"
            className="grid grid-cols-2 rounded-full border border-mystic-mint bg-arctic-powder p-1 shadow-sm"
            role="group"
          >
            {(Object.keys(PRICING_MATRIX.billingCycles) as BillingCycle[]).map(
              (billingCycle) => (
                <button
                  aria-pressed={billingCycle === DEFAULT_SELECTION.billingCycle}
                  className="rounded-full px-5 py-2 text-sm font-semibold text-oceanic-noir/70 transition-colors data-[active=true]:bg-forsythia data-[active=true]:text-oceanic-noir"
                  data-active={billingCycle === DEFAULT_SELECTION.billingCycle}
                  key={billingCycle}
                  onClick={() => {
                    updatePricingTextNodes({
                      priceRefs: priceRefs.current,
                      currencyButtonRefs: currencyButtonRefs.current,
                      billingButtonRefs: billingButtonRefs.current,
                      selection: selectionRef.current,
                      billingCycle,
                    });
                  }}
                  ref={(node) => {
                    billingButtonRefs.current[billingCycle] = node;
                  }}
                  type="button"
                >
                  {PRICING_MATRIX.billingCycles[billingCycle].label}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PRICING_MATRIX.tiers.map((tier) => {
            const initialPrice = calculatePrice(
              tier.baseRate,
              DEFAULT_SELECTION.currency,
              DEFAULT_SELECTION.billingCycle,
            );
            const initialCurrency =
              PRICING_MATRIX.currencies[DEFAULT_SELECTION.currency];
            const initialBilling =
              PRICING_MATRIX.billingCycles[DEFAULT_SELECTION.billingCycle];

            return (
              <article
                className={`relative flex flex-col rounded-[2rem] border p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-8 ${
                  tier.featured
                    ? "border-forsythia bg-nocturnal-expedition text-white shadow-xl"
                    : "border-mystic-mint bg-arctic-powder text-oceanic-noir"
                }`}
                key={tier.id}
              >
                {tier.featured ? (
                  <span className="absolute right-6 top-6 rounded-full bg-forsythia px-3 py-1 text-xs font-bold uppercase tracking-wide text-oceanic-noir">
                    Popular
                  </span>
                ) : null}

                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 ${
                      tier.featured ? "text-oceanic-noir" : "text-nocturnal-expedition"
                    }`}
                  >
                    <TierIcon />
                  </span>
                  <h3
                    className={`font-heading text-xl font-semibold ${
                      tier.featured ? "text-white" : "text-nocturnal-expedition"
                    }`}
                  >
                    {tier.name}
                  </h3>
                </div>

                <p
                  className={`mt-5 min-h-14 text-sm leading-6 ${
                    tier.featured ? "text-arctic-powder/75" : "text-oceanic-noir/70"
                  }`}
                >
                  {tier.description}
                </p>

                <div className="mt-8 flex items-end gap-1">
                  <span
                    className={`pb-2 font-heading text-2xl font-semibold ${
                      tier.featured ? "text-forsythia" : "text-deep-saffron"
                    }`}
                    ref={(node) => {
                      priceRefs.current[tier.id].symbol = node;
                    }}
                  >
                    {initialCurrency.symbol}
                  </span>
                  <span
                    className="font-heading text-5xl font-bold tracking-tight sm:text-6xl"
                    ref={(node) => {
                      priceRefs.current[tier.id].integer = node;
                    }}
                  >
                    {initialPrice}
                  </span>
                  <span
                    className={`pb-3 text-sm font-semibold ${
                      tier.featured ? "text-arctic-powder/70" : "text-oceanic-noir/60"
                    }`}
                    ref={(node) => {
                      priceRefs.current[tier.id].period = node;
                    }}
                  >
                    {initialBilling.period}
                  </span>
                </div>

                <p
                  className={`mt-3 text-sm ${
                    tier.featured ? "text-arctic-powder/65" : "text-oceanic-noir/60"
                  }`}
                  ref={(node) => {
                    priceRefs.current[tier.id].note = node;
                  }}
                >
                  {initialBilling.note}
                </p>

                <ul className="mt-8 space-y-4 text-sm">
                  {tier.features.map((feature) => (
                    <li className="flex gap-3" key={feature}>
                      <CheckIcon />
                      <span
                        className={
                          tier.featured ? "text-arctic-powder/85" : "text-oceanic-noir/75"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                    tier.featured
                      ? "bg-forsythia text-oceanic-noir hover:bg-deep-saffron"
                      : "bg-oceanic-noir text-white hover:bg-nocturnal-expedition"
                  }`}
                  href="#faq"
                >
                  {tier.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
