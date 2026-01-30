import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cart.find((item) => item._id === product._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        updateQuantity: (state, action) => {
            const { _id, quantity } = action.payload;
            const item = state.cart.find((item) => item._id === _id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload);
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
