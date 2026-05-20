"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubscribe = () => {
    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubscribed(true);
    setEmail("");
  };

  const linkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#dac2b6",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    letterSpacing: "0.02em",
    padding: "0",
    textAlign: "left",
    transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: 1.6,
  };

  return (
    <footer
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(139, 69, 19, 0.2)",
        color: "#e5e2e1",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Main Footer Grid */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 1.25rem 2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "3rem",
        }}
      >
        {/* Brand Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#e5e2e1",
              textTransform: "uppercase",
              padding: "0",
              textAlign: "left",
              transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e5e2e1"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "3px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
            aria-label="Dark Brown — Home"
          >
            DARK BROWN
          </button>
          <p
            style={{
              color: "#dac2b6",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              maxWidth: "260px",
              margin: 0,
            }}
          >
            Unapologetically rich. Artfully crafted. Premium dark chocolate cakes made by master chocolatiers in India — for those who understand that true luxury lives in the details.
          </p>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Dark Brown on Instagram"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(139, 69, 19, 0.15)",
                border: "1px solid rgba(139, 69, 19, 0.3)",
                color: "#dac2b6",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "rgba(233, 195, 73, 0.15)";
                el.style.borderColor = "#e9c349";
                el.style.color = "#e9c349";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "rgba(139, 69, 19, 0.15)";
                el.style.borderColor = "rgba(139, 69, 19, 0.3)";
                el.style.color = "#dac2b6";
              }}
              onFocus={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLAnchorElement).style.outlineOffset = "2px"; }}
              onBlur={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "none"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Dark Brown on Twitter"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(139, 69, 19, 0.15)",
                border: "1px solid rgba(139, 69, 19, 0.3)",
                color: "#dac2b6",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "rgba(233, 195, 73, 0.15)";
                el.style.borderColor = "#e9c349";
                el.style.color = "#e9c349";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "rgba(139, 69, 19, 0.15)";
                el.style.borderColor = "rgba(139, 69, 19, 0.3)";
                el.style.color = "#dac2b6";
              }}
              onFocus={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLAnchorElement).style.outlineOffset = "2px"; }}
              onBlur={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "none"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Dark Brown on WhatsApp"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(139, 69, 19, 0.15)",
                border: "1px solid rgba(139, 69, 19, 0.3)",
                color: "#dac2b6",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "rgba(233, 195, 73, 0.15)";
                el.style.borderColor = "#e9c349";
                el.style.color = "#e9c349";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "rgba(139, 69, 19, 0.15)";
                el.style.borderColor = "rgba(139, 69, 19, 0.3)";
                el.style.color = "#dac2b6";
              }}
              onFocus={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLAnchorElement).style.outlineOffset = "2px"; }}
              onBlur={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "none"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#e9c349",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              margin: "0 0 0.75rem 0",
            }}
          >
            Quick Links
          </h3>
          <button
            onClick={() => router.push("/")}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#dac2b6"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Home
          </button>
          <button
            onClick={() => router.push("/shop")}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#dac2b6"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Shop
          </button>
          <button
            onClick={() => router.push("/gifting")}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#dac2b6"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Gifting
          </button>
          <button
            onClick={() => router.push("/")}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#dac2b6"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Our Story
          </button>
          <button
            onClick={() => router.push("/contact")}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#dac2b6"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Contact
          </button>
        </div>

        {/* Info Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#e9c349",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: "0 0 0.75rem 0",
            }}
          >
            Info
          </h3>
          <button
            onClick={() => router.push("/faq")}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#dac2b6"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            FAQs
          </button>
          <button
            onClick={() => router.push("/shipping")}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#dac2b6"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Shipping & Delivery
          </button>
          <button
            onClick={() => router.push("/returns")}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#dac2b6"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Returns Policy
          </button>
          <button
            onClick={() => router.push("/privacy")}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#dac2b6"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => router.push("/terms")}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e9c349"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#dac2b6"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Terms of Service
          </button>
        </div>

        {/* Newsletter Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#e9c349",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: "0 0 0.25rem 0",
            }}
          >
            Stay in the Dark
          </h3>
          <p
            style={{
              color: "#dac2b6",
              fontSize: "0.875rem",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Exclusive drops, artisan stories, and indulgent offers — delivered to your inbox.
          </p>

          {subscribed ? (
            <div
              style={{
                backgroundColor: "rgba(233, 195, 73, 0.1)",
                border: "1px solid rgba(233, 195, 73, 0.35)",
                borderRadius: "10px",
                padding: "0.875rem 1rem",
                color: "#e9c349",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              You're on the list. Expect something rich.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(139, 69, 19, 0.4)" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubscribe(); }}
                  placeholder="your@email.com"
                  aria-label="Email address for newsletter"
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(26, 26, 26, 0.8)",
                    border: "none",
                    padding: "0.75rem 1rem",
                    color: "#e5e2e1",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    outline: "none",
                    minWidth: 0,
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  style={{
                    backgroundColor: "#FF6B35",
                    color: "#000",
                    border: "none",
                    padding: "0.75rem 1.1rem",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ff7d4d";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FF6B35";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  }}
                  onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
                  onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                  onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #e9c349"; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
                >
                  Subscribe
                </button>
              </div>
              {emailError && (
                <span
                  role="alert"
                  style={{
                    color: "#ff6b6b",
                    fontSize: "0.775rem",
                    fontFamily: "'DM Sans', sans-serif",
                    paddingLeft: "0.25rem",
                  }}
                >
                  {emailError}
                </span>
              )}
            </div>
          )}

          {/* India Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            <span style={{ fontSize: "1.1rem" }} aria-hidden="true">🇮🇳</span>
            <span
              style={{
                color: "#dac2b6",
                fontSize: "0.775rem",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Crafted with love in India
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.25rem",
        }}
      >
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(139, 69, 19, 0.2)",
          }}
        />
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.5rem 1.25rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <p
          style={{
            color: "#dac2b6",
            fontSize: "0.8rem",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.02em",
            margin: 0,
            opacity: 0.75,
          }}
        >
          &copy; {currentYear} Dark Brown Chocolate. All rights reserved. Payments secured by{" "}
          <span style={{ color: "#e9c349", fontWeight: 600 }}>Razorpay</span>.
        </p>
        <p
          style={{
            color: "#dac2b6",
            fontSize: "0.8rem",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.02em",
            margin: 0,
            opacity: 0.6,
          }}
        >
          Unapologetically Rich. Artfully Crafted.
        </p>
      </div>
    </footer>
  );
}