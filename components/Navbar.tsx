"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevCount, setPrevCount] = useState(totalItems);
  const [badgePulse, setBadgePulse] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems !== prevCount) {
      setBadgePulse(true);
      setPrevCount(totalItems);
      const t = setTimeout(() => setBadgePulse(false), 400);
      return () => clearTimeout(t);
    }
  }, [totalItems, prevCount]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  const navLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: "#e5e2e1",
    fontFamily: "'DM Sans', sans-serif",
    padding: "0",
    transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    textDecoration: "none",
  };

  const activeNavLinkStyle: React.CSSProperties = {
    ...navLinkStyle,
    color: "#e9c349",
    borderBottom: "2px solid #e9c349",
    paddingBottom: "2px",
  };

  const mobileNavLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: "#e5e2e1",
    fontFamily: "'DM Sans', sans-serif",
    padding: "0.75rem 1.5rem",
    width: "100%",
    textAlign: "left",
    transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    borderBottom: "1px solid rgba(139, 69, 19, 0.15)",
  };

  return (
    <header
      ref={mobileMenuRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "rgba(10, 10, 10, 0.92)" : "rgba(10, 10, 10, 0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: scrolled
          ? "0 2px 24px rgba(0,0,0,0.55), 0 1px 0 rgba(139,69,19,0.15)"
          : "none",
        transition: "box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderBottom: scrolled ? "1px solid rgba(139, 69, 19, 0.18)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.25rem",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Left Nav Links — Desktop */}
        <div
          className="hidden md:flex"
          style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
        >
          <button
            onClick={() => router.push("/shop")}
            style={activeNavLinkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Shop
          </button>
          <button
            onClick={() => router.push("/")}
            style={navLinkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e5e2e1"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Our Story
          </button>
          <button
            onClick={() => router.push("/gifting")}
            style={navLinkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e5e2e1"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Gifting
          </button>
        </div>

        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.35rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#e5e2e1",
            textTransform: "uppercase",
            padding: "0",
            lineHeight: 1,
            transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e5e2e1"; }}
          onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "4px"; }}
          onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          aria-label="Dark Brown — Home"
        >
          DARK BROWN
        </button>

        {/* Right Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Cart Button */}
          <button
            onClick={() => router.push("/cart")}
            aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e5e2e1",
              padding: "0.25rem",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "50%",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.75"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.92)"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            {/* Cart SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>

            {/* Badge */}
            {totalItems > 0 && (
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  backgroundColor: "#FF6B35",
                  color: "#fff",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  minWidth: "18px",
                  height: "18px",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px",
                  lineHeight: 1,
                  transform: badgePulse ? "scale(1.35)" : "scale(1)",
                  transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "2px solid #0A0A0A",
                  boxShadow: "0 0 8px rgba(255, 107, 53, 0.5)",
                }}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Account Button */}
          <button
            onClick={() => router.push("/account")}
            aria-label="My account"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e5e2e1",
              padding: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "50%",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.75"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.92)"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Hamburger — Mobile only */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e5e2e1",
              padding: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        aria-label="Mobile navigation"
        style={{
          maxHeight: mobileOpen ? "320px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "rgba(10, 10, 10, 0.97)",
          borderTop: mobileOpen ? "1px solid rgba(139, 69, 19, 0.2)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "0.5rem",
          }}
        >
          <button
            onClick={() => { router.push("/shop"); setMobileOpen(false); }}
            style={mobileNavLinkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(233, 195, 73, 0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e5e2e1"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Shop
          </button>
          <button
            onClick={() => { router.push("/"); setMobileOpen(false); }}
            style={mobileNavLinkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(233, 195, 73, 0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e5e2e1"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Our Story
          </button>
          <button
            onClick={() => { router.push("/gifting"); setMobileOpen(false); }}
            style={{ ...mobileNavLinkStyle, borderBottom: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(233, 195, 73, 0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e5e2e1"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Gifting
          </button>
        </div>
      </nav>
    </header>
  );
}