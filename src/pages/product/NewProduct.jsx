import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllCats } from "../category/categoryAction";
import { postAProduct } from "./productAction";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  parentCatId: "",
  sku: "",
  price: "",
  salesPrice: "",
  salesStartDate: "",
  salesEndDate: "",
  qty: "",
  description: "",
};

const NewProduct = () => {
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);
  const [form, setForm] = useState(initialState);
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    dispatch(getAllCats());
  }, [dispatch]);

  const inputs = [
    {
      label: "Product name",
      name: "name",
      placeholder: "Enter product name",
      type: "text",
      required: true,
      value: form.name,
    },
    {
      label: "SKU",
      name: "sku",
      placeholder: "Enter sku",
      type: "text",
      required: true,
      value: form.sku,
    },
    {
      label: "QTY",
      name: "qty",
      placeholder: "Enter quantity",
      type: "number",
      required: true,
      value: form.qty,
    },
    {
      label: "Price",
      name: "price",
      placeholder: "Enter price",
      type: "number",
      required: true,
      value: form.price,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      placeholder: "Enter sales price",
      type: "number",
      value: form.salesPrice,
    },
    {
      label: "Sales Start Date",
      name: "salesStartDate",
      placeholder: "Enter sales start date",
      type: "date",
      value: form.salesStartDate,
    },
    {
      label: "Sales End Date",
      name: "salesEndDate",
      placeholder: "Enter sales end date",
      type: "date",
      value: form.salesEndDate,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Enter product description",
      type: "test",
      as: "textarea",
      rows: "5",
      required: true,
      value: form.description,
    },
  ];

  const handleOnImageAttach = (e) => {
    const { name, files } = e.target;

    setImgs(files);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // combine data file
    const formDt = new FormData();

    for (let key in form) {
      formDt.append(key, form[key]);
    }

    if (imgs.length > 0) {
      [...imgs].forEach((item) => {
        formDt.append("images", item);
      });
    }

    dispatch(postAProduct(formDt));

    setForm(initialState);
  };

  console.log(imgs);

  return (
    <AdminLayout title="Product">
      <Link to="/product">
        <Button variant="secondary">&lt;&lt; Back</Button>
      </Link>

      <Form className="rounded shadow-lg p-3 mt-3" onSubmit={handleOnSubmit}>
        <h2>Add new product below!</h2>
        <hr />

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="parentCatId"
            onChange={handleOnChange}
            value={form.parentCatId}
            required
          >
            <option value="">-- select one --</option>
            {catList.map((cat) => (
              <option key={cat?._id} value={cat?._id}>
                {cat.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        {/* handling the attachmnets */}
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            name="img"
            multiple
            required
            onChange={handleOnImageAttach}
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Add new product
          </Button>
        </div>
      </Form>
    </AdminLayout>
  );
};

export default NewProduct;
