import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
  customers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdmin: (state, { payload }) => {
      state.admin = payload;
    },
    setCustomers: (state, { payload = [] }) => {
      state.customers = payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setAdmin, setCustomers } = actions;
export default reducer;
