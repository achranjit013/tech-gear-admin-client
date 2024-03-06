import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  getAllSubCats,
  updateExistingCat,
} from "../../pages/category/categoryAction";
import { toast } from "react-toastify";

const UpdateCategory = ({ _id, title, status }) => {
  const dispatch = useDispatch();
  const { subCatList } = useSelector((state) => state.catInfo);
  const titleRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    if (_id) {
      // Set initial values of the useRef references
      titleRef.current.value = title;
      statusRef.current.value = status;

      dispatch(getAllSubCats(_id));
    }
  }, [_id, title, status]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm(`Are you sure to update ${title}?`)) {
      const title = titleRef.current.value;
      const status = statusRef.current.value;
      if (!title) return toast.error("please provide title");
      if (!status) return toast.error("please provide status");

      if (status === "inactive" && subCatList.length > 0) {
        toast["error"](
          "Sorry, unable to update the category as it has an association with an active subcategory."
        );
        return;
      }

      //dispatch to update in database table and update redux store
      dispatch(updateExistingCat({ _id, title, status }));
    }
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="g-2">
          <Col md={6}>
            <Form.Label className="fw-medium">Category</Form.Label>
            <Form.Control
              ref={titleRef}
              required={true}
              placeholder="Enter new category"
            />
          </Col>
          <Col md={6}>
            <Form.Label className="fw-medium">Status</Form.Label>
            <Form.Select ref={statusRef} required>
              <option value="">-- select status --</option>
              <option key="active" value="active">
                active
              </option>
              <option key="inactive" value="inactive">
                inactive
              </option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button
              type="submit"
              className="mt-3 px-5 fw-bold lh-base btn-warning"
              style={{ letterSpacing: "1px" }}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateCategory;
