import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../pages/profile/userSlice";

export default configureStore({
  reducer: {
    adminInfo: adminReducer,
  },
});
