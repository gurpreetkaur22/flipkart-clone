import { createSlice } from "@reduxjs/toolkit"

interface CartItem {
    id: number,
    title: string,
    price: number,
    qty: number
}

const initialState: CartItem[] = JSON.parse(
    localStorage.getItem('cart') || "[]"
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.find(i => i.id === action.payload.id);
            if(!item) {
                state.push({ ...action.payload, qty: 1});
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            const updated = state.filter(i => i.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(updated));
            return updated
        },
        incrementQty: (state, action) => {
            const item = state.find(i => i.id === action.payload);
            if(item) {
                item.qty += 1;
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        decrementQty: (state, action) => {
            const item = state.find(i => i.id === action.payload);
            if(item && item.qty > 1) {
                item.qty -= 1;
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
    }
})

export const {addToCart, removeFromCart, incrementQty, decrementQty} = cartSlice.actions;
export default cartSlice.reducer;