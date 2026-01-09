import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface cartItem {
    id: number,
    title: string,
    description: string,
    price: number,
    thumbnail: string,
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
        addItem: (state, action: PayloadAction<cartItem>) => {
            state.cart.push(action.payload)
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        }
    }

})

export const { addItem,removeItem } = cartSlice.actions;
export default cartSlice.reducer;
