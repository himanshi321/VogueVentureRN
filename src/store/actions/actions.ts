import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("get/products", async () => {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/benirvingplt/products/products"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
});
