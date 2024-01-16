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

      //
      dispatch(postNewCat({ title }));
    }
  };
  return (
    <AdminLayout title="Category">
      <div>
        <Form onSubmit={handleOnSubmit}>
          <Row className="m-4 g-2">
            <Col md={8}>
              <Form.Control
                ref={titleRef}
                required={true}
                placeholder="enter new category"
              />
            </Col>
            <Col md={4}>
              <Button type="submit">Add new category</Button>
            </Col>
          </Row>
        </Form>
      </div>
      To Do... <br />
      <CategoryTable />
    </AdminLayout>
  );
};

export default Category;
