"use client";

import RevealOnScroll from "../Layout/Reveal_on_scroll";

const Contact = () => {
  return (
    <section className="border-t bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <RevealOnScroll
          as="h2"
          className="text-balance text-2xl font-semibold md:text-3xl"
        >
          Get in Touch
        </RevealOnScroll>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <RevealOnScroll
            as="form"
            className="rounded-lg border bg-card p-5 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              const name = data.get("name")?.toString() || "";
              const phone = data.get("phone")?.toString() || "";
              const message = encodeURIComponent(
                `Hello, my name is ${name}. My WhatsApp is ${phone}. I'd like a solar quotation.`
              );
              window.open(
                `https://wa.me/?text=${message}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            <div className="grid gap-3">
              <label className="text-sm">
                Name
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  aria-label="Name"
                />
              </label>
              <label className="text-sm">
                WhatsApp Number
                <input
                  name="phone"
                  required
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  aria-label="WhatsApp Number"
                />
              </label>
              <button
                type="submit"
                className="mt-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
              >
                Send on WhatsApp
              </button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            as="div"
            className="rounded-lg border bg-card p-5 shadow-sm"
          >
            <p className="text-sm leading-relaxed">
              Prefer email? We will add email notifications next. For now, reach
              us quickly on WhatsApp for quotations and product info.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Contact;
