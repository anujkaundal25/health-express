"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/components/data/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus when the page changes
  useEffect(() => {
    setOpen(false);
    setSub(null);
  }, [pathname]);

  const isActive = (href: string, children?: { href: string }[]) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href) || !!children?.some((c) => pathname === c.href);

  return (
    <header id="top" className={scrolled || pathname !== "/" ? "scrolled" : ""}>
      <div className="wrap nav">
        <Link href="/" className="brand" aria-label={`${site.name} – home`}>
          <Image className="logo-img" src="/images/logo-coin.png" alt="Health Express Ambulette logo" width={64} height={64} priority />
          <span>
            Health Express<small>AMBULETTE</small>
          </span>
        </Link>
        <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? "✕" : "☰"}
        </button>
        <nav aria-label="Main">
          <ul id="menu" className={open ? "show" : ""}>
            {nav.map((item) => (
              <li key={item.label} className={item.children ? `has-sub${sub === item.label ? " sub-open" : ""}` : ""}>
                <Link href={item.href} className={isActive(item.href, item.children) ? "active" : ""}>
                  {item.label}
                </Link>
                {item.children && (
                  <>
                    <button
                      className="sub-toggle"
                      aria-label={`Show ${item.label} pages`}
                      aria-expanded={sub === item.label}
                      onClick={() => setSub((s) => (s === item.label ? null : item.label))}
                    >
                      ▾
                    </button>
                    <ul className="sub-menu">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className={pathname === c.href ? "active" : ""}>
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
            <li className="nav-cta">
              <Link href="/schedule" className="btn btn-gold">Book Now</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
