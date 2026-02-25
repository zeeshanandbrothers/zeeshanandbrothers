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
          {/* <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-tr from-primary to-accent transition-transform duration-500 group-hover:scale-105"> */}
          <img
            src="/images/logo.png"
            alt="Zeeshan & Brothers logo"
            className="h-16 w-auto object-contain bg-background px-1 py-1 rounded-lg"
          />
          {/* </div> */}
          {/* <span className="hidden min-[400px]:inline text-sm font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:to-primary transition-all duration-300">
            Zeeshan And Brothers
          </span> */}
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

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setOpen(false)} />
        <div className={`absolute top-24 left-4 right-4 bg-card border border-border/50 rounded-3xl p-6 shadow-2xl transition-all duration-500 transform ${open ? "translate-y-0 scale-100" : "-translate-y-10 scale-95"
          }`}>
          <ul className="space-y-4">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className={`transition-all duration-500 delay-[${i * 100}ms] ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
              >
                <Link
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-secondary text-foreground"
                    }`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className={`pt-4 transition-all duration-500 delay-[200ms] ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}>
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
    </header>
  );
};
export default Header;
