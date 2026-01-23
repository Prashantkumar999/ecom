import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstant";

export interface cartItem {
    id: number,
    title: string,
    description: string,
    price: number,
    thumbnail: string,
    quantity: number,
}

interface cartState {
    cart: cartItem[],
    loading: boolean,
    error: string | null,
}

const initialState: cartState = {
    cart: [],
    loading: false,
    error: null,
}

// fetch cart from backend
export const fetchCart = createAsyncThunk<cartItem[]>(
    'cart/fetchCart',
    async () => {
        const res = await axiosInstance.get('/cart?userId=default');
        return res.data.cart || [];
    }
);

// add item to cart
export const addItemToCart = createAsyncThunk<cartItem[], Omit<cartItem, 'quantity'>>(
    'cart/addItemToCart',
    async (item) => {
        const res = await axiosInstance.post('/cart/add', {
            userId: 'default',
            item: item
        });
        return res.data.cart || [];
    }
);

// remove item from cart
export const removeItemFromCart = createAsyncThunk<cartItem[], number>(
    'cart/removeItemFromCart',
    async (itemId) => {
        const res = await axiosInstance.delete(`/cart/remove/${itemId}?userId=default`);
        return res.data.cart || [];
    }
);

// update item quantity
export const updateItemQuantity = createAsyncThunk<cartItem[], { itemId: number, quantity: number }>(
    'cart/updateItemQuantity',
    async ({ itemId, quantity }) => {
        const res = await axiosInstance.put('/cart/update', {
            userId: 'default',
            itemId,
            quantity
        });
        return res.data.cart || [];
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // keep these for local state updates if needed
        setCart: (state, action: PayloadAction<cartItem[]>) => {
            state.cart = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cart';
            })
            // Add item
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add item to cart';
            })
            // Remove item
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to remove item from cart';
            })
            // Update quantity
            .addCase(updateItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(updateItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update item quantity';
            });
    }
})

export const { setCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;
