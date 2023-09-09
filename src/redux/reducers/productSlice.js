// reducers/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Define an initial state
const initialState = {
  products: [],
  status: "idle",
  error: null,
};

// Define an asynchronous action using createAsyncThunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await fetch("/products.json"); // Adjust the API endpoint
      const data = await response.json();

      return data.products;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, price, quantity, status } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );

      const getStatus = () => {
        if (
          price !== existingProduct.price &&
          quantity !== existingProduct.quantity
        ) {
          return "Price and Quantity Updated";
        } else if (price !== existingProduct.price) {
          return "Price Updated";
        } else if (quantity !== existingProduct.quantity) {
          return "Quantity Updated";
        } else {
          return status;
        }
      };

      if (existingProduct) {
        existingProduct.status = getStatus();
        existingProduct.price = price;
        existingProduct.quantity = quantity;
        existingProduct.total = price * quantity;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("action", action);
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
