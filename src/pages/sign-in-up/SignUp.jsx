import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/custom-input/CustomInput";
import { toast } from "react-toastify";
import { postNewAdmin } from "../../helpers/axiosHelper";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../profile/userAction";

const initialState = {
  fname: "",
  lname: "",
  address: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [passwordValidationError, setPasswordValidationError] = useState("");

  const inputs = [
    {
      label: "First name",
      name: "fname",
      placeholder: "Enter first name",
      type: "text",
      required: true,
      value: form.fname,
    },
    {
      label: "Last name",
      name: "lname",
      placeholder: "Enter last name",
      type: "text",
      required: true,
      value: form.lname,
    },
    {
      label: "Address",
      name: "address",
      placeholder: "Enter home address",
      type: "text",
      required: true,
      value: form.address,
    },
    {
      label: "Phone No",
      name: "phone",
      placeholder: "Enter phone number",
      type: "number",
      value: form.phone,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter email",
      type: "email",
      required: true,
      value: form.email,
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

    // if password match, call api to store admin data
    const adminPromise = postNewAdmin(rest);

    toast.promise(adminPromise, {
      pending: "Please wait...",
    });

    const { status, message } = await adminPromise;

    if (status === "success") {
      setForm(initialState);
    }

    toast[status](message);
  };

  return (
    <AdminLayout title="Create New Admin">
      <Container fluid>
        <Row className="">
          <Col md={true}>
            <Form className="rounded shadow-lg p-3" onSubmit={handleOnSubmit}>
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
    </AdminLayout>
  );
};

export default SignUp;
