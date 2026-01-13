import { configureStore} from '@reduxjs/toolkit'
import { persistReducer, persistStore, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from '../slices/cartSlice'
import productReducer from '../slices/productSlice'

const cartTransform = createTransform(
    (inboundState: any) => inboundState,
    (outboundState: any) => {
        if (outboundState && outboundState.cart && Array.isArray(outboundState.cart)) {
            return {
                ...outboundState,
                cart: outboundState.cart.map((item: any) => ({
                    ...item,
                    quantity: item.quantity || 1
                }))
            }
        }
        console.log("testing....",outboundState)
        return outboundState
    }
)

const cartPersistConfig = {
    key: 'cart',
    storage,
    transforms: [cartTransform]
}

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer)

const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
        products: productReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export default store
