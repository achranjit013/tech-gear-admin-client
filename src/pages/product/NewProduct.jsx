import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form, Table } from "react-bootstrap";
import CustomInput from "../../components/custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubCats } from "../category/categoryAction";
import { postAProduct } from "./productAction";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";

// initial form state
const initialState = {
  name: "",
  categoryId: "",
  subCategoryId: "",
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
  const { subCatList } = useSelector((state) => state.catInfo);
  const [form, setForm] = useState(initialState);
  const [imgs, setImgs] = useState([]);
  const [rows, setRows] = useState([initialRowState]);
  const [filteredSubCatList, setFilteredSubCatList] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    dispatch(getAllSubCats());

    if (subCatList.length > 0) {
      const activeSubCategories = subCatList.flatMap((obj) =>
        obj.subCategories
          .filter((subCategory) => subCategory.status === "active")
          .map((subCategory) => ({ ...subCategory, categoryId: obj._id }))
      );
      setFilteredSubCatList(activeSubCategories);
    }
  }, [dispatch, subCatList.length]);

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
    },
    {
      name: "qty",
      type: "number",
      required: true,
    },
    {
      name: "price",
      type: "number",
    },
    {
      name: "salesPrice",
      type: "number",
    },
    {
      name: "salesStartDate",
      type: "date",
    },
    {
      name: "salesEndDate",
      type: "date",
    },
  ];

  // for form input fields
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "subCategoryId") {
      form.categoryId = filteredSubCatList.filter(
        (item) => item._id === value
      )[0].categoryId;
    }

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
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setBtnDisabled(true);

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

    const { status } = await dispatch(postAProduct(formDt));

    if (status === "success") {
      // after successfully adding a product, clear the form inputs, variants field and image attachments

      setForm(initialState);

      setRows([initialRowState]);

      // Clear the selected images
      setImgs([]);

      // Reset the file input field
      const fileInput = document.getElementById("imageInput");
      if (fileInput) {
        fileInput.value = null;
      }
    }

    setBtnDisabled(false);
  };

  return (
    <AdminLayout title="Product">
      <Link to="/product">
        <Button variant="secondary" className="px-4">
          <FaBackward className="fs-3" />
        </Button>
      </Link>

      <Form className="rounded shadow-lg p-3 mt-3" onSubmit={handleOnSubmit}>
        <h2>Add new product below</h2>
        <hr />

        <Form.Group className="mb-3">
          <Form.Label>Subcategory</Form.Label>
          <Form.Select
            name="subCategoryId"
            onChange={handleOnChange}
            value={form.subCategoryId}
            required
          >
            <option value="">-- select one --</option>
            {filteredSubCatList.map(({ _id: subCategoryId, title }) => (
              <option key={subCategoryId} value={subCategoryId}>
                {title}
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
            {rows?.map((row, index) => (
              <tr key={index} className="">
                {tableInputs.map((item, i) => (
                  <td key={i}>
                    <CustomInput
                      {...item}
                      value={row[item.name]}
                      onChange={() => handleRowChange(event, index, item.name)}
                    />
                  </td>
                ))}

                <td>
                  <Form.Group className="">
                    <Button
                      className="mt-4 px-2 py-1"
                      variant="danger"
                      onClick={() => handleRowDelete(index)}
                    >
                      <MdOutlineDeleteForever className="fs-4" />
                    </Button>
                  </Form.Group>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>
                <Button
                  variant="secondary"
                  disabled={btnDisabled}
                  onClick={handleRowAdd}
                >
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
            id="imageInput"
            type="file"
            name="img"
            multiple
            required
            onChange={handleOnImageAttach}
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit" disabled={btnDisabled}>
            {btnDisabled ? "Processing..." : "Add new product"}
          </Button>
        </div>
      </Form>
    </AdminLayout>
  );
};

export default NewProduct;
