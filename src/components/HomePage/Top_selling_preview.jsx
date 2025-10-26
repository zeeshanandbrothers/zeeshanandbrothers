"use client";

import Link from "next/link";
import RevealOnScroll from "../Layout/Reveal_on_scroll";

const Top_selling_preview = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
      <div className="flex items-center justify-between">
        <RevealOnScroll
          as="h2"
          className="text-balance text-2xl font-semibold md:text-3xl"
        >
          Top Selling
        </RevealOnScroll>
        <Link href="/products" className="text-sm underline">
          View all
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[
          {
            name: "Monocrystalline Panel 550W",
            brand: "SunMax",
            watt: 550,
            price: "PKR 45,000",
          },
          {
            name: "Hybrid Inverter 5kVA",
            brand: "VoltPro",
            watt: 5000,
            price: "PKR 220,000",
          },
          {
            name: "Battery 12V 200Ah",
            brand: "EcoCell",
            watt: 2400,
            price: "PKR 70,000",
          },
        ].map((p) => (
          <RevealOnScroll
            key={p.name}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div
              className="aspect-[4/3] w-full overflow-hidden rounded-md bg-secondary"
              aria-hidden="true"
              title="Product image placeholder"
            />
            <h3 className="mt-3 text-pretty text-base font-medium">{p.name}</h3>
            <p className="text-sm text-muted-foreground">
              {p.brand} • {p.watt}W
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold">{p.price}</span>
              <a
                href="https://wa.me/?text=I%20am%20interested%20in%20your%20top%20selling%20product"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
              >
                Get Quote
              </a>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};

export default Top_selling_preview;
