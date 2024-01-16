import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import CustomInput from "../custom-input/CustomInput";
import { updateUserPassword } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";

export const UpdatePasswordForm = () => {
  const [response, setResponse] = useState("");
  const [form, setForm] = useState({});
  const [passwordValidationError, setPasswordValidationError] = useState("");

  // update password inputs
  const inputs = [
    {
      label: "Current password",
      name: "oldPassword",
      placeholder: "Enter current password",
      type: "password",
      required: true,
    },
    {
      label: "New password",
      name: "newPassword",
      placeholder: "Enter new password",
      type: "password",
      required: true,
    },
    {
      label: "Confirm new password",
      name: "confirmPassword",
      placeholder: "Re-enter new password",
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

    // const email = emailRef.current.value;
    console.log(form);
    const { confirmPassword, ...rest } = form;

    console.log(rest);

    if (rest.newPassword !== confirmPassword) {
      return toast.error("Password do not match!");
    }

    // call api & send data
    const pending = updateUserPassword(rest);

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const resp = await pending;
    setResponse(resp);
  };

  return (
    <div>
      {response.message && (
        <Alert variant={response.status === "success" ? "success" : "error"}>
          {response.message}
        </Alert>
      )}

      <Form className="rounded shadow-lg p-3 mt-3" onSubmit={handleOnSubmit}>
        <h2>Update your password!</h2>
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
            Update password
          </Button>
        </div>
      </Form>
    </div>
  );
};
