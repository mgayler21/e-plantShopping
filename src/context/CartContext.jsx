import React, { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const initialState = {
  // items: { [id]: { plant, qty } }
  items: {},
};

function cartReducer(state, action) {
  const items = { ...state.items };

  switch (action.type) {
    case "ADD": {
      const plant = action.payload;
      const existing = items[plant.id];
      items[plant.id] = { plant, qty: existing ? existing.qty + 1 : 1 };
      return { ...state, items };
    }

    case "INCREASE": {
      const id = action.payload;
      if (!items[id]) return state;
      items[id] = { ...items[id], qty: items[id].qty + 1 };
      return { ...state, items };
    }

    case "DECREASE": {
      const id = action.payload;
      if (!items[id]) return state;
      const nextQty = items[id].qty - 1;
      if (nextQty <= 0) delete items[id];
      else items[id] = { ...items[id], qty: nextQty };
      return { ...state, items };
    }

    case "DELETE": {
      const id = action.payload;
      if (!items[id]) return state;
      delete items[id];
      return { ...state, items };
    }

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const cartList = useMemo(() => Object.values(state.items), [state.items]);

  const totalQty = useMemo(
    () => cartList.reduce((sum, x) => sum + x.qty, 0),
    [cartList]
  );

  const totalCost = useMemo(
    () => cartList.reduce((sum, x) => sum + x.qty * x.plant.price, 0),
    [cartList]
  );

  const value = useMemo(
    () => ({
      cartList,
      totalQty,
      totalCost,
      addToCart: (plant) => dispatch({ type: "ADD", payload: plant }),
      increase: (id) => dispatch({ type: "INCREASE", payload: id }),
      decrease: (id) => dispatch({ type: "DECREASE", payload: id }),
      remove: (id) => dispatch({ type: "DELETE", payload: id }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [cartList, totalQty, totalCost]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}