import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../helpers/axiosHelper";
import { setAdmin } from "../../pages/profile/userSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminInfo);

  const handleOnLogout = () => {
    // log out from server by removing the access and refresh JWTs
    logoutUser(admin?._id);

    //clear storages
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");

    // reset store
    dispatch(setAdmin({}));

    // Redirect to the login page
    navigate("/");
  };

  return (
    <div>
      <Navbar expand="md" variant="dark" className="bg-dark">
        <Container>
          <Link to="/" className="navbar-brand">
            E-Store
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {admin?._id ? (
                <>
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <Link to="#!" className="nav-link" onClick={handleOnLogout}>
                    Sign Out
                  </Link>
                </>
              ) : (
                <Link to="/" className="nav-link">
                  Sign In
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
