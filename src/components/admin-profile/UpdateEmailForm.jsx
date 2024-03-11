import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../custom-modal/CustomModal";
import { setShowModal } from "../custom-modal/modalSlice";
import { updateAdminEmailAction } from "../../pages/profile/userAction";

export const UpdateEmailForm = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminInfo);
  const [form, setForm] = useState(admin);

  // update email input
  const emailInput = {
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    type: "email",
    value: form.email,
  };

  const passInput = {
    label: "Password",
    name: "password",
    placeholder: "Enter your password",
    type: "password",
    required: true,
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnEmailClick = () => {
    dispatch(setShowModal(true));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm("Yow may be logged out and ask to login again.")) {
      const { _id, email, password, ...rest } = form;

      dispatch(updateAdminEmailAction({ _id, email, password }));
    }
  };

  return (
    <div>
      <div className="rounded shadow-lg p-3 mt-3">
        <h2>Update your email!</h2>
        <hr />

        <CustomModal title="Enter your password to continue!">
          <Form onSubmit={handleOnSubmit}>
            <CustomInput {...passInput} onChange={handleOnChange} />

            <Button variant="warning" type="submit">
              Continue...
            </Button>
          </Form>
        </CustomModal>

        <CustomInput {...emailInput} onChange={handleOnChange} />

        <div className="d-grid">
          <Button variant="warning" onClick={handleOnEmailClick}>
            Update email
          </Button>
        </div>
      </div>
    </div>
  );
};
