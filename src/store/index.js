import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../pages/profile/userSlice";
import categoryReducer from "../pages/category/categorySlice";
import productReducer from "../pages/product/productSlice";
import modalReducer from "../components/custom-modal/modalSlice";

export default configureStore({
  reducer: {
    adminInfo: adminReducer,
    catInfo: categoryReducer,
    productInfo: productReducer,
    modalInfo: modalReducer,
  },
});
