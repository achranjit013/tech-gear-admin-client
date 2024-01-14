import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/sign-in-up/SignUp";
import LogIn from "./pages/sign-in-up/LogIn";
import VerifyEmail from "./pages/sign-in-up/VerifyEmail";

function App() {
  return (
    <>
      <Routes>
        {/* public route */}
        <Route path="/" element={<LogIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* private route */}
        <Route path="/admin-signup" element={<SignUp />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
