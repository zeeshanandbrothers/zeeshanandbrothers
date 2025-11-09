"use client";

import Link from "next/link";
import RevealOnScroll from "../Layout/Reveal_on_scroll";

const Hero = () => {
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return (
    <section className="relative border-b" aria-label="Hero">
      {/* 🔹 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/solar_panels.mp4" // <-- apna video path yahan do
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🔹 Overlay for dark tint */}
      <div className="absolute inset-0 bg-background/50" />

      {/* 🔹 Content */}
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 text-white">
        <RevealOnScroll as="div" className="max-w-3xl">
          <img
            src="/images/logo.png"
            alt="Zeeshan & Brothers"
            className="mb-3 h-10 w-auto animate-fade-up rounded-sm"
          />
          <h1 className="text-black text-3xl font-semibold leading-tight md:text-5xl">
            Calculate Your Solar Needs Instantly
          </h1>
          <p className="mt-3 max-w-2xl text-black text-base leading-relaxed md:text-lg">
            Modern, efficient and eco-friendly solar solutions tailored for your
            home and business.
          </p>
        </RevealOnScroll>

        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/load-calculator"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground animate-fade-up"
          >
            Calculate Load
          </Link>
          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20a%20solar%20quotation`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground animate-float-slow"
            aria-label="Get Quotation on WhatsApp"
          >
            Get Quotation on WhatsApp
          </Link>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs animate-fade-up">
          <span
            className="inline-block h-2 w-2 rounded-full bg-primary animate-float-slow"
            aria-hidden="true"
          />
          Limited-time free site assessment
        </div>
      </div>
    </section>
  );
};

export default Hero;
