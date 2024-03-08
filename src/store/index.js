import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../pages/profile/userSlice";
import categoryReducer from "../pages/category/categorySlice";
import productReducer from "../pages/product/productSlice";
import modalReducer from "../components/custom-modal/modalSlice";
import orderReducer from "../pages/order/orderSlice";

export default configureStore({
  reducer: {
    adminInfo: adminReducer,
    catInfo: categoryReducer,
    productInfo: productReducer,
    modalInfo: modalReducer,
    orderInfo: orderReducer,
  },
});
