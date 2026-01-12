import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface cartItem {
    id: number,
    title: string,
    description: string,
    price: number,
    thumbnail: string,
    quantity: number,
}
interface cartState {
    cart: cartItem[],
}

const initialState: cartState = {
    cart: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Omit<cartItem, 'quantity'>>) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1
            } else {
                state.cart.push({ ...action.payload, quantity: 1 })
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cart.find(item => item.id === action.payload)
            if (item) {
                item.quantity = (item.quantity || 1) + 1
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cart.find(item => item.id === action.payload)
            if (item) {
                const currentQuantity = item.quantity || 1
                if (currentQuantity > 1) {
                    item.quantity = currentQuantity - 1
                }
            }
        }
    }

})

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
