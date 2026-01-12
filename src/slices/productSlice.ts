import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstant"

export interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
}

interface ProductsState {
  products: Product[]
  allProducts: Product[]
  searchResults: Product[]
  loading: boolean
  filter: string
}

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const res = await axiosInstance.get("/products")
    return res.data.products
  }
)

export const searchProducts = createAsyncThunk<Product[], string>(
  "products/searchProducts",
  async (query) => {
    const res = await axiosInstance.get(
      `/products/search?q=${query}`
    )
    return res.data.products
  }
)

const initialState: ProductsState = {
  products: [],
  allProducts: [],
  searchResults: [],
  loading: false,
  filter: "",
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory(state, action: PayloadAction<string>) {
      state.filter = action.payload
      state.products = state.allProducts.filter(
        item => item.category === action.payload
      )
      state.searchResults = []
    },
    clearFilter(state) {
      state.filter = ""
      state.products = state.allProducts
      state.searchResults = []
    },
    clearSearchResults(state) {
      state.searchResults = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.allProducts = action.payload
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchResults = action.payload
      })
  },
})

export const { filterByCategory, clearFilter, clearSearchResults } = productsSlice.actions
export default productsSlice.reducer
