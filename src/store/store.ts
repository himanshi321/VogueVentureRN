import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from './slice/ProductsSlice';

export const store = configureStore({
    reducer: {
        product: ProductReducer
    }
})