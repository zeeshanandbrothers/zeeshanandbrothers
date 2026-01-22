/* new animated navbar in JSX */
"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Header = () => {
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  // const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // useEffect(() => {
  //   const onScroll = () => setScrolled(window.scrollY > 8);
  //   onScroll();
  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  // Hide header on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/70 backdrop-blur-sm shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]`}
      aria-label="Main"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Zeeshan & Brothers logo"
            className="h-8 w-auto rounded-sm ring-1 ring-border transition-transform duration-300 hover:scale-[1.03]"
          />
          <span className="text-sm font-semibold">Zeeshan &amp; Brothers</span>
        </Link>

        <button
          aria-label="Toggle menu"
          className="md:hidden rounded-md cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <ul className="hidden items-center gap-6 md:flex">
          <li>
            <Link className="text-sm hover:underline" href="/load-calculator">
              Calculator
            </Link>
          </li>
          <li>
            <Link className="text-sm hover:underline" href="/projects">
              Projects
            </Link>
          </li>
          {/* <li>
            <Link className="text-sm hover:underline" href="/products">
              Products
            </Link>
          </li>*/}
          <li>
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20a%20solar%20quotation`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
            >
              WhatsApp Quote
            </Link>
          </li>
        </ul>
      </nav>

      {open && (
        <div className="md:hidden border-t bg-background animate-fade-up">
          <ul className="mx-auto max-w-6xl px-4 py-3 space-y-2">
            <li>
              <Link
                className="block rounded-md px-2 py-2 text-sm hover:bg-secondary"
                href="/load-calculator"
                onClick={() => setOpen(false)}
              >
                Calculator
              </Link>
            </li>
            {/* <li>
              <Link
                className="block rounded-md px-2 py-2 text-sm hover:bg-secondary"
                href="/products"
                onClick={() => setOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className="block rounded-md px-2 py-2 text-sm hover:bg-secondary"
                href="/reviews"
                onClick={() => setOpen(false)}
              >
                Reviews
              </Link>
            </li> */}
            <li>
              <Link
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20a%20solar%20quotation`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md bg-accent px-2 py-2 text-sm font-medium text-accent-foreground text-center"
                onClick={() => setOpen(false)}
              >
                WhatsApp Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
export default Header;
