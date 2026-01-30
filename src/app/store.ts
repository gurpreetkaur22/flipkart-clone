import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        products: productReducer,
        wishlist : wishlistReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch