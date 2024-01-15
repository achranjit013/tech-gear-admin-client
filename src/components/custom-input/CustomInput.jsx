import React from "react";
import { Form } from "react-bootstrap";

const CustomInput = ({ label, forwardref, ...rest }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} ref={forwardref} />
    </Form.Group>
  );
};

export default CustomInput;
