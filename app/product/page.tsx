"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ProductContent() {
  const router = useRouter();
  const { addItem } = useCart();
  const searchParams = useSearchParams();

  const paramImg = searchParams.get("img") ? decodeURIComponent(searchParams.get("img")!) : null;
  const paramName = searchParams.get("name") ? decodeURIComponent(searchParams.get("name")!) : null;
  const paramPrice = searchParams.get("price") ? Number(searchParams.get("price")) : null;

  const displayImg = paramImg ?? "https://lh3.googleusercontent.com/aida-public/AB6AXuC8oXLccmEoIeR006kuYnm0BsivfAqT3mmPCQNtxTfq4vdMLXN2qaIpJwATMYN4sI1Ep720rM_0IIW_dcnSYh9yU4CU-9HL6YpGw1jstPtmMTBlyeyU_PXzVgkgb54ad42lMOkGeS8WbFyB4N_5zIJ61vyEiOtxpmi71WmP91LE1AB9IQInldN0URbMsviztns1QbVVDe8A0ssLfa8OiBMtHTt8hjJB_6c4IUfDAvhAwAmSPIxiD-waaNAaDVEGXWo3jia5cfxGkq0";
  const displayName = paramName ?? "The Noir Truffle Cake";
  const displayPrice = paramPrice ?? 2450;

  const [selectedSize, setSelectedSize] = useState("0.5 Kg");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("tasting");

  const img1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBVRXEFXv0Y_uGsRtRtv6wHpJoqlzUuPNwAgtkixzC2KirTMNzBmZ9RdYCvYjG-4GXS0GcIDQ4BeEu9TVmlVoTzt5l2YIN1vAYkDuRgIamqNaSGBL-2EGdl75STtgaGNy0-9bjd_sakYK75uboAGxHePU2OTmxN5tZCxJYJuoolQbbc9flyF1klDDvE8EMmix1b9LGL0Sf6hW6MgPvO40cmnDrtSg5IzKnPb4tKU6SMvE8MQXYyflZpd8CqP1Cc898AlVReJe_Tp4o";
  const img2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuCMqoGWw2fJlTId_y055H8pv0XnkYG1tlbYZNB067YzdARVM6XG4zTxeiRMEOuQ95nbHsYuR9aeZn67wctyvZN6e255aOZGVAqBUM-ejH_cqim3qnP1tGw7mcQS1bUbOXv8flhHvfPl-CytP-0g35UKO-wiWLoECI_uGqRK8gD6kdJ4zJwV5Apg2Bq89w2KW4SVMzandTS_5miyCjYSGK_GYglaFqWvg6H_SiGW-bqz_P1BujHovdDQaxL4RLTG5FscpZ3XGfKv6Bo";
  const img3 = "https://lh3.googleusercontent.com/aida-public/AB6AXuDu-lFko6PRYhNkSBBqEEVbt3IpNJhvIhL_RAhjDuNZzB9oO94ti3z2JKjbldVgRX9NIxz9HS-XFhChM6eReCFzMA-RDslP7aFQRsw3MwJiT6Y03RkGEoV7Gn-sQIMuu8xXdHCIJKwqsoyQmNzDOD1xEvuK_92wQB-TDleQugBnPFulp1Vl2s_mMW3cRUwtwwkaBt3I7ua_6HAd-JVe7LR_n6eTtO_9BfvYkc6TxEYTfwjeBRXSLRnmraXna-0PH1n-YzuA0eH3-18";

  const thumbnails = paramImg ? [] : [
    { src: img1, alt: "Thumbnail 1" },
    { src: img2, alt: "Thumbnail 2" },
    { src: img3, alt: "Thumbnail 3" },
  ];

  const [activeThumb, setActiveThumb] = useState(0);
  const [mainImg, setMainImg] = useState(displayImg);

  useEffect(() => {
    if (!paramImg && thumbnails.length > 0) {
      setMainImg(thumbnails[activeThumb].src);
    }
  }, [activeThumb]);

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

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(s);
    return () => {
      document.body.removeChild(s);
    };
  }, []);

  function handleAddToCart() {
    addItem({
      id: "product-noir-truffle",
      name: displayName,
      price: displayPrice,
      quantity,
      size: selectedSize,
      image: displayImg,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  }

  function handleBuyNow() {
    addItem({
      id: "product-noir-truffle",
      name: displayName,
      price: displayPrice,
      quantity,
      size: selectedSize,
      image: displayImg,
    });
    router.push("/checkout");
  }

  function toggleAccordion(key: string) {
    setOpenAccordion(openAccordion === key ? null : key);
  }

  const accordions = [
    {
      key: "tasting",
      label: "Tasting Notes",
      content:
        "Deep roasted coffee, subtle hints of dark cherry, and a lingering earthy finish. The texture contrasts a crisp outer shell with a meltingly soft interior.",
    },
    {
      key: "ingredients",
      label: "Ingredients",
      content:
        "70% Dark Chocolate (Cocoa Mass, Sugar, Cocoa Butter, Emulsifier: Soy Lecithin), Heavy Cream, Organic Eggs, Almond Flour, Madagascar Vanilla Bean.",
    },
    {
      key: "storage",
      label: "Storage & Serving",
      content:
        "Keep refrigerated. For the best sensory experience, allow the cake to sit at room temperature for 20 minutes before serving.",
    },
  ];

  return (
    <div
      style={{
        background: "#0d0d0d",
        color: "#f5f0eb",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
        .is-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
        .btn-lift:hover { transform: scale(1.02); box-shadow: 0 8px 30px rgba(139,69,19,0.4); }
        .btn-lift:active { transform: scale(0.98); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        details summary::-webkit-details-marker { display: none; }
        .thumb-active { border: 1px solid #c8a96e !important; opacity: 1 !important; }
        .thumb-inactive { border: 1px solid rgba(139,69,19,0.2); opacity: 0.5; }
        .thumb-inactive:hover { opacity: 1; }
      `}</style>

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(13,13,13,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "all 0.3s",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <button
            onClick={() => router.push("/")}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#f5f0eb",
              letterSpacing: "0.15em",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            DARK BROWN
          </button>
        </div>
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          <button
            onClick={() => router.push("/shop")}
            style={{
              color: "#c8a96e",
              borderBottom: "2px solid #c8a96e",
              paddingBottom: 4,
              background: "none",
              border: "none",
              borderBottom: "2px solid #c8a96e",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Shop
          </button>
          <button
            onClick={() => router.push("/")}
            style={{
              color: "#f5f0eb",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c8a96e")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#f5f0eb")}
          >
            Our Story
          </button>
          <button
            onClick={() => router.push("/shop")}
            style={{
              color: "#f5f0eb",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c8a96e")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#f5f0eb")}
          >
            Gifting
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => router.push("/checkout")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#f5f0eb",
              transition: "opacity 0.2s",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 24 }}
            >
              shopping_cart
            </span>
          </button>
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#f5f0eb",
              transition: "opacity 0.2s",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 24 }}
            >
              account_circle
            </span>
          </button>
        </div>
      </nav>

      {/* Main */}
      <main
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 40px 80px",
          paddingTop: 96,
          boxSizing: "border-box",
        }}
      >
        {/* Product Section */}
        <section
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 24,
            marginTop: 32,
            alignItems: "start",
          }}
        >
          {/* Gallery */}
          <div
            style={{
              gridColumn: "span 7",
              display: "flex",
              flexDirection: "row",
              gap: 16,
              position: "sticky",
              top: 128,
            }}
          >
            {/* Thumbnails — only if no paramImg */}
            {!paramImg && thumbnails.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  width: 96,
                  flexShrink: 0,
                }}
              >
                {thumbnails.map((thumb, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveThumb(i);
                      setMainImg(thumb.src);
                    }}
                    className={i === activeThumb ? "thumb-active" : "thumb-inactive"}
                    style={{
                      width: "100%",
                      aspectRatio: "4/5",
                      background: "#1a1a1a",
                      borderRadius: 6,
                      overflow: "hidden",
                      border: i === activeThumb ? "1px solid #c8a96e" : "1px solid rgba(139,69,19,0.2)",
                      opacity: i === activeThumb ? 1 : 0.5,
                      cursor: "pointer",
                      padding: 0,
                      position: "relative",
                      transition: "opacity 0.2s",
                    }}
                  >
                    <img
                      src={thumb.src}
                      alt={thumb.alt}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {i !== activeThumb && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.2)",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div
              style={{
                flex: 1,
                aspectRatio: "4/5",
                background: "#1a1a1a",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                position: "relative",
              }}
            >
              <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                <img
                  src={mainImg}
                  alt="Main Product Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
                  }
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  background: "rgba(26,26,26,0.8)",
                  backdropFilter: "blur(8px)",
                  padding: "4px 16px",
                  borderRadius: 9999,
                  border: "1px solid rgba(139,69,19,0.3)",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#c8a96e",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Signature
                </span>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div
            style={{
              gridColumn: "span 5",
              display: "flex",
              flexDirection: "column",
              paddingTop: 0,
            }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 42,
                fontWeight: 700,
                color: "#f5f0eb",
                marginBottom: 12,
                lineHeight: 1.2,
              }}
            >
              {displayName}
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 32,
                fontWeight: 700,
                color: "#FF6B35",
                marginBottom: 24,
              }}
            >
              ₹ {displayPrice.toLocaleString("en-IN")}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                lineHeight: 1.7,
                color: "rgba(245,240,235,0.7)",
                marginBottom: 24,
              }}
            >
              A masterclass in restraint. 70% Single-Origin Indian Cacao, layered with whipped ganache and a brittle dark chocolate shell. Dense, bitter-sweet, and undeniably sophisticated.
            </p>

            {/* Size Selector */}
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#f5f0eb",
                  display: "block",
                  marginBottom: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Size
              </label>
              <div style={{ display: "flex", gap: 12 }}>
                {["0.5 Kg", "1.0 Kg"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 9999,
                      border:
                        selectedSize === size
                          ? "1px solid #c8a96e"
                          : "1px solid rgba(255,255,255,0.15)",
                      color: selectedSize === size ? "#c8a96e" : "rgba(245,240,235,0.6)",
                      background: selectedSize === size ? "rgba(200,169,110,0.1)" : "transparent",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div
              style={{
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <label
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#f5f0eb",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Quantity
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 9999,
                  background: "#1a1a1a",
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(245,240,235,0.6)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#f5f0eb")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.6)")
                  }
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    remove
                  </span>
                </button>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#f5f0eb",
                    width: 32,
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(245,240,235,0.6)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#f5f0eb")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.6)")
                  }
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    add
                  </span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              <button
                className="btn-lift"
                onClick={handleAddToCart}
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 9999,
                  background: "#8B4513",
                  color: "#f5f0eb",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 0 15px rgba(139,69,19,0.3)",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), background 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#7a3c10")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#8B4513")
                }
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                  shopping_bag
                </span>
                {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                className="btn-lift"
                onClick={handleBuyNow}
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 9999,
                  background: "#FF6B35",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), background 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#e85c28")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#FF6B35")
                }
              >
                Buy Now
              </button>
            </div>

            {/* Made in India Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 0",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                marginTop: 8,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "2px solid #c8a96e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#c8a96e",
                  flexShrink: 0,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                  verified
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "rgba(245,240,235,0.6)",
                  lineHeight: 1.5,
                }}
              >
                Proudly crafted in India using ethically sourced, single-origin cacao.
              </span>
            </div>

            {/* Accordion */}
            <div
              style={{
                marginTop: 16,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {accordions.map((acc) => (
                <div
                  key={acc.key}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <button
                    onClick={() => toggleAccordion(acc.key)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#f5f0eb",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 18,
                      fontWeight: 600,
                      textAlign: "left",
                    }}
                  >
                    {acc.label}
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: 22,
                        color: "rgba(245,240,235,0.6)",
                        transform: openAccordion === acc.key ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordion === acc.key && (
                    <div
                      style={{
                        paddingBottom: 16,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: "rgba(245,240,235,0.6)",
                        lineHeight: 1.7,
                      }}
                    >
                      {acc.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section
          className="reveal"
          style={{
            marginTop: 80,
            paddingTop: 48,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 42,
              fontWeight: 700,
              color: "#f5f0eb",
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            Curated Impressions
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {/* Review Card 1 */}
            <div
              className="card-hover"
              style={{
                background: "#1a1a1a",
                padding: 28,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), border-color 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(139,69,19,0.4)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")
              }
            >
              <div style={{ display: "flex", color: "#c8a96e", marginBottom: 12 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    star
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "rgba(245,240,235,0.65)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                "An absolute masterpiece. The balance of bitterness and rich texture is unlike anything I've experienced. Truly a gallery-worthy dessert."
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#f5f0eb",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                - Ananya D.
              </p>
            </div>

            {/* Review Card 2 */}
            <div
              className="card-hover"
              style={{
                background: "#1a1a1a",
                padding: 28,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), border-color 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(139,69,19,0.4)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")
              }
            >
              <div style={{ display: "flex", color: "#c8a96e", marginBottom: 12 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    star
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "rgba(245,240,235,0.65)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                "Perfect for our anniversary. The presentation is as dark and moody as advertised, and the taste is incredibly profound."
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#f5f0eb",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                - Vikram S.
              </p>
            </div>

            {/* Review Card 3 */}
            <div
              className="card-hover"
              style={{
                background: "#1a1a1a",
                padding: 28,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), border-color 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(139,69,19,0.4)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")
              }
            >
              <div style={{ display: "flex", color: "#c8a96e", marginBottom: 12 }}>
                {[1, 2, 3, 4].map((s) => (
                  <span key={s} className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                  star_half
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "rgba(245,240,235,0.65)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                "Rich, dense, and unapologetically dark. A bit too intense for casual eaters, but perfect for true chocolate aficionados."
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#f5f0eb",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                - Rohan M.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          padding: "64px 40px",
          background: "#0d0d0d",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <div style={{ gridColumn: "span 1" }}>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#f5f0eb",
                marginBottom: 12,
                letterSpacing: "0.1em",
              }}
            >
              DARK BROWN
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "rgba(245,240,235,0.45)",
                marginTop: 24,
                lineHeight: 1.6,
              }}
            >
              © 2024 Dark Brown Chocolate. Made in India.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(245,240,235,0.55)",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                textAlign: "left",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f0eb")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.55)")
              }
            >
              Philosophy
            </button>
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(245,240,235,0.55)",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                textAlign: "left",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f0eb")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.55)")
              }
            >
              Sustainability
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              onClick={() => router.push("/shop")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(245,240,235,0.55)",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                textAlign: "left",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f0eb")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.55)")
              }
            >
              Shipping
            </button>
            <button
              onClick={() => router.push("/shop")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(245,240,235,0.55)",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                textAlign: "left",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f0eb")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.55)")
              }
            >
              Returns
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(245,240,235,0.55)",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                textAlign: "left",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f0eb")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.55)")
              }
            >
              Privacy
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#1a1a1a",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 40,
        }}
        className="md:hidden"
      >
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "rgba(245,240,235,0.5)",
              marginBottom: 2,
            }}
          >
            {displayName}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#FF6B35",
            }}
          >
            ₹ {displayPrice.toLocaleString("en-IN")}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          style={{
            background: "#8B4513",
            color: "#f5f0eb",
            border: "none",
            borderRadius: 9999,
            padding: "12px 28px",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 0 15px rgba(139,69,19,0.3)",
          }}
        >
          {addedToCart ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0d0d0d" }} />}>
      <ProductContent />
    </Suspense>
  );
}