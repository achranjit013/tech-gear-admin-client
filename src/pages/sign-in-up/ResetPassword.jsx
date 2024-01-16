import React, { useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/custom-input/CustomInput";
import { requestOTP, updatePassword } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";

const initialInputsReset = {
  otp: "",
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const emailRef = useRef("");
  const [showOTPForm, setShowOTPForm] = useState(true);
  const [response, setResponse] = useState("");
  const [form, setForm] = useState(initialInputsReset);
  const [passwordValidationError, setPasswordValidationError] = useState("");

  // request otp inputs
  const inputsOTP = [
    {
      label: "Email",
      name: "email",
      placeholder: "Enter email",
      type: "email",
      required: true,
      forwardref: emailRef,
    },
  ];

  // update password inputs
  const inputsRESET = [
    {
      label: "OTP",
      name: "otp",
      placeholder: "Enter OTP",
      required: true,
      value: form.otp,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter password",
      type: "password",
      required: true,
      value: form.password,
    },
    {
      label: "Confirm password",
      name: "confirmPassword",
      placeholder: "Re-enter password",
      type: "password",
      required: true,
      value: form.confirmPassword,
    },
  ];

  const handleOnOTPRequest = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (!email) {
      return toast.error("Email is required!");
    }

    const pending = requestOTP(email);
    toast.promise(pending, {
      pending: "Please wait...",
    });

    const resp = await pending;
    console.log(resp);
    setResponse(resp);
    setForm({ email });

    resp.status === "success" && setShowOTPForm(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // check if password is valid
    setPasswordValidationError("");
    if (name === "password") {
      const regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

      !regularExpression.test(value) &&
        setPasswordValidationError(
          `Password must be between 6 to 16 characters\n
          Include atleast:\n
          1. one uppercase\n
          2. one lowercase\n
          3. one number\n
          4. one special character
          5. and no spaces`
        );
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnPasswordReset = async (e) => {
    e.preventDefault();

    // const email = emailRef.current.value;
    console.log(form);
    const { confirmPassword, ...rest } = form;

    console.log(rest);

    if (!rest.email || rest.password !== confirmPassword) {
      return toast.error("Password do not match or email is not provided!");
    }

    // call api & send data
    const pending = updatePassword(rest);

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const resp = await pending;
    setResponse(resp);
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center gap-3 vh-100">
        <Col md={true}>
          <p className="rounded shadow-lg p-3 text-center fw-bold">
            Welcome to Tech Gear Admin CMS!
            <br />
            <br />
            Reset your password here!
          </p>
        </Col>
        <Col md={true}>
          {response.message && (
            <Alert
              variant={response.status === "success" ? "success" : "error"}
            >
              {response.message}
            </Alert>
          )}

          {showOTPForm ? (
            <Form
              className="rounded shadow-lg p-3"
              onSubmit={handleOnOTPRequest}
            >
              <h2>Request OTP to reset your password!</h2>
              <hr />

              {inputsOTP.map((item, i) => (
                <CustomInput key={i} {...item} />
              ))}

              {/* <div className="">
                {passwordValidationError && (
                  <div className="text-danger fw-bold p-3">
                    {passwordValidationError}
                  </div>
                )}
              </div> */}

              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  // disabled={passwordValidationError}
                >
                  Request OTP
                </Button>
              </div>
            </Form>
          ) : (
            <Form
              className="rounded shadow-lg p-3 mt-3"
              onSubmit={handleOnPasswordReset}
            >
              <h2>Update your password!</h2>
              <hr />

              {inputsRESET.map((item, i) => (
                <CustomInput key={i} {...item} onChange={handleOnChange} />
              ))}

              <div className="">
                {passwordValidationError && (
                  <div className="text-danger fw-bold p-3">
                    {passwordValidationError}
                  </div>
                )}
              </div>

              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={passwordValidationError}
                >
                  Update password
                </Button>
              </div>
            </Form>
          )}

          <div className="rounded shadow-lg p-3 mt-5 text-end">
            Ready to login? <a href="/">Login Now</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
