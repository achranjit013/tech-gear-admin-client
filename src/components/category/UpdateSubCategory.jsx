import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  getAllCats,
  updateExistingSubCat,
} from "../../pages/category/categoryAction";
import { toast } from "react-toastify";
import { getAllProducts } from "../../pages/product/productAction";

const UpdateSubCategory = ({ categoryId, _id, title, status }) => {
  const titleRef = useRef(null);
  const catRef = useRef(null);
  const statusRef = useRef(null);
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);
  const { productList } = useSelector((state) => state.productInfo);
  const [filteredCatList, setFilteredCatList] = useState([]);

  useEffect(() => {
    dispatch(getAllCats());

    if (
      categoryId &&
      _id &&
      titleRef.current &&
      catRef.current &&
      statusRef.current
    ) {
      // Set initial values of the useRef references
      titleRef.current.value = title;
      catRef.current.value = categoryId;
      statusRef.current.value = status;

      dispatch(getAllProducts("subcategoryId" + _id));
    }

    if (catList.length > 0) {
      setFilteredCatList(catList.filter(({ status }) => status === "active"));
    }
  }, [dispatch, categoryId, _id, title, status, catList.length]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure to update the sub-category?")) {
      const title = titleRef.current.value;
      const categoryId = catRef.current.value;
      const status = statusRef.current.value;
      if (!title) return toast.error("please provide title");
      if (!categoryId) return toast.error("please provide category");
      if (!status) return toast.error("please provide status");

      if (status === "inactive" && productList.length > 0) {
        toast["error"](
          "Sorry, unable to update the subcategory as it has an association with an active product."
        );
        return;
      }

      //dispatch to update in database table and update redux store
      dispatch(updateExistingSubCat({ _id, title, categoryId, status }));
    }
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="g-2">
          <Col md={12}>
            <div>
              <Form.Label className="fw-medium">Subcategory</Form.Label>
              <Form.Control
                ref={titleRef}
                required={true}
                placeholder="Enter new sub category"
              />
            </div>

            <div className="mt-3">
              <Form.Label className="fw-medium">Category</Form.Label>
              <Form.Control as="select" name="categoryId" ref={catRef} required>
                <option value="">-- select relevant category --</option>
                {filteredCatList.map((cat) => (
                  <option key={cat._id} value={cat?._id}>
                    {cat.title}
                  </option>
                ))}
              </Form.Control>
            </div>

            <div className="mt-3">
              <Form.Label className="fw-medium">Status</Form.Label>
              <Form.Control as="select" name="status" ref={statusRef} required>
                <option value="">-- select status --</option>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </Form.Control>
            </div>
          </Col>

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

export default UpdateSubCategory;
