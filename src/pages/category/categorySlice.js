import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catList: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCatList: (state, { payload = [] }) => {
      state.catList = payload;
    },
  },
});

const { reducer, actions } = categorySlice;
export const { setCatList } = actions;
export default reducer;
