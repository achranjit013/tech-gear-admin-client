import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form, Table } from "react-bootstrap";
import CustomInput from "../../components/custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllCats } from "../category/categoryAction";
import { postAProduct } from "./productAction";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  parentCatId: "",
  sku: "",
  basePrice: "",
  description: "",
};

// Initial empty row data
const initialRowState = {
  size: "",
  qty: "",
  price: "",
  salesPrice: "",
  salesStartDate: "",
  salesEndDate: "",
};

const NewProduct = () => {
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);
  const [form, setForm] = useState(initialState);
  const [imgs, setImgs] = useState([]);
  const [rows, setRows] = useState([initialRowState]);

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
      label: "Base Price",
      name: "basePrice",
      placeholder: "Enter price",
      type: "number",
      required: true,
      value: form.basePrice,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Enter product description",
      type: "text",
      as: "textarea",
      rows: "5",
      required: true,
      value: form.description,
    },
  ];

  const tableInputs = [
    {
      name: "size",
      type: "text",
      required: true,
      value: rows.size,
    },
    {
      name: "qty",
      type: "number",
      required: true,
      value: rows.qty,
    },
    {
      name: "price",
      type: "number",
      value: rows.price,
    },
    {
      name: "salesPrice",
      type: "number",
      value: rows.salesPrice,
    },
    {
      name: "salesStartDate",
      type: "date",
      value: rows.salesStartDate,
    },
    {
      name: "salesEndDate",
      type: "date",
      value: rows.salesEndDate,
    },
  ];

  // for form input fields
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // for table row input fields
  const handleRowChange = (event, index, field) => {
    setRows(
      rows.map((row, i) =>
        i === index ? { ...row, [field]: event.target.value } : row
      )
    );
  };

  // for adding new row in the table
  const handleRowAdd = () => {
    const currentRow = rows[rows.length - 1];

    // if (!currentRow.price) currentRow.price = form.basePrice;

    // currentRow.price = currentRow.price ? currentRow.price : form.basePrice;

    if (currentRow.size !== "" && currentRow.qty !== "") {
      setRows([...rows, initialRowState]);
    } else {
      alert("Please fill in the current row before adding a new row.");
    }
  };

  // for table row
  const handleRowDelete = (index) => {
    if (rows.length <= 1) {
      return alert("At least one variant is required.");
    }

    setRows(rows.filter((row, i) => i !== index));
  };

  // for image
  const handleOnImageAttach = (e) => {
    const { name, files } = e.target;

    setImgs(files);
  };

  // form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // combine data file
    const formDt = new FormData();

    // append form to FormData
    for (let key in form) {
      formDt.append(key, form[key]);
    }

    // append images to FormData
    if (imgs.length > 0) {
      [...imgs].forEach((item) => {
        formDt.append("images", item);
      });
    }

    // append variants to FormData
    if (rows.length > 0) {
      rows.forEach((item, index) => {
        if (!item.price) item.price = form.basePrice;
        formDt.append(`variants[]`, JSON.stringify(item)); // Note the [] for multiple values
      });
    }

    dispatch(postAProduct(formDt));

    // setForm(initialState);
  };

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

        {/* add variants table */}
        <Form.Label>Variants</Form.Label>
        <Table striped bordered hover className="">
          <thead>
            <tr>
              <th>Size</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Sales Price</th>
              <th>Sales Price Start Date</th>
              <th>Sales Price End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="">
                {tableInputs.map((item, i) => (
                  <td key={i}>
                    <CustomInput
                      {...item}
                      onChange={() => handleRowChange(event, index, item.name)}
                    />
                  </td>
                ))}

                <td>
                  <Form.Group className="mt-3">
                    <Button
                      className=""
                      variant="danger"
                      onClick={() => handleRowDelete(index)}
                    >
                      Delete
                    </Button>
                  </Form.Group>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <Button variant="secondary" onClick={handleRowAdd}>
                  Add new row
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
        {/* table end */}

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
