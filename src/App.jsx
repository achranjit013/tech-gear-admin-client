import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/sign-in-up/SignUp";
import LogIn from "./pages/sign-in-up/LogIn";
import VerifyEmail from "./pages/sign-in-up/VerifyEmail";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import PaymentOption from "./pages/payment-option/PaymentOption";
import Order from "./pages/order/Order";
import Customer from "./pages/customer/Customer";
import MyProfile from "./pages/profile/MyProfile";
import AdminUser from "./pages/admin-user/AdminUser";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import ResetPassword from "./pages/sign-in-up/ResetPassword";
import { UpdatePasswordForm } from "./components/admin-profile/UpdatePasswordForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCats } from "./pages/category/categoryAction";
import NewProduct from "./pages/product/NewProduct";
import EditProduct from "./pages/product/EditProduct";
import SubCategory from "./pages/category/SubCategory";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCats());
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* public route */}
        <Route path="/" element={<LogIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-update" element={<UpdatePasswordForm />} />

        {/* private route */}
        <Route path="/admin-signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />

        <Route
          path="/sub-category"
          element={
            <PrivateRoute>
              <SubCategory />
            </PrivateRoute>
          }
        />

        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />

        <Route
          path="/payment-option"
          element={
            <PrivateRoute>
              <PaymentOption />
            </PrivateRoute>
          }
        />

        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <PrivateRoute>
              <Customer />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-user"
          element={
            <PrivateRoute>
              <AdminUser />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/product/new"
          element={
            <PrivateRoute>
              <NewProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/product/edit/:_id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={<h1 className="text-center">404 page not found</h1>}
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
