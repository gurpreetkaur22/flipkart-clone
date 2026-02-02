import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchCategories, fetchProductByCategory, fetchProductById, searchProducts } from "../../services/productApi";
import type { AppDispatch } from "../../app/store";

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

export const searchAllProducts = createAsyncThunk(
  "products/search",
  async (query: string) => {
    return await searchProducts(query)
  }
)

export const loadHomeData = createAsyncThunk(
  "products/loadHomeData",
  async (_, { dispatch, getState }) => {

    await dispatch(getCategories()).unwrap();

    const state: any = getState();
    const cats = state.products.categories;

    await Promise.all([
      dispatch(getAllProducts()).unwrap(),
      dispatch(getCategoryCards(cats)).unwrap(),
    ]);

    return true;
  }
);


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
  productsLoading: boolean,
  categoriesLoading: boolean,
  cardsLoading: boolean,
  homeLoading: boolean,
  searchQuery: string
}

const initialState: ProductState = {
  categories: [],
  categoryCards: [],
  products: [],
  productDetail: null,
  selectedCategory: null,
  productsLoading: false,
  categoriesLoading: false,
  cardsLoading: false,
  homeLoading: false,
  searchQuery: ""
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
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      //home
      .addCase(loadHomeData.pending, (state) => {
        state.homeLoading = true;
      })
      .addCase(loadHomeData.fulfilled, (state) => {
        state.homeLoading = false;
      })
      .addCase(loadHomeData.rejected, (state) => {
        state.homeLoading = false;
      })

      // categories
      .addCase(getCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesLoading = false;
      })
      .addCase(getCategories.rejected, (state) => {
        state.categoriesLoading = false;
      })

      //productsByCategory
      .addCase(getProductsByCategory.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.categoriesLoading = false;
      })
      .addCase(getProductsByCategory.rejected, (state) => {
        state.categoriesLoading = false;
      })

      // category cards
      .addCase(getCategoryCards.pending, (state) => {
        state.cardsLoading = true;
      })

      .addCase(getCategoryCards.fulfilled, (state, action) => {
        state.categoryCards = action.payload;
        state.cardsLoading = false;
      })
      .addCase(getCategoryCards.rejected, (state) => {
        state.cardsLoading = false;
      })

      //productById
      .addCase(getProductById.pending, (state) => {
        state.productsLoading = true;
        state.productDetail = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productDetail = action.payload;
        state.productsLoading = false;
      })
      .addCase(getProductById.rejected, (state) => {
        state.productsLoading = false;
      })

      //all products 
      .addCase(getAllProducts.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsLoading = false;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.productsLoading = false;
      })

      //search
      .addCase(searchAllProducts.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(searchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsLoading = false;
      })
      .addCase(searchAllProducts.rejected, (state) => {
        state.productsLoading = false;
      })
  }
})

export const { setCategory, clearProducts, setSearchQuery } = productSlice.actions;
export default productSlice.reducer;