import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../actions/actions";
import {
  HapticsType,
  triggerHaptics,
} from "../../components/Common/Haptics/Haptics";
import { Product } from "../StoreType";

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    data: null,
    isLoading: false,
    hasError: false,
    cart: [],
    total: 0,
    wishlisted: [],
  },
  reducers: {
    addToWislist(state, action: PayloadAction<Product>) {
      const wishlistedItems = [...state.wishlisted];
      wishlistedItems.push(action.payload);
      state.wishlisted = wishlistedItems;
      triggerHaptics();
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      const wishlistedItems = [...state.wishlisted];
      const index = wishlistedItems.findIndex(
        (item) => item.id === action.payload
      );
      wishlistedItems.splice(index, 1);
      state.wishlisted = wishlistedItems;
      triggerHaptics("warning" as HapticsType);
    },
    addToCart(state, action: PayloadAction<Product>) {
      const cartItems = [...state.cart];
      cartItems.push(action.payload);
      state.cart = cartItems;
      triggerHaptics();
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const cartItems = [...state.cart];
      const index = cartItems.findIndex((item) => item.id === action.payload);
      cartItems.splice(index, 1);
      state.cart = cartItems;
      triggerHaptics("warning" as HapticsType);
    },
    incrementQty(state, action: PayloadAction<number>) {
      const cartItems = [...state.cart];
      const index = cartItems.findIndex((item) => item.id === action.payload);
      cartItems[index].qty += 1;
      state.cart = cartItems;
    },
    decrementQty(state, action: PayloadAction<number>) {
      const cartItems = [...state.cart];
      const index = cartItems.findIndex((item) => item.id === action.payload);
      cartItems[index].qty -= 1;
      if (cartItems[index].qty === 0) {
        cartItems.splice(index, 1);
        state.cart = cartItems;
        triggerHaptics("warning" as HapticsType);
      } else {
        state.cart = cartItems;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      let products = [];
      if (action.payload.length > 0) {
        action.payload.forEach((item) => {
          let product = { ...item, qty: 1 };
          products.push(product);
        });
      }
      state.data = products;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.hasError = true;
      state.isLoading = false;
    });
  },
});

export const {
  addToWislist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
} = ProductSlice.actions;
export default ProductSlice.reducer;
