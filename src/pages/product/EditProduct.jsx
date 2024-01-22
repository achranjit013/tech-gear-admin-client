import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllCats } from "../category/categoryAction";
import { getAProduct, postAProduct, updateAProduct } from "./productAction";
import { Link, useParams } from "react-router-dom";

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

const EditProduct = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { catList } = useSelector((state) => state.catInfo);
  const { selectedProduct } = useSelector((state) => state.productInfo);
  const [form, setForm] = useState(initialState);
  const [imgs, setImgs] = useState([]);
  const [imgToDelete, setImgDelete] = useState([]);

  useEffect(() => {
    dispatch(getAllCats());
    if (_id !== form._id) {
      _id && dispatch(getAProduct(_id));
      setForm(selectedProduct);
    }
  }, [dispatch, _id, selectedProduct]);

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

    const { __v, sku, slug, createdAt, updatedAt, ...rest } = form;

    // combine data file
    const formDt = new FormData();

    for (let key in rest) {
      formDt.append(key, rest[key]);
    }

    if (imgs.length > 0) {
      [...imgs].forEach((item) => {
        formDt.append("newImages", item);
      });
    }

    imgToDelete.length && formDt("imgToDelete", imgToDelete);

    dispatch(updateAProduct(_id, formDt));

    // setForm(initialState);
  };

  const handleOnDeleteImg = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setImgDelete([...imgToDelete, value]);
    } else {
      setImgDelete(imgToDelete.filter((item) => item != value));
    }
  };

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
      label: "Slug",
      name: "slug",
      type: "text",
      required: true,
      disabled: true,
      value: form.slug,
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
      value: form.salesStartDate?.slice(0, 10),
    },
    {
      label: "Sales End Date",
      name: "salesEndDate",
      placeholder: "Enter sales end date",
      type: "date",
      value: form.salesEndDate?.slice(0, 10),
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

        {/* display the existing images / attachments */}
        <div className="d-flex justify-content-between gap-5 flex-wrap mb-3">
          {form.images?.map((url) => (
            <div key={url}>
              <div>
                <input
                  type="radio"
                  name="thumbnail"
                  id={url}
                  checked={url === form.thumbnail}
                  onChange={handleOnChange}
                  value={url}
                />{" "}
                <label htmlFor={url}>Use as thumbnail</label>
              </div>
              <img src={import.meta.env.VITE_SERVER_ROOT + url} width={100} />

              <div className="">
                <input
                  type="checkbox"
                  id={url + 1}
                  onChange={handleOnDeleteImg}
                  value={url}
                />
                <label htmlFor={url + 1}>Delete</label>
              </div>
            </div>
          ))}
        </div>

        {/* handling the attachmnets */}
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            name="img"
            multiple
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

export default EditProduct;
