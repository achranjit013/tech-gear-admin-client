import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../pages/profile/userSlice";
import categoryReducer from "../pages/category/categorySlice";

export default configureStore({
  reducer: {
    adminInfo: adminReducer,
    catInfo: categoryReducer,
  },
});
