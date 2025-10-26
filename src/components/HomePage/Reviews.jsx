"use client";

import Link from "next/link";
import RevealOnScroll from "../Layout/Reveal_on_scroll";

const Reviews = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
      <RevealOnScroll
        as="h2"
        className="text-balance text-2xl font-semibold md:text-3xl"
      >
        What Customers Say
      </RevealOnScroll>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          {
            name: "Ahmad",
            rating: 5,
            comment: "Great savings and smooth install.",
          },
          {
            name: "Sara",
            rating: 4,
            comment: "Clean design, helpful support.",
          },
          {
            name: "Bilal",
            rating: 5,
            comment: "Reliable and efficient system.",
          },
        ].map((r) => (
          <RevealOnScroll
            key={r.name}
            as="article"
            className="rounded-lg border bg-card p-5 shadow-sm"
            aria-label="review"
          >
            <div className="flex items-center gap-2">
              <strong className="text-sm">{r.name}</strong>
              <span
                className="rounded bg-secondary px-2 py-0.5 text-xs"
                aria-label={`${r.rating} star rating`}
              >
                {"⭐".repeat(r.rating)}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed">{r.comment}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
