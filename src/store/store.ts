import { configureStore} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from '../slices/cartSlice'
import productReducer from '../slices/productSlice'

const cartPersistConfig = {
    key: 'cart',
    storage,
}

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer)

const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
        products: productReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export default store
