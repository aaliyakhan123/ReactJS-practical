import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const res = await axios.post(API, product);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    const res = await axios.put(`${API}/${product.id}`, product);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        p => p.id !== action.payload
      );
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex(
        p => p.id === action.payload.id
      );
      if (index !== -1) state.products[index] = action.payload;
    });
  }
});

export default productSlice.reducer;