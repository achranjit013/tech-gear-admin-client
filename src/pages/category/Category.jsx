import React, { useRef } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import CategoryTable from "../../components/custom-tables/CategoryTable";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { postNewCat } from "./categoryAction";

const Category = () => {
  const titleRef = useRef("");
  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm("are you sure to add?")) {
      const title = titleRef.current.value;

      if (!title) {
        return toast.error("please provide title");
      }

      //dispatch to post in database table and update redux store
      dispatch(postNewCat({ title }));
    }
  };

  return (
    <AdminLayout title="Category">
      <div className="mb-5 p-3 border shadow rounded">
        <Form onSubmit={handleOnSubmit}>
          <Row>
            <h4>Add New Category</h4>
            <hr />
          </Row>
          <Row className="">
            <Col md={12}>
              <Form.Label className="fw-medium">Category</Form.Label>
              <Form.Control
                ref={titleRef}
                required={true}
                placeholder="Enter new category"
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Button
                type="submit"
                className="mt-3 px-5 fw-bold lh-base"
                style={{ letterSpacing: "1px" }}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <CategoryTable />
    </AdminLayout>
  );
};

export default Category;
