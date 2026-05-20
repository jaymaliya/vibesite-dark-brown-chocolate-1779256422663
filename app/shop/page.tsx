"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

const products = [
  { id: 1, img: "/product-1.jpg", name: "round, dark brown", description: "A round, dark brown chocolate cake with ridged frosting, chocolate shavings, and", price: 0, badge: "NEW" },
  { id: 2, img: "/product-2.jpg", name: "round white cheesecake", description: "A round white cheesecake with a golden crust, topped with dark blueberries, sauce drips,", price: 399, badge: "" },
  { id: 3, img: "/product-3.jpg", name: "round cake light", description: "A round cake with light brown frosting, caramel drip, piped swirls, caramel squares,", price: 499, badge: "" },
  { id: 4, img: "/product-4.jpg", name: "multi-layered red velvet", description: "A multi-layered red velvet cake with white cream cheese frosting, piped rosettes, red", price: 599, badge: "" }
];

export default function ShopPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [activeFilter, setActiveFilter] = useState("All");
  const [addedStates, setAddedStates] = useState<{ [key: number]: boolean }>({});
  const [navScrolled, setNavScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filters = ["All", "Dark Chocolate", "Celebration", "Signature"];

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.add("is-hidden"));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("is-hidden");
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleViewDetails = (p: typeof products[0]) => {
    router.push(
      `/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`
    );
  };

  const handleAddToCart = (p: typeof products[0]) => {
    addItem({
      id: crypto.randomUUID(),
      name: p.name,
      price: p.price,
      quantity: 1,
      image: p.img,
    });
    setAddedStates((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedStates((prev) => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  return (
    <div
      style={{
        background: "#111111",
        color: "#F5F0EB",
        fontFamily: "'Georgia', serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-style: normal;
          display: inline-block;
          line-height: 1;
          letter-spacing: normal;
          word-wrap: normal;
          white-space: nowrap;
          direction: ltr;
        }

        .is-hidden {
          opacity: 0;
          transform: translateY(32px);
        }
        .visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .card-hover {
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .btn-lift {
          transition: transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1);
        }
        .btn-lift:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .btn-lift:active {
          transform: scale(0.98);
        }
        .img-hover-wrap img {
          transition: transform 0.7s ease-out;
        }
        .img-hover-wrap:hover img {
          transform: scale(1.06);
        }
        .filter-btn {
          transition: all 0.2s ease;
        }
        .filter-btn:hover {
          border-color: #C4A882;
          color: #C4A882;
        }
        .nav-link {
          transition: color 0.2s ease, opacity 0.2s ease;
        }
        .nav-link:hover {
          opacity: 0.7;
        }
        .footer-link {
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .footer-link:hover {
          color: #F5F0EB;
          transform: translateX(4px);
        }
      `}</style>

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: navScrolled ? "rgba(17,17,17,0.85)" : "transparent",
          backdropFilter: "blur(12px)",
          boxShadow: navScrolled ? "0 1px 8px rgba(0,0,0,0.4)" : "none",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 40px",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          {/* Left links */}
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <button
              className="nav-link"
              onClick={() => router.push("/shop")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#C4A882",
                borderBottom: "2px solid #C4A882",
                paddingBottom: "4px",
                letterSpacing: "0.5px",
              }}
            >
              Shop
            </button>
            <button
              className="nav-link"
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#F5F0EB",
                letterSpacing: "0.5px",
              }}
            >
              Our Story
            </button>
            <button
              className="nav-link"
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#F5F0EB",
                letterSpacing: "0.5px",
              }}
            >
              Gifting
            </button>
          </div>

          {/* Brand */}
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#F5F0EB",
              letterSpacing: "4px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            DARK BROWN
          </button>

          {/* Right icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              aria-label="Shopping Cart"
              onClick={() => router.push("/checkout")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#F5F0EB",
                padding: "8px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <button
              aria-label="Account"
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#F5F0EB",
                padding: "8px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main style={{ flexGrow: 1, paddingTop: "100px" }}>
        {/* Trust Strip */}
        <div
          style={{
            background: "#1A1A1A",
            borderBottom: "1px solid rgba(196,168,130,0.2)",
            padding: "10px 40px",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: "#C4A882",
            letterSpacing: "0.5px",
          }}
        >
          ★★★★★ 4.8 &nbsp;|&nbsp; 10,000+ customers &nbsp;|&nbsp; Free Shipping &nbsp;|&nbsp; Made in India
        </div>

        {/* Header Section */}
        <section
          className="reveal"
          style={{
            padding: "64px 40px 40px",
            textAlign: "center",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 700,
              color: "#F5F0EB",
              marginBottom: "20px",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
            }}
          >
            Our Decadent Collection
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              color: "rgba(245,240,235,0.6)",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Discover our handcrafted masterpieces, where rich heritage meets modern indulgence.
          </p>
        </section>

        {/* Filters */}
        <section
          className="reveal"
          style={{
            padding: "0 40px 48px",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                className="filter-btn btn-lift"
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  border: activeFilter === f ? "1px solid #C4A882" : "1px solid rgba(196,168,130,0.3)",
                  background: activeFilter === f ? "#C4A882" : "transparent",
                  color: activeFilter === f ? "#1A1A1A" : "rgba(245,240,235,0.6)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section
          className="reveal"
          style={{
            padding: "0 40px 80px",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}
          >
            {products.map((p) => (
              <article
                key={p.id}
                className="card-hover"
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(196,168,130,0.15)",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => handleViewDetails(p)}
              >
                {/* Badge */}
                {p.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      zIndex: 10,
                      background: "#C4A882",
                      color: "#1A1A1A",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "1.5px",
                      padding: "4px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    {p.badge}
                  </div>
                )}

                {/* Image */}
                <div
                  className="img-hover-wrap"
                  style={{
                    aspectRatio: "4/5",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(20px, 2.5vw, 28px)",
                        fontWeight: 700,
                        color: "#F5F0EB",
                        marginBottom: "8px",
                        lineHeight: 1.2,
                      }}
                    >
                      {p.name}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        color: "rgba(245,240,235,0.55)",
                        lineHeight: 1.6,
                      }}
                    >
                      {p.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#C4A882",
                      }}
                    >
                      {p.price === 0 ? "POA" : `₹${p.price}`}
                    </span>

                    <button
                      className="btn-lift"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(p);
                      }}
                      style={{
                        padding: "12px 24px",
                        borderRadius: "9999px",
                        border: "2px solid rgba(196,168,130,0.4)",
                        background: "transparent",
                        color: "#F5F0EB",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        cursor: "pointer",
                        minHeight: "56px",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: "0.5px",
                        transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(196,168,130,0.15)";
                        e.currentTarget.style.borderColor = "#C4A882";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "rgba(196,168,130,0.4)";
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          padding: "64px 40px",
          background: "#111111",
          borderTop: "1px solid rgba(196,168,130,0.2)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "32px",
            maxWidth: "1280px",
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          {/* Brand col */}
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#F5F0EB",
                marginBottom: "16px",
                letterSpacing: "3px",
              }}
            >
              DARK BROWN
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#C4A882",
                lineHeight: 1.6,
              }}
            >
              © 2024 Dark Brown Chocolate. Made in India.
            </p>
          </div>

          {/* Col 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {["Philosophy", "Sustainability", "Shipping"].map((link) => (
              <button
                key={link}
                className="footer-link"
                onClick={() => router.push("/")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "rgba(245,240,235,0.55)",
                  textAlign: "left",
                  padding: 0,
                  letterSpacing: "0.3px",
                }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Col 3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {["Returns", "Privacy"].map((link) => (
              <button
                key={link}
                className="footer-link"
                onClick={() => router.push("/")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "rgba(245,240,235,0.55)",
                  textAlign: "left",
                  padding: 0,
                  letterSpacing: "0.3px",
                }}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}