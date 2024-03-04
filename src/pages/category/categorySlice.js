import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catList: [],
  subCatList: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCatList: (state, { payload = [] }) => {
      state.catList = payload;
    },
    setSubCatList: (state, { payload = [] }) => {
      state.subCatList = payload;
    },
  },
});

const { reducer, actions } = categorySlice;
export const { setCatList, setSubCatList } = actions;
export default reducer;
