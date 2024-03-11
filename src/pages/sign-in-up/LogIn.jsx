import React, { useEffect, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/custom-input/CustomInput";
import { postLoginUser } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin, getUserProfile } from "../profile/userAction";
import { useLocation, useNavigate } from "react-router-dom";

const LogIn = () => {
  const emailRef = useRef("");
  const passRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromLocation =
    location?.state?.from?.location?.pathname || "/dashboard";

  const { admin } = useSelector((state) => state.adminInfo);

  useEffect(() => {
    admin?._id && navigate(fromLocation);
    dispatch(autoLogin());
  }, [admin?._id, navigate, dispatch]);

  const inputs = [
    {
      label: "Email",
      name: "email",
      placeholder: "Enter email",
      type: "email",
      required: true,
      forwardref: emailRef,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter password",
      type: "password",
      required: true,
      forwardref: passRef,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (email && password) {
      const pending = postLoginUser({ email, password });

      toast.promise(pending, {
        pending: "Please wait...",
      });

      const { status, message, jwts } = await pending;

      if (jwts?.accessJWT) {
        // store the token
        sessionStorage.setItem("accessJWT", jwts.accessJWT);
        localStorage.setItem("refreshJWT", jwts.refreshJWT);

        // get user data and store in redux
        dispatch(getUserProfile());
        return;
      }

      toast[status](message);
    }
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center gap-3 vh-100">
        <Col md={true}>
          <p className="rounded shadow-lg p-3 text-center fw-bold">
            Welcome to Variété Vortéx Admin CMS!
            <br />
            Empowering you to seamlessly organize, access, and explore a world
            of e-commerce!
          </p>
        </Col>
        <Col md={true}>
          <Form className="rounded shadow-lg p-3" onSubmit={handleOnSubmit}>
            <h2>Login!</h2>
            <hr />

            {inputs.map((item, i) => (
              <CustomInput key={i} {...item} />
            ))}

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>

          <div className="rounded shadow-lg p-3 mt-5 text-end">
            Forget password? <a href="/reset-password">Reset Now</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
