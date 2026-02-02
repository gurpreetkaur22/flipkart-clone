import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: JSON.parse(localStorage.getItem("wishlist") || "[]") as any [],
    },
    reducers: {
        toggleWishlist: (state, action) => {
            const exists = state.items.find(p => p.id === action.payload.id);
            if(exists) {
                state.items = state.items.filter(p => p.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem("wishlist",JSON.stringify(state.items));
        }
    }
})

export const {toggleWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;