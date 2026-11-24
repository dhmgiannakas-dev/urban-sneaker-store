import { createSlice } from "@reduxjs/toolkit";

function loadCart() {
  try {
    const savedCart = localStorage.getItem("cart");

    const parsed = savedCart ? JSON.parse(savedCart) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const initialState = {
  items: loadCart(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.items.find((item) => {
                return item.id === action.payload.id
            })

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },

        clearCart: (state) => {
            state.items = [];
        },

        increaseQuantity: (state, action) => {
            const product = state.items.find(
                (item) => item.id === action.payload
            );

            if (product) {
                product.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const product = state.items.find(
                (item) => item.id === action.payload
            );

            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        },
    },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;