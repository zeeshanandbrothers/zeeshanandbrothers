/* new animated navbar in JSX */
"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Header = () => {
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide header on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Calculator", href: "/load-calculator" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
        ? "py-3 px-4"
        : "py-5 px-6"
        }`}
      aria-label="Main"
    >
      <nav
        className={`mx-auto max-w-6xl transition-all duration-500 ease-in-out flex items-center justify-between px-6 py-3 rounded-full border border-white/10 ${scrolled
          ? "bg-background/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-white/20"
          : "bg-transparent border-transparent"
          }`}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-tr from-primary to-accent transition-transform duration-500 group-hover:rotate-12">
            <img
              src="/images/logo.png"
              alt="Zeeshan & Brothers logo"
              className="h-8 w-8 object-contain rounded-full bg-background"
            />
          </div>
          <span className="hidden min-[400px]:inline text-sm font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:to-primary transition-all duration-300">
            Zeeshan &amp; Brothers
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 py-1 group ${pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20a%20solar%20quotation`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 bg-primary rounded-full hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 group overflow-hidden"
          >
            <span className="relative z-10">WhatsApp Quote</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/20 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle menu"
          className={`md:hidden p-2 rounded-full transition-colors duration-300 ${scrolled ? "bg-primary/10 text-primary" : "bg-foreground/5 text-foreground"
            }`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
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
                className="block w-full rounded-2xl bg-primary px-6 py-4 text-center text-base font-bold text-white shadow-xl shadow-primary/20"
                onClick={() => setOpen(false)}
              >
                WhatsApp Quote
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header >
  );
};
export default Header;
