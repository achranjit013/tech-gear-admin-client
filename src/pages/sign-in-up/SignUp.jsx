import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/custom-input/CustomInput";

const SignUp = () => {
  const [form, setForm] = useState({});
  const [passwordValidationError, setPasswordValidationError] = useState("");

  const inputs = [
    {
      label: "First name",
      name: "fname",
      placeholder: "Enter first name",
      type: "text",
      required: true,
    },
    {
      label: "Last name",
      name: "lname",
      placeholder: "Enter last name",
      type: "text",
      required: true,
    },
    {
      label: "Address",
      name: "address",
      placeholder: "Enter home address",
      type: "text",
      required: true,
    },
    {
      label: "Phone No",
      name: "phone",
      placeholder: "Enter phone number",
      type: "number",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter email",
      type: "email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter password",
      type: "password",
      required: true,
    },
    {
      label: "Confirm password",
      name: "confirmPassword",
      placeholder: "Re-enter password",
      type: "password",
      required: true,
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // check if password is valid
    setPasswordValidationError("");
    if (name === "password") {
      const regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

      !regularExpression.test(value) &&
        setPasswordValidationError(
          "Password must include atleast one uppercase, one lowercase, one number, one special character and be between 6 to 16 characters long"
        );
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    // check password
    // if password do not match, alert user.
    if (confirmPassword !== rest.password) {
      return alert(
        "Oops! Passwords do not match. Please double-check and try again. Your security is our priority!"
      );
    }
  };

  return (
    <Container fluid className="main-container ">
      <Row className="d-flex justify-content-center align-items-center gap-3 vh-100">
        <Col md={true}>
          <p className="rounded shadow-lg p-3 text-center fw-bold">
            Welcome to Tech Gear Admin CMS!
            <br />
            Empowering you to seamlessly organize, access, and explore a world
            of e-commerce!
          </p>
        </Col>
        <Col md={true}>
          <Form className="rounded shadow-lg p-3" onSubmit={handleOnSubmit}>
            <h2>Create new admin!</h2>
            <hr />

            {inputs.map((item, i) => (
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
                Create new admin
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
