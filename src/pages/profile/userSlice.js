import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
  customers: [],
  adminList: [],
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
    setAdminList: (state, { payload = [] }) => {
      state.adminList = payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setAdmin, setCustomers, setAdminList } = actions;
export default reducer;
