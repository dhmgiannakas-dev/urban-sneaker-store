import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import { productsApi } from "./api/productsApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
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