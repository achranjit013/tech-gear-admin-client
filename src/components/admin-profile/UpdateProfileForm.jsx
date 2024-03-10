import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../custom-modal/CustomModal";
import { setShowModal } from "../custom-modal/modalSlice";
import { updateAdminProfileAction } from "../../pages/profile/userAction";

export const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminInfo);
  const [form, setForm] = useState(admin);

  // update profile inputs
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
  ];

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

  const handleOnProfileClick = () => {
    dispatch(setShowModal(true));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const {
      _id,
      __v,
      updatedAt,
      email,
      status,
      role,
      refreshJWT,
      createdAt,
      ...rest
    } = form;

    dispatch(updateAdminProfileAction(rest));
  };

  return (
    <div>
      <div className="rounded shadow-lg p-3 mt-3">
        <h2>Update your profile!</h2>
        <hr />

        <CustomModal title="Enter your password to continue!">
          <Form onSubmit={handleOnSubmit}>
            <CustomInput {...passInput} onChange={handleOnChange} />

            <Button variant="warning" type="submit">
              Continue...
            </Button>
          </Form>
        </CustomModal>

        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button variant="warning" onClick={handleOnProfileClick}>
            Update profile
          </Button>
        </div>
      </div>
    </div>
  );
};
