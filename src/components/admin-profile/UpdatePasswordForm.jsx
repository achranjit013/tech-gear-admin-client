import React, { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import CustomInput from "../custom-input/CustomInput";
import { updateUserPassword } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";

export const UpdatePasswordForm = () => {
  const [form, setForm] = useState({});
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // array of password validation error messages
  const validationMessage = [
    "Password must be between 6 to 16 characters and include at least:",
    "1. one uppercase",
    "2. one lowercase",
    "3. one number",
    "4. one special character",
    "5. and no spaces",
  ];

  // update password inputs
  const inputs = [
    {
      label: "Current password",
      name: "oldPassword",
      placeholder: "Enter current password",
      type: "password",
      required: true,
      value: form.oldPassword,
    },
    {
      label: "New password",
      name: "newPassword",
      placeholder: "Enter new password",
      type: "password",
      required: true,
      value: form.newPassword,
    },
    {
      label: "Confirm new password",
      name: "confirmPassword",
      placeholder: "Re-enter new password",
      type: "password",
      required: true,
      value: form.confirmPassword,
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    form.newPassword = name === "newPassword" ? value : form.newPassword;
    form.confirmPassword =
      name === "confirmPassword" ? value : form.confirmPassword;

    // check new password
    if (form.newPassword) {
      const regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      const isPasswordValid = regularExpression.test(form.newPassword);
      setPasswordValidationError(!isPasswordValid);
    } else {
      setPasswordValidationError(false);
    }

    // compare passwords
    if (form.confirmPassword) {
      const isPasswordMatch = form.newPassword === form.confirmPassword;
      setPasswordMatch(isPasswordMatch);
    } else {
      setPasswordMatch(true);
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    if (rest.newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    // call api & send data
    const pending = updateUserPassword(rest);

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const { status, message } = await pending;

    if (status === "success") {
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }

    toast[status](message);
  };

  return (
    <div>
      <Form className="rounded shadow-lg p-3 mt-3" onSubmit={handleOnSubmit}>
        <h2>Update your password!</h2>
        <hr />

        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="">
          {!passwordMatch && (
            <div className="text-danger fw-light p-3">
              <ListGroup>
                <ListGroup.Item variant="danger">
                  Passwords do not match
                </ListGroup.Item>
              </ListGroup>
            </div>
          )}
        </div>

        <div className="">
          {passwordValidationError && (
            <div className="text-danger fw-light p-3">
              <ListGroup>
                {validationMessage.map((line, index) => (
                  <ListGroup.Item variant="danger" key={index}>
                    {line}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </div>

        <div className="d-grid">
          <Button
            variant="warning"
            type="submit"
            disabled={passwordValidationError || !passwordMatch}
          >
            Update password
          </Button>
        </div>
      </Form>
    </div>
  );
};
