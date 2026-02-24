import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQty } from "./CartSlice";
import "./Navbar.css";

export default function Navbar() {
  const totalQty = useSelector(selectTotalQty);

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    fontWeight: isActive ? 700 : 500,
  });

  return (
    <nav className="pn-navbar">
      <div className="pn-brand">Paradise Nursery</div>

      <div className="pn-links">
        <NavLink to="/" style={linkStyle}>
          Landing
        </NavLink>
        <NavLink to="/products" style={linkStyle}>
          Plants
        </NavLink>

        <NavLink to="/cart" style={linkStyle} className="pn-cart-link">
          Cart 🛒
          {totalQty > 0 && <span className="pn-cart-badge">{totalQty}</span>}
        </NavLink>
      </div>
    </nav>
  );
}