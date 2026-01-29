import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchCategories, fetchProductByCategory, fetchProductById } from "../../services/productApi";

export const getCategories = createAsyncThunk(
  "products/categories",
  async () => await fetchCategories()
)

export const getProductsByCategory = createAsyncThunk(
  "products/byCategory",
  async (category: string) => await fetchProductByCategory(category)
)


export const getCategoryCards = createAsyncThunk(
  "products/categoryCards",
  async (categories: any[]) => {
    const results = await Promise.all(
      categories.map(async (cat) => {
        const res = await fetchProductByCategory(cat.slug);
        const product = res[0];

        return {
          slug: cat.slug,
          name: cat.name,
          image: product.thumbnail
        };
      })
    );

    return results;
  }
);

export const getProductById = createAsyncThunk(
  "products/byId",
  async (id: string) => await fetchProductById(id)
)

export const getAllProducts = createAsyncThunk(
  "products/all",
  async () => await fetchAllProducts()
)

interface ProductState {
  categories: any[],
  categoryCards: {
    slug: string;
    name: string;
    image: string;
  }[];
  products: any[],
  productDetail: any | null,
  selectedCategory: string | null,
  loading: boolean
}

const initialState: ProductState = {
  categories: [],
  categoryCards: [],
  products: [],
  productDetail: null,
  selectedCategory: null,
  loading: false
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    builder

      // categories
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })

      //productsByCategory
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload,
          state.loading = false;
      })

      // category cards
      .addCase(getCategoryCards.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCategoryCards.fulfilled, (state, action) => {
        state.categoryCards = action.payload;
        state.loading = false;
      })

      //productById
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.productDetail = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productDetail = action.payload;
        state.loading = false;
      })

      //all products 
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
  }
})

export const { setCategory, clearProducts } = productSlice.actions;
export default productSlice.reducer;