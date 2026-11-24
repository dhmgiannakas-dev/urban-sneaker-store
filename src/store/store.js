
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Save cart whenever Redux state changes
store.subscribe(() => {
  const state = store.getState();

  try {
    localStorage.setItem(
      "cart",
      JSON.stringify(state.cart.items)
    );
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
});
