import "./App.css";
import { ToastContainer } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/sign-in-up/SignUp";
import LogIn from "./pages/sign-in-up/LogIn";

function App() {
  return (
    <>
      <Routes>
        {/* public route */}
        <Route path="/" element={<LogIn />} />

        {/* private route */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
