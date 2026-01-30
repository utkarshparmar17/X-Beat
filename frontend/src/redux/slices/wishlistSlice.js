import { createSlice } from '@reduxjs/toolkit';


// Load from local storage
const loadWishlist = () => {
    try {
        const serializedState = localStorage.getItem('wishlist');
        return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
        return [];
    }
};

const initialState = {
    wishlist: loadWishlist(),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const product = action.payload;
            if (!state.wishlist.find((item) => item._id === product._id)) {
                state.wishlist.push(product);
                localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
