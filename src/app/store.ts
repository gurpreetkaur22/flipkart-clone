import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        products: productReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch