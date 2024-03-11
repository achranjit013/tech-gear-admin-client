import React, { useEffect, useRef, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getAllCats, postNewSubCat } from "./categoryAction";
import SubCategoryTable from "../../components/custom-tables/SubCategoryTable";

const SubCategory = () => {
  const titleRef = useRef("");
  const catRef = useRef("");
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);
  const [filteredCatList, setFilteredCatList] = useState([]);

  useEffect(() => {
    dispatch(getAllCats());

    if (catList.length > 0) {
      setFilteredCatList(catList.filter(({ status }) => status === "active"));
    }
  }, [dispatch, catList.length]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure to add a new sub-category?")) {
      const title = titleRef.current.value;
      const categoryId = catRef.current.value;

      if (!title) return toast.error("please provide title");

      if (!categoryId) return toast.error("please provide category");

      //dispatch to post in database table and update redux store
      const { status } = await dispatch(postNewSubCat({ title, categoryId }));

      if (status === "success") {
        titleRef.current.value = "";
        catRef.current.value = "";
      }
    }
  };

  return (
    <AdminLayout title="Subcategory">
      <div className="mb-5 p-3 border shadow rounded">
        <Form onSubmit={handleOnSubmit}>
          <Row>
            <h4>Add New Subcategory</h4>
            <hr />
          </Row>
          <Row className="g-2">
            <Col md={12}>
              <div>
                <Form.Label className="fw-medium">Subcategory</Form.Label>
                <Form.Control
                  ref={titleRef}
                  required={true}
                  placeholder="Enter new subcategory"
                />
              </div>

              <div className="mt-3">
                <Form.Label className="fw-medium">Category</Form.Label>
                <Form.Select ref={catRef} required>
                  <option value="">-- select relevant category --</option>
                  {filteredCatList.map((cat) => (
                    <option key={cat?._id} value={cat?._id}>
                      {cat.title}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Col>

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

      <SubCategoryTable />
    </AdminLayout>
  );
};

export default SubCategory;
