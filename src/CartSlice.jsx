import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // items: { [id]: { plant, qty } }
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const plant = action.payload;
      const existing = state.items[plant.id];
      state.items[plant.id] = {
        plant,
        qty: existing ? existing.qty + 1 : 1,
      };
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) return;
      state.items[id].qty += 1;
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) return;
      state.items[id].qty -= 1;
      if (state.items[id].qty <= 0) delete state.items[id];
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      delete state.items[id];
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, deleteItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// Selectors (use these in Navbar/ProductList/Cart)
export const selectCartItems = (state) => Object.values(state.cart.items);
export const selectTotalQty = (state) =>
  Object.values(state.cart.items).reduce((sum, x) => sum + x.qty, 0);
export const selectTotalCost = (state) =>
  Object.values(state.cart.items).reduce(
    (sum, x) => sum + x.qty * x.plant.price,
    0
  );
export const selectIsInCart = (id) => (state) => Boolean(state.cart.items[id]);
