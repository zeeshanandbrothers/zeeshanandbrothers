"use client";

import Link from "next/link";
import RevealOnScroll from "../Layout/Reveal_on_scroll";

const Why_Choose_Us = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <RevealOnScroll
        as="h2"
        className="text-balance text-2xl font-semibold md:text-3xl"
      >
        Why Choose Us
      </RevealOnScroll>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "High Efficiency",
            desc: "Tier-1 components with optimal performance.",
          },
          {
            title: "Cost Savings",
            desc: "Reduce bills with smart, right-sized systems.",
          },
          {
            title: "Eco-Friendly",
            desc: "Clean energy with minimal footprint.",
          },
        ].map((i) => (
          <RevealOnScroll
            key={i.title}
            className="rounded-lg border bg-card p-5 shadow-sm"
          >
            <div className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
              {i.title}
            </div>
            <p className="mt-3 text-sm leading-relaxed">{i.desc}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};

export default Why_Choose_Us;
