"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import { useState, useEffect } from "react";

export default function DarkBrownChocolatePage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isSpinning] = useState(true);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    els.forEach(el => el.classList.add('is-hidden'));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('is-hidden');
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const products = [
    {
      id: "ivory-truffle-cheesecake",
      name: "Ivory Truffle Cheesecake",
      desc: "Madagascar vanilla & white cacao",
      price: 2400,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcwH6_1i67q86z6DxnLRv2OI8SU0kVyiNkAGRxGUAZI3PafqstFFb9H12unpMEtogFm7Subc7sTbk-NqP640CekOQfFyzD0QzmYpb2vLCcUzZzUiDXhojZS7YOHDtO0WEGT4lBjUjaxHZ5zVnJLUk1H0ZvsYEwX1znT5Bw9jnIEqJ8a98FZ8Ni9zLpuLc0Sklhxb4x-NsnKRudoC62VXChry4qtuqn9igkGVIZ1C6eFk7DRatSewVNedACbSgND3hBkNAwcbcK8Kw",
      badge: "Limited",
      badgeColor: "#FF6B35",
      badgeTextColor: "black",
    },
    {
      id: "salted-caramel-pecan",
      name: "Salted Caramel Pecan",
      desc: "70% Dark with Himalayan salt",
      price: 2800,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHPZtfkqpU1vbDKpud0jBv64cJayqCA1QRMA-nrFIkTO_Jb2HUMrwv5ITY2sjhG8_U0are4g4iTX9HvTTVweFWIoddkzcUTsR0KYuLIfPeI8LDali-uc6yEyq7FSG_wdN7tziCz2YnOyFxZfgqFz682lKJKoOdYe0oHF7XDoXBm7u_89O-661ddqRMQsSo5vEV7YpptwwssKyt_WyBdXn79tpPpf5rSoMmsXxMvB9nxzilj6WNPk5hl9B_o5jEpOwKvtTwVR9QkKo",
      badge: null,
      badgeColor: null,
      badgeTextColor: null,
    },
    {
      id: "noir-red-velvet",
      name: "Noir Red Velvet",
      desc: "Beetroot infusion & mascarpone",
      price: 3200,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALsXD3guB8ov37EunECYoNdY8T7ncAGYtAlnz6l3brrRGtN62WMFW6BzF93YFTUrAUKZMP9atY4dLPPafBAvptC9Uvz0hfY4bE1MB_81VgoUHwpG_b2nVxEFFXCThSVEhGHWqyCaIy_9kE10ryAWKMLIfwAWAb-gVnxsOyfskJyY4sQ0z-UZwuB1P37ym2OwglQz3ey3GHDWOQWjhxI1ASBfc7SJBeZSNS_vNSKK8CHumLQKStL2PN448mk8VNMFN_a4CliiO2cM8",
      badge: "Signature",
      badgeColor: "#5C3317",
      badgeTextColor: "white",
    },
  ];

  const occasions = [
    {
      label: "Wedding",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfhYjlBVhVB1KzCRWtgCcB1ogXNAuf9ULUedt_92iUUb6mtKFywIX_XuEbDaUNE1uo9BpgvVzWNNG2j2hUMNe_CQJVieG81f9h8dSqTicMNk250xA7s6krK9CcV6gbFTpssa5g1_GrhtYhZ2uPu9eG-eldFckSqJq9NrLez4THEFQ-uV4snN60uvHkG5YTIZLy8NyRKZajtLZBHPcmfJeZpUHTyIZhVQfJTWl_CtPCtaiimmXvynhxhS8FCgnE87HWiyCW1sD76ww",
    },
    {
      label: "Birthday",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCly5JjISeX5Du2jKzte3hUXvCVrWeHboV78mOKhAc1PJ3fCTiZMKxrim4ih07rkgFJpF5RlYnxM0n-C5Pawwz__itQAX6sx--cB_e_Kmou_r5tNrsymkUbxrip9_kDryyPSgfaWXSlQvPYLaRgm-K9dQekH0B1StBgF8E1zA6nBvvzKnOM_-UtLKu0EUUKCwlfBOuQucZCwwjt2JFgF-9i9EKUPgL4HVaotT8f3cU8qYXnx61JgpqAS_Bq647gnD2FU4tokLfX9DA",
    },
    {
      label: "Corporate\nGifting",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8vQlo8xqSefpAAF0SGXwsHWtPPtIwjFIy2zUuKeXzLlipvP8kxE14VKzdsgslloaXh950fhu__onT28C_GyzcbFaOQSfZnWewkPRywQ_FRPdUfgS7b66a6uzMyCu26kqZzG5ZYj-7m7npkktNSIevOvHT6lK9Q-ml2u5faP583b08FTD5s6xwQ_pxD5xCVKB-q1XUmrlvaNuibV0CVZ9KVoBjVoPH-thDUiluajH6klftz6HQ66fh3TCcXXjeXb75Ahuyg6BlGpo",
    },
  ];

  const testimonials = [
    {
      quote: '"The Salted Caramel Pecan was a revelation. It didn\'t just taste expensive; it felt like a curated gallery piece."',
      author: "— Ananya D.",
    },
    {
      quote: '"Ordered for a corporate event. The presentation is as meticulously crafted as the intensely rich flavors inside."',
      author: "— Vikram S.",
    },
    {
      quote: '"A true masterpiece. The Noir Red Velvet destroyed any other cake experience I\'ve had. Unapologetic is right."',
      author: "— Meera R.",
    },
  ];

  return (
    <div
      className="page-enter antialiased overflow-x-hidden"
      style={{ background: "#0A0A0A", color: "#e5e2e1", fontFamily: "sans-serif" }}
    >
      {/* Inline global styles for reveal, spin, scrollbar */}
      <style>{`
        .is-hidden { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1); }
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
        .page-enter { animation: pageFadeIn 0.6s ease both; }
        @keyframes pageFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .spin-slow { animation: spinSlow 12s linear infinite; }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .card-hover { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .btn-lift { transition: transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1); }
        .btn-lift:hover { transform: scale(1.03); }
        .btn-lift:active { transform: scale(0.97); }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "transparent",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          transition: "all 0.3s",
        }}
      >
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <button
            onClick={() => router.push('/shop')}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#8B4513",
              fontSize: "14px",
              letterSpacing: "0.05em",
              borderBottom: "2px solid #8B4513",
              paddingBottom: "2px",
              fontFamily: "inherit",
            }}
          >
            Shop
          </button>
          <button
            onClick={() => router.push('/')}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e5e2e1",
              fontSize: "14px",
              letterSpacing: "0.05em",
              fontFamily: "inherit",
              transition: "color 0.2s",
            }}
          >
            Our Story
          </button>
          <button
            onClick={() => router.push('/shop')}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e5e2e1",
              fontSize: "14px",
              letterSpacing: "0.05em",
              fontFamily: "inherit",
              transition: "color 0.2s",
            }}
          >
            Gifting
          </button>
        </div>
        <button
          onClick={() => router.push('/')}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#e5e2e1",
            fontSize: "22px",
            fontWeight: "bold",
            letterSpacing: "0.15em",
            fontFamily: "inherit",
          }}
        >
          DARK BROWN
        </button>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <button
            onClick={() => router.push('/checkout')}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e5e2e1",
              fontSize: "24px",
              transition: "opacity 0.2s",
              display: "flex",
              alignItems: "center",
            }}
            title="Cart"
          >
            🛒
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e5e2e1",
              fontSize: "24px",
              transition: "opacity 0.2s",
              display: "flex",
              alignItems: "center",
            }}
            title="Account"
          >
            👤
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          alt="Cinematic full-bleed photo of a rich Dark Brown Chocolate Cake"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgPn0LzxnVZ8yW5OIYH2FO-HbXJW_vbRys2jHEZs0GzFEn7CVKI3Qp1HuaIkjeXJZwxpVnD3YxYQhPm0sUMBInyDfc38kfNrCRqIH_9SNLPFI9KyrbKtIyi3m6QM_azQDGt9WOs1Bkcgdb6KWHde8sBEV6r7voB4BMoSepzRXBm2P3rlCE68OCiGgc5dHUpskfaJRAaIlLAreSm6yIZ4hm4Go1HiA4pOJQjMhS4RXxjxiE56Ctrb8dM4XHHI8QuVHU9-dnXHe58sM"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, #0A0A0A 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: "bold",
              color: "#e5e2e1",
              marginBottom: "16px",
              textShadow: "0 4px 32px rgba(0,0,0,0.8)",
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
          >
            Dark Brown Chocolate
          </h1>
          <p
            style={{
              fontSize: "clamp(13px, 1.5vw, 16px)",
              color: "rgba(229,226,225,0.7)",
              maxWidth: "640px",
              marginBottom: "32px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Unapologetically Rich. Artfully Crafted.
          </p>
          <button
            className="btn-lift"
            onClick={() => router.push('/shop')}
            style={{
              background: "#FF6B35",
              color: "black",
              fontSize: "13px",
              fontWeight: "bold",
              padding: "0 32px",
              height: "56px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(255,107,53,0.3)",
              transition: "all 0.15s ease",
              fontFamily: "inherit",
            }}
          >
            Shop Now
          </button>
        </div>
        {/* Spinning badge */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "48px",
            zIndex: 20,
          }}
        >
          <div
            className={isSpinning ? "spin-slow" : ""}
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "9999px",
              border: "1px solid #8B4513",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                color: "#8B4513",
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1.4,
                letterSpacing: "0.05em",
                fontWeight: "600",
              }}
            >
              Made<br />in<br />India
            </span>
          </div>
        </div>
      </header>

      {/* CRAFT STORY */}
      <section
        className="reveal"
        style={{
          padding: "96px 32px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "64px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "600px",
              width: "100%",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
            }}
          >
            <img
              alt="Editorial photo of baking hands"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHyZbzkJZ9RZ6cfrpc85kDY4_fdB-4od3GBZQV8McJktUTD8ox86GnGktlgjRGI6DtKAY_UskY-5Dmxvf_zIDo-6CPcXUzjF4yjOKeUHys8oprMsE36UwWRES3ft0afPgkNoQIJ-YNLGMRbwFw_k1EquSXzNAKQM7i0aNT6hxnaN5hTWMIeD1zHbi-qsCQwcMtP0nhA2tZVft1_GVLRTK-CBmfTRBwdsPTI1tYmiMK60uAw6OmwpIPpVBmqX_Skzzhvv6nfPflzn8"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.75) contrast(1.25)",
                transition: "filter 0.7s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1) contrast(1.25)")}
              onMouseLeave={e => (e.currentTarget.style.filter = "brightness(0.75) contrast(1.25)")}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: "1px solid rgba(139,69,19,0.2)",
                borderRadius: "8px",
                pointerEvents: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: "bold",
                color: "#8B4513",
                marginBottom: "24px",
                lineHeight: 1.2,
              }}
            >
              The Art of the Craft
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ fontSize: "16px", color: "rgba(229,226,225,0.7)", lineHeight: 1.7 }}>
                We don&apos;t just bake; we architect indulgence. Every layer, every ganache, every crumb is a testament to an uncompromising pursuit of perfection. Sourced from the finest cacao and crafted by master chocolatiers right here in India.
              </p>
              <p style={{ fontSize: "16px", color: "rgba(229,226,225,0.7)", lineHeight: 1.7 }}>
                This is not dessert. This is a sensory experience designed for those who understand that true luxury lives in the details. Dark, moody, and undeniably potent.
              </p>
            </div>
            <button
              className="btn-lift"
              onClick={() => router.push('/')}
              style={{
                marginTop: "32px",
                alignSelf: "flex-start",
                height: "56px",
                padding: "0 32px",
                borderRadius: "9999px",
                border: "2px solid rgba(229,226,225,0.4)",
                background: "none",
                color: "#e5e2e1",
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(229,226,225,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "none";
              }}
            >
              Read Our Story
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section
        className="reveal"
        style={{
          padding: "96px 32px",
          background: "#0c0c0c",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "48px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: "bold",
                color: "#e5e2e1",
                lineHeight: 1.2,
              }}
            >
              Curated Collection
            </h2>
            <button
              onClick={() => router.push('/shop')}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#8B4513",
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontFamily: "inherit",
              }}
            >
              View All
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {products.map((product, i) => (
              <div
                key={product.id}
                className="card-hover"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() =>
                  router.push(
                    '/product?name=' +
                      encodeURIComponent(product.name) +
                      '&price=' +
                      product.price +
                      '&img=' +
                      encodeURIComponent(product.img)
                  )
                }
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4/5",
                    background: "#1A1A1A",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    alt={product.name}
                    src={product.img}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: hoveredCard === i ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.7s ease",
                    }}
                  />
                  {product.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        background: product.badgeColor || "#FF6B35",
                        color: product.badgeTextColor || "black",
                        fontSize: "11px",
                        fontWeight: "bold",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {product.badge}
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "1px solid rgba(139,69,19,0.2)",
                      borderRadius: "8px",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: hoveredCard === i ? "#8B4513" : "#e5e2e1",
                        transition: "color 0.2s ease",
                        marginBottom: "4px",
                      }}
                    >
                      {product.name}
                    </h3>
                    <p style={{ fontSize: "14px", color: "rgba(229,226,225,0.6)" }}>{product.desc}</p>
                  </div>
                  <span style={{ fontSize: "18px", fontWeight: "500", color: "#8B4513", whiteSpace: "nowrap", marginLeft: "12px" }}>
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile View All */}
          <button
            onClick={() => router.push('/shop')}
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "32px",
              width: "100%",
              padding: "12px",
              borderRadius: "9999px",
              border: "1px solid #8B4513",
              background: "none",
              color: "#8B4513",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            View All
          </button>
        </div>
      </section>

      {/* OCCASIONS STRIP */}
      <section
        className="reveal"
        style={{
          padding: "64px 0",
          overflow: "hidden",
          borderTop: "1px solid rgba(139,69,19,0.1)",
          borderBottom: "1px solid rgba(139,69,19,0.1)",
        }}
      >
        <div style={{ padding: "0 32px", marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: "bold",
              color: "#e5e2e1",
              textAlign: "center",
            }}
          >
            Celebrate in Shadows
          </h2>
        </div>
        <div
          className="no-scrollbar"
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "24px",
            padding: "0 32px 32px",
            scrollSnapType: "x mandatory",
          }}
        >
          {occasions.map((occ, i) => (
            <div
              key={i}
              style={{
                minWidth: "300px",
                height: "300px",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                scrollSnapAlign: "center",
                flexShrink: 0,
                cursor: "pointer",
              }}
              onClick={() => router.push('/shop')}
            >
              <img
                alt={occ.label}
                src={occ.img}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.5)",
                  transition: "filter 0.5s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(0.75)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "brightness(0.5)")}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "0 2px 16px rgba(0,0,0,0.7)",
                    letterSpacing: "0.2em",
                    textAlign: "center",
                    whiteSpace: "pre-line",
                  }}
                >
                  {occ.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="reveal"
        style={{
          padding: "96px 32px",
          background: "#101010",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: "bold",
              color: "#e5e2e1",
              textAlign: "center",
              marginBottom: "48px",
            }}
          >
            Whispers in the Dark
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  background: "#1A1A1A",
                  padding: "32px",
                  borderRadius: "8px",
                  border: "1px solid rgba(139,69,19,0.2)",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    fontSize: "64px",
                    color: "#8B4513",
                    opacity: 0.2,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  &#8220;
                </span>
                <div
                  style={{
                    display: "flex",
                    color: "#8B4513",
                    marginBottom: "16px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {[...Array(5)].map((_, si) => (
                    <span key={si} style={{ fontSize: "18px" }}>★</span>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#e5e2e1",
                    fontStyle: "italic",
                    marginBottom: "16px",
                    lineHeight: 1.7,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {t.quote}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(229,226,225,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight: "600",
                  }}
                >
                  {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM ORDER CTA */}
      <section
        className="reveal"
        style={{
          position: "relative",
          padding: "128px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          alt="Abstract swirling chocolate texture"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1zF9jGJF_qEzEZYXz-E0E8AgGjBuc2aU6-baqdxoPOR5FdF-ra-K0Vmys9OakjJwQ0nyyEVsuMTPLyoyEL7vvhs1PxJmZ7D72EnrH4ni06B40iw9gpNKG69X-wYMsjV4IqIuN36KUpLvh0JtuTW485DocQ19U4gcWFr2wZJvFDw16A19j5-VZ7FthjsUFPaHvFiPl-4FIcu8Hm0hPFF3K6OJLPEEzDccd5xFzKwVqc8io3mr12Nk4FX-IVaA1r0CDpTSuo2Ce-cY"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.3,
            filter: "contrast(1.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #0A0A0A 0%, transparent 50%, #0A0A0A 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "760px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 56px)",
              fontWeight: "bold",
              color: "white",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Demand the Extraordinary
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(229,226,225,0.7)",
              marginBottom: "32px",
              lineHeight: 1.7,
            }}
          >
            For bespoke creations, grand celebrations, or architectural cake designs that defy convention. Let us sculpt your vision in chocolate.
          </p>
          <button
            className="btn-lift"
            onClick={() => router.push('/shop')}
            style={{
              background: "#8B4513",
              color: "black",
              fontSize: "13px",
              fontWeight: "bold",
              padding: "0 40px",
              height: "56px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(233,195,73,0.2)",
              transition: "all 0.15s ease",
              fontFamily: "inherit",
            }}
          >
            Commission an Order
          </button>
        </div>
      </section>
    </div>
  );
}