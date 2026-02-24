import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalCost,
  increaseQty,
  decreaseQty,
  deleteItem,
  clearCart,
} from "./CartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./CartItem.css";

export default function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const totalCost = useSelector(selectTotalCost);

  const handleContinueShopping = () => navigate("/products");

  return (
    <>
      <Navbar />
      <div style={{ padding: 16, paddingTop: 90 }}>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
            <button className="product-button" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
              {cartItems.map(({ plant, qty }) => {
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

                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <button onClick={() => dispatch(decreaseQty(plant.id))}>
                          -
                        </button>
                        <span>Qty: {qty}</span>
                        <button onClick={() => dispatch(increaseQty(plant.id))}>
                          +
                        </button>

                        <button
                          onClick={() => dispatch(deleteItem(plant.id))}
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
              <button className="product-button" onClick={handleContinueShopping}>
                Continue Shopping
              </button>

              <button
                className="product-button"
                onClick={() => alert("Coming Soon")}
              >
                Checkout
              </button>

              <button
                className="product-button"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}