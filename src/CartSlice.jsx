import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // items: { [id]: { plant, qty } }
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // REQUIRED: addItem()
    addItem: (state, action) => {
      const plant = action.payload;
      const existing = state.items[plant.id];
      state.items[plant.id] = {
        plant,
        qty: existing ? existing.qty + 1 : 1,
      };
    },

    // REQUIRED: removeItem()
    removeItem: (state, action) => {
      const id = action.payload;
      delete state.items[id];
    },

    // REQUIRED: updateQuantity()
    // payload: { id, qty }  (qty can be any integer; <=0 removes)
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;

      if (qty <= 0) {
        delete state.items[id];
        return;
      }

      // if item doesn't exist yet, do nothing (or you could add it)
      if (!state.items[id]) return;

      state.items[id].qty = qty;
    },

    // optional helper
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// selectors
export const selectCartItems = (state) => Object.values(state.cart.items);
export const selectTotalQty = (state) =>
  Object.values(state.cart.items).reduce((sum, x) => sum + x.qty, 0);
export const selectTotalCost = (state) =>
  Object.values(state.cart.items).reduce(
    (sum, x) => sum + x.qty * x.plant.price,
    0
  );
export const selectIsInCart = (id) => (state) => Boolean(state.cart.items[id]);