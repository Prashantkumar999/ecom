import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface cartItem {
    id: number,
    title: string,
    price: number
}
interface cartState {
    cart: cartItem[]
}
const initialState: cartState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<cartItem>) => {
            state.cart.push(action.payload)
        }
    }

})

export const { } = cartSlice.actions;
export default cartSlice.reducer;
