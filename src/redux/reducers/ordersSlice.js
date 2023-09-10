// reducers/orderSlice.js
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { generateUniqueId } from "../../utils";
// Define an initial state
const initialState = {
  orders: [], // array of orders
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const orderId = generateUniqueId();
      state.orders.push({
        orderId,
        products: action.payload,
      });
    },
    updateList: (state, action) => {
      const { products, orderId } = action.payload;
      const getOrder = state.orders.find((order) => order.orderId === orderId);
      console.log("--test", { products, orderId, getOrder }, current(state));

      getOrder.products = getOrder.products.concat(products);
    },
    updateOrder: (state, action) => {
      const { product, orderId } = action.payload;

      const getOrderById = state.orders.find(
        (order) => order.orderId === orderId
      );
      console.log("--test", { product, orderId }, current(state), getOrderById);

      const existingProduct = getOrderById.products.find(
        (item) => item.id === product.id
      );
      const getStatus = () => {
        if (
          product.price !== existingProduct.price &&
          product.quantity !== existingProduct.quantity
        ) {
          return "Price and Quantity Updated";
        } else if (product.price !== existingProduct.price) {
          return "Price Updated";
        } else if (product.quantity !== existingProduct.quantity) {
          return "Quantity Updated";
        } else {
          return product.status;
        }
      };

      if (existingProduct) {
        existingProduct.status = getStatus();
        existingProduct.price = product.price;
        existingProduct.quantity = product.quantity;
        existingProduct.total = product.price * product.quantity;
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
  },
});

export const { addOrder, updateOrder, deleteOrder, updateList } =
  orderSlice.actions;

export default orderSlice.reducer;
