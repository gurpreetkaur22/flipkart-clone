import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/productApi";

export const getProducts = createAsyncThunk(
    "products/get",
    async () => await fetchProducts()
)

interface ProductState {
    products: any[],
    loading: boolean
}

const initialState: ProductState = {
    products: [],
    loading: false
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload,
            state.loading = false;
        })
    }
})

export default productSlice.reducer;