import { Routes, Route, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import "./App.css";
import AboutUs from "./AboutUs";
import Navbar from "./Navbar";
import CartItem from "./CartItem";

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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  );
}