import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [] as any [],
    },
    reducers: {
        toggleWishlist: (state, action) => {
            const exists = state.items.find(p => p.id === action.payload.id);
            if(exists) {
                state.items = state.items.filter(p => p.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
        }
    }
})

export const {toggleWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;