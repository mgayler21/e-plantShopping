import { Routes, Route, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import "./App.css";
import AboutUs from "./AboutUs";
import Navbar from "./Navbar";
import { useCart } from "./context/CartContext";

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="landing-page">
          <div className="background-image"></div>

          <div className="content">
            <div className="landing_content">
              <h1>Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>

              <button
                className="get-started-button"
                onClick={() => navigate("/products")}
              >
                Get Started
              </button>
            </div>

            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Products() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="product-list-container visible">
          <ProductList onHomeClick={() => navigate("/")} />
        </div>
      </div>
    </>
  );
}

function Cart() {
  const { cartList, totalCost, increase, decrease, remove, clear } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="app-container" style={{ padding: 16, paddingTop: 90 }}>
        <h1>Shopping Cart</h1>

        {cartList.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
            <button className="product-button" onClick={() => navigate("/products")}>
              Continue Shopping
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
              {cartList.map(({ plant, qty }) => {
                const unit = plant.price;
                const lineTotal = unit * qty;

                return (
                  <div
                    key={plant.id}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: 12,
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: 12,
                      background: "white",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 10,
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0 }}>{plant.name}</h3>
                      <p style={{ margin: "6px 0" }}>
                        Unit: <strong>${unit.toFixed(2)}</strong>
                      </p>
                      <p style={{ margin: "6px 0" }}>
                        Total: <strong>${lineTotal.toFixed(2)}</strong>
                      </p>

                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button onClick={() => decrease(plant.id)}>-</button>
                        <span>Qty: {qty}</span>
                        <button onClick={() => increase(plant.id)}>+</button>

                        <button
                          onClick={() => remove(plant.id)}
                          style={{ marginLeft: "auto" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 style={{ marginTop: 16 }}>
              Cart Total: ${totalCost.toFixed(2)}
            </h2>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button className="product-button" onClick={() => navigate("/products")}>
                Continue Shopping
              </button>

              <button
                className="product-button"
                onClick={() => {
                  alert("Checkout complete (demo).");
                  clear();
                  navigate("/products");
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}