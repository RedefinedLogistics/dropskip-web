"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookDemoButton from "./BookDemoButton";
import ThemeToggle from "./ThemeToggle";
import { navLinks } from "@/lib/nav";

// Product.html and shopify.html carry an announcement strip above the header.
// The wrapper class lets each page's own scoped styles reach the strip.
const signalBars = {
  "/product": {
    scope: "product-page",
    text: "AI-enabled supply-chain decisions to scale cash flow and margins.",
  },
  "/shopify": {
    scope: "shopify-page",
    text: "Native Shopify app: Connect storefront sales with inventory, incoming supply and purchasing.",
  },
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const navRef = useRef(null);

  // Escape closes the mobile panel, as in the source design.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // A dropdown closes on Escape or on a click outside it.
  useEffect(() => {
    if (!openGroup) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenGroup(null);
    };
    const onPointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openGroup]);

  const close = () => {
    setOpen(false);
    setOpenGroup(null);
  };

  // A link is current for its own page and for anything nested under it, so a
  // blog post still lights up the Blog entry. "/" is excluded, or it would
  // match every page.
  const isCurrent = (href) => {
    const path = href.split("#")[0];
    return pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
  };

  // A dropdown is current when the page open is one of the pages inside it.
  const groupIsCurrent = (link) => link.children.some((child) => isCurrent(child.href));
  const signal = signalBars[pathname];

  return (
    <>
      {signal ? (
        <div className={signal.scope}>
          <div className="signal-bar">
            <div className="wrap signal-inner">
              <span className="signal-dot" aria-hidden="true" />
              <span>{signal.text}</span>
            </div>
          </div>
        </div>
      ) : null}

      <header>
        <div className="wrap nav">
          <Link className="brand" href="/" aria-label="DropSkip home" onClick={close}>
            <Image
              className="brand-logo"
              src="/dropskip-logo.png"
              alt="DropSkip"
              width={1774}
              height={887}
              priority
            />
          </Link>

          <nav
            className={open ? "nav-links open" : "nav-links"}
            id="nav-links"
            aria-label="Primary navigation"
            ref={navRef}
          >
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className={[
                    "nav-group",
                    openGroup === link.label ? "open" : "",
                    groupIsCurrent(link) ? "current" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <button
                    type="button"
                    className="nav-group-trigger"
                    aria-expanded={openGroup === link.label}
                    aria-controls={`submenu-${link.label.toLowerCase()}`}
                    onClick={() =>
                      setOpenGroup((current) => (current === link.label ? null : link.label))
                    }
                  >
                    {link.label}
                    <svg viewBox="0 0 12 8" aria-hidden="true" className="nav-chevron">
                      <path
                        d="M1 1.5 6 6.5l5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <ul className="submenu" id={`submenu-${link.label.toLowerCase()}`}>
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          aria-current={isCurrent(child.href) ? "page" : undefined}
                        >
                          <span className="submenu-label">{child.label}</span>
                          <span className="submenu-blurb">{child.blurb}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  onClick={close}
                >
                  {link.label}
                </Link>
              ),
            )}
            <BookDemoButton className="btn btn-primary">
              Book a Demo <span className="arrow">↗</span>
            </BookDemoButton>
          </nav>

          <div className="header-tools">
            <ThemeToggle />
            <button
              className="menu"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              aria-controls="nav-links"
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
