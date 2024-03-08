import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  selectedOrder: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, { payload = [] }) => {
      state.orders = payload;
    },
    setSelectedOrder: (state, { payload }) => {
      state.selectedOrder = payload;
    },
  },
});

const { reducer, actions } = orderSlice;
export const { setOrders, setSelectedOrder } = actions;
export default reducer;
