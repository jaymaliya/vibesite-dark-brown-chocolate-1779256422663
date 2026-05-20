"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    email: "",
    fname: "",
    lname: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payBtnHover, setPayBtnHover] = useState(false);

  const shippingCost = totalPrice > 500 ? 0 : 99;
  const orderTotal = totalPrice + shippingCost;

  // Scroll reveal
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.fname.trim()) newErrors.fname = "First name is required";
    if (!form.lname.trim()) newErrors.lname = "Last name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.pincode.trim()) newErrors.pincode = "PIN code is required";
    else if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "PIN must be 6 digits";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: orderTotal }),
      });
      const order = await res.json();
      const Razorpay = (window as any).Razorpay;
      if (Razorpay) {
        const rzp = new Razorpay({
          key: "rzp_test_",
          amount: order.amount,
          currency: "INR",
          name: "Dark Brown Chocolate",
          description: "Order Payment",
          handler: () => {
            clearCart();
            router.push("/");
          },
        });
        rzp.open();
      } else {
        clearCart();
        router.push("/");
      }
    } catch {
      clearCart();
      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div
        style={{
          background: "#1a0f0a",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <p
          style={{
            color: "#c9a96e",
            fontSize: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          Your cart is empty.
        </p>
        <button
          onClick={() => router.push("/shop")}
          style={{
            background: "#e9c349",
            color: "#1a0f0a",
            border: "none",
            borderRadius: "9999px",
            padding: "0.875rem 2.5rem",
            fontWeight: "700",
            fontSize: "0.875rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.02)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1)")
          }
        >
          Start Shopping
        </button>
      </div>
    );
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(201,169,110,0.3)",
    outline: "none",
    color: "#f5ede0",
    fontSize: "0.9375rem",
    fontFamily: "inherit",
    padding: "0.75rem 0",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const inputError: React.CSSProperties = {
    ...inputBase,
    borderBottom: "1px solid #e57373",
  };

  const labelBase: React.CSSProperties = {
    display: "block",
    color: "rgba(245,237,224,0.5)",
    fontSize: "0.8125rem",
    marginBottom: "0.25rem",
    fontFamily: "inherit",
  };

  const errorMsg: React.CSSProperties = {
    color: "#e57373",
    fontSize: "0.75rem",
    marginTop: "0.25rem",
    fontFamily: "inherit",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0');
        
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          -webkit-font-feature-settings: 'liga';
          font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }

        .is-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .visible { opacity: 1; transform: translateY(0); }
        
        .page-enter { animation: fadeInUp 0.6s ease both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .btn-lift:hover { transform: scale(1.02); box-shadow: 0 0 25px rgba(233,195,73,0.3); }
        .btn-lift:active { transform: scale(0.98); }

        .checkout-input:focus {
          border-bottom-color: #e9c349 !important;
        }
        .checkout-input::placeholder { color: transparent; }

        .field-group { position: relative; padding-top: 1.5rem; }
        .field-label {
          position: absolute;
          left: 0;
          top: 1.75rem;
          color: rgba(245,237,224,0.5);
          font-size: 0.9375rem;
          pointer-events: none;
          transition: all 0.2s ease;
        }
        .checkout-input:focus ~ .field-label,
        .checkout-input:not(:placeholder-shown) ~ .field-label {
          top: 0.25rem;
          font-size: 0.75rem;
          color: #e9c349;
        }
        .checkout-input:not(:focus):not(:placeholder-shown) ~ .field-label {
          color: rgba(245,237,224,0.5);
        }

        select.checkout-input option {
          background: #1a0f0a;
          color: #f5ede0;
        }

        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a0f0a; }
        ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.3); border-radius: 3px; }
      `}</style>

      <div
        className="page-enter"
        style={{
          background: "#1a0f0a",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', sans-serif",
          color: "#f5ede0",
        }}
      >
        {/* Header */}
        <header
          style={{
            width: "100%",
            padding: "1rem 2rem",
            borderBottom: "1px solid rgba(201,169,110,0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(26,15,10,0.8)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <div
            onClick={() => router.push("/")}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "700",
              fontSize: "1.25rem",
              color: "#f5ede0",
              letterSpacing: "0.15em",
              cursor: "pointer",
            }}
          >
            DARK BROWN
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#e9c349",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              lock
            </span>
            <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
              Secure Checkout
            </span>
          </div>
        </header>

        {/* Main */}
        <main
          style={{
            flexGrow: 1,
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "3rem 1.5rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "2.5rem",
            }}
            className="checkout-grid"
          >
            <style>{`
              @media (min-width: 1024px) {
                .checkout-grid { grid-template-columns: 7fr 5fr !important; }
              }
            `}</style>

            {/* Left Column */}
            <div className="reveal">
              <section style={{ marginBottom: "3rem" }}>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.75rem",
                    fontWeight: "700",
                    color: "#f5ede0",
                    marginBottom: "2rem",
                    margin: "0 0 2rem 0",
                  }}
                >
                  Contact &amp; Shipping
                </h1>
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {/* Email */}
                    <div className="field-group">
                      <input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className="checkout-input"
                        style={errors.email ? inputError : inputBase}
                        required
                      />
                      <label htmlFor="email" className="field-label">
                        Email Address
                      </label>
                      {errors.email && (
                        <p style={errorMsg}>{errors.email}</p>
                      )}
                    </div>

                    {/* Name Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1.5rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <div className="field-group">
                        <input
                          id="fname"
                          type="text"
                          placeholder="First Name"
                          value={form.fname}
                          onChange={handleChange}
                          className="checkout-input"
                          style={errors.fname ? inputError : inputBase}
                          required
                        />
                        <label htmlFor="fname" className="field-label">
                          First Name
                        </label>
                        {errors.fname && (
                          <p style={errorMsg}>{errors.fname}</p>
                        )}
                      </div>
                      <div className="field-group">
                        <input
                          id="lname"
                          type="text"
                          placeholder="Last Name"
                          value={form.lname}
                          onChange={handleChange}
                          className="checkout-input"
                          style={errors.lname ? inputError : inputBase}
                          required
                        />
                        <label htmlFor="lname" className="field-label">
                          Last Name
                        </label>
                        {errors.lname && (
                          <p style={errorMsg}>{errors.lname}</p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="field-group" style={{ marginTop: "0.5rem" }}>
                      <input
                        id="address"
                        type="text"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        className="checkout-input"
                        style={errors.address ? inputError : inputBase}
                        required
                      />
                      <label htmlFor="address" className="field-label">
                        Address
                      </label>
                      {errors.address && (
                        <p style={errorMsg}>{errors.address}</p>
                      )}
                    </div>

                    {/* Apartment */}
                    <div className="field-group" style={{ marginTop: "0.5rem" }}>
                      <input
                        id="apartment"
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        value={form.apartment}
                        onChange={handleChange}
                        className="checkout-input"
                        style={inputBase}
                      />
                      <label htmlFor="apartment" className="field-label">
                        Apartment, suite, etc. (optional)
                      </label>
                    </div>

                    {/* City / State / PIN */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "1.5rem",
                        marginTop: "0.5rem",
                      }}
                      className="location-grid"
                    >
                      <style>{`
                        @media (max-width: 640px) {
                          .location-grid { grid-template-columns: 1fr 1fr !important; }
                          .pin-field { grid-column: span 2; }
                        }
                      `}</style>
                      <div className="field-group">
                        <input
                          id="city"
                          type="text"
                          placeholder="City"
                          value={form.city}
                          onChange={handleChange}
                          className="checkout-input"
                          style={errors.city ? inputError : inputBase}
                          required
                        />
                        <label htmlFor="city" className="field-label">
                          City
                        </label>
                        {errors.city && (
                          <p style={errorMsg}>{errors.city}</p>
                        )}
                      </div>
                      <div
                        className="field-group"
                        style={{ position: "relative", paddingTop: "1.5rem" }}
                      >
                        <select
                          id="state"
                          value={form.state}
                          onChange={handleChange}
                          className="checkout-input"
                          style={{
                            ...inputBase,
                            appearance: "none",
                            cursor: "pointer",
                            borderBottom: errors.state
                              ? "1px solid #e57373"
                              : "1px solid rgba(201,169,110,0.3)",
                          }}
                        >
                          <option value="" disabled style={{ background: "#1a0f0a", color: "rgba(245,237,224,0.5)" }}>
                            State
                          </option>
                          <option value="MH" style={{ background: "#1a0f0a" }}>
                            Maharashtra
                          </option>
                          <option value="DL" style={{ background: "#1a0f0a" }}>
                            Delhi
                          </option>
                          <option value="KA" style={{ background: "#1a0f0a" }}>
                            Karnataka
                          </option>
                        </select>
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: "1.75rem",
                            pointerEvents: "none",
                            color: "rgba(245,237,224,0.5)",
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                            expand_more
                          </span>
                        </div>
                        {errors.state && (
                          <p style={errorMsg}>{errors.state}</p>
                        )}
                      </div>
                      <div className="field-group pin-field">
                        <input
                          id="pincode"
                          type="text"
                          placeholder="PIN Code"
                          value={form.pincode}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                            setForm((prev) => ({ ...prev, pincode: val }));
                            if (errors.pincode)
                              setErrors((prev) => ({ ...prev, pincode: "" }));
                          }}
                          className="checkout-input"
                          style={errors.pincode ? inputError : inputBase}
                          required
                        />
                        <label htmlFor="pincode" className="field-label">
                          PIN Code
                        </label>
                        {errors.pincode && (
                          <p style={errorMsg}>{errors.pincode}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="field-group" style={{ marginTop: "0.5rem" }}>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setForm((prev) => ({ ...prev, phone: val }));
                          if (errors.phone)
                            setErrors((prev) => ({ ...prev, phone: "" }));
                        }}
                        className="checkout-input"
                        style={errors.phone ? inputError : inputBase}
                        required
                      />
                      <label htmlFor="phone" className="field-label">
                        Phone Number
                      </label>
                      {errors.phone && (
                        <p style={errorMsg}>{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </form>
              </section>
            </div>

            {/* Right Column */}
            <div style={{ position: "relative" }}>
              <div
                className="reveal"
                style={{
                  position: "sticky",
                  top: "6rem",
                  background: "rgba(40,22,14,0.3)",
                  border: "1px solid rgba(201,169,110,0.3)",
                  borderRadius: "0.75rem",
                  padding: "2rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#f5ede0",
                    marginBottom: "1.5rem",
                    margin: "0 0 1.5rem 0",
                  }}
                >
                  Order Summary
                </h2>

                {/* Items */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                    marginBottom: "1.5rem",
                    paddingBottom: "1.5rem",
                    borderBottom: "1px solid rgba(201,169,110,0.3)",
                  }}
                >
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            width: "80px",
                            height: "96px",
                            flexShrink: 0,
                            position: "relative",
                            overflow: "hidden",
                            background: "rgba(40,22,14,0.5)",
                          }}
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.6s ease",
                              }}
                              onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLImageElement).style.transform =
                                  "scale(1.05)")
                              }
                              onMouseLeave={(e) =>
                                ((e.currentTarget as HTMLImageElement).style.transform =
                                  "scale(1)")
                              }
                            />
                          )}
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-8px",
                              background: "#f5ede0",
                              color: "#1a0f0a",
                              width: "24px",
                              height: "24px",
                              borderRadius: "9999px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {item.quantity}
                          </span>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                          <h3
                            style={{
                              fontSize: "0.9375rem",
                              fontWeight: "500",
                              color: "#f5ede0",
                              margin: "0 0 0.25rem 0",
                            }}
                          >
                            {item.name}
                          </h3>
                          {item.color && (
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "rgba(245,237,224,0.5)",
                                margin: 0,
                              }}
                            >
                              {item.color}
                            </p>
                          )}
                        </div>
                        <div
                          style={{
                            fontWeight: "600",
                            color: "#f5ede0",
                            whiteSpace: "nowrap",
                            fontSize: "0.9375rem",
                          }}
                        >
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      {/* Fallback display items from Stitch design */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            width: "80px",
                            height: "96px",
                            flexShrink: 0,
                            position: "relative",
                            overflow: "hidden",
                            background: "rgba(40,22,14,0.5)",
                          }}
                        >
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUJ3mHYitWE06c-9_sbQuHLqNQo7jMxFg0WSJS1milcS8lyBIXpBzhL4iYY_Rma6zDQEYI2KlWx2W8od_zhjhAIsxt8vy8KuJRhoALL0XIlCVhbvLBiPnXoIo7c4-CZ7N5I1OwC25Lb1_B0HY8ovjN2Px7MifByuZkrurNcIgoMttP933kmmIDcfiUdj1_AR_T7zQQkM-HXiKQVgfa5DZesk4pzgprze_mpyzP5silN-pqf0rHCO2NsjSutdeWrjUYCIlgNhCavgs"
                            alt="Chocolate Bar"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-8px",
                              background: "#f5ede0",
                              color: "#1a0f0a",
                              width: "24px",
                              height: "24px",
                              borderRadius: "9999px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            2
                          </span>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                          <h3
                            style={{
                              fontSize: "0.9375rem",
                              fontWeight: "500",
                              color: "#f5ede0",
                              margin: "0 0 0.25rem 0",
                            }}
                          >
                            Noir 75% Single Origin
                          </h3>
                          <p
                            style={{
                              fontSize: "0.875rem",
                              color: "rgba(245,237,224,0.5)",
                              margin: 0,
                            }}
                          >
                            Kerala Cacao
                          </p>
                        </div>
                        <div
                          style={{
                            fontWeight: "600",
                            color: "#f5ede0",
                            whiteSpace: "nowrap",
                            fontSize: "0.9375rem",
                          }}
                        >
                          ₹1,800
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            width: "80px",
                            height: "96px",
                            flexShrink: 0,
                            position: "relative",
                            overflow: "hidden",
                            background: "rgba(40,22,14,0.5)",
                          }}
                        >
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxxoyEiFBFQTPiQB_KFT_N75-OlqILgui0eA4fhwj9UYTgFsMTDybcrqbJC_jSG9fUvgoqpyespxMPYxH2LhGCmupb7pUOqZOfUTZu4NBUb3GEjfaPo4DgBtuJ4iaxXODM8XrmsLp8m8JkWG7cXSWc5t83bxioKQ9rI-Kjh0rv_XQ-cFYbeJ3Bp56yJpZl1g1epSaARGNkwICGMzEV5TE-GC_qdwxzRF04h8AelgWKFC917Ssiqs7GNbH5qzLgZYx5TTuEOmK6b8w"
                            alt="Truffles"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-8px",
                              background: "#f5ede0",
                              color: "#1a0f0a",
                              width: "24px",
                              height: "24px",
                              borderRadius: "9999px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            1
                          </span>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                          <h3
                            style={{
                              fontSize: "0.9375rem",
                              fontWeight: "500",
                              color: "#f5ede0",
                              margin: "0 0 0.25rem 0",
                            }}
                          >
                            Midnight Truffles
                          </h3>
                          <p
                            style={{
                              fontSize: "0.875rem",
                              color: "rgba(245,237,224,0.5)",
                              margin: 0,
                            }}
                          >
                            Box of 12
                          </p>
                        </div>
                        <div
                          style={{
                            fontWeight: "600",
                            color: "#f5ede0",
                            whiteSpace: "nowrap",
                            fontSize: "0.9375rem",
                          }}
                        >
                          ₹2,400
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Totals */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    fontSize: "0.9375rem",
                    color: "rgba(245,237,224,0.6)",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Subtotal</span>
                    <span style={{ color: "#f5ede0" }}>
                      {items.length > 0
                        ? `₹${totalPrice.toLocaleString("en-IN")}`
                        : "₹4,200"}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Shipping</span>
                    <span style={{ color: "#f5ede0" }}>
                      {items.length > 0
                        ? shippingCost === 0
                          ? "Complimentary"
                          : `₹${shippingCost}`
                        : "Complimentary"}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: "1.5rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid rgba(201,169,110,0.3)",
                  }}
                >
                  <span style={{ fontSize: "1rem", color: "#f5ede0" }}>Total</span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#e9c349",
                    }}
                  >
                    {items.length > 0
                      ? `₹${orderTotal.toLocaleString("en-IN")}`
                      : "₹4,200"}
                  </span>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-lift"
                  onMouseEnter={() => setPayBtnHover(true)}
                  onMouseLeave={() => setPayBtnHover(false)}
                  style={{
                    width: "100%",
                    height: "56px",
                    background: "#e9c349",
                    color: "#1a0f0a",
                    border: "none",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow: payBtnHover
                      ? "0 0 25px rgba(233,195,73,0.3)"
                      : "0 0 15px rgba(233,195,73,0.1)",
                    opacity: isSubmitting ? 0.7 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  {isSubmitting ? "Processing..." : "Pay via Razorpay"}
                  {!isSubmitting && (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "20px",
                        transform: payBtnHover ? "translateX(4px)" : "translateX(0)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      arrow_forward
                    </span>
                  )}
                </button>

                {/* Trust Badges */}
                <div
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(201,169,110,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "rgba(245,237,224,0.6)",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "22px", color: "rgba(233,195,73,0.7)" }}
                    >
                      shield
                    </span>
                    <span style={{ fontSize: "0.875rem" }}>
                      SSL Encrypted Checkout
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "rgba(245,237,224,0.6)",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "22px", color: "rgba(233,195,73,0.7)" }}
                    >
                      verified
                    </span>
                    <span style={{ fontSize: "0.875rem" }}>
                      Temperature Controlled Shipping
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "rgba(245,237,224,0.6)",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "9999px",
                        border: "1px solid #e9c349",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#e9c349",
                          fontWeight: "700",
                        }}
                      >
                        IN
                      </span>
                    </div>
                    <span style={{ fontSize: "0.875rem" }}>
                      Proudly Made in India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            width: "100%",
            padding: "1.5rem 2rem",
            borderTop: "1px solid rgba(201,169,110,0.2)",
            display: "flex",
            justifyContent: "center",
            color: "rgba(245,237,224,0.5)",
            fontSize: "0.875rem",
            fontFamily: "inherit",
            marginTop: "auto",
          }}
        >
          © 2024 Dark Brown Chocolate. Secure Checkout.
        </footer>
      </div>
    </>
  );
}