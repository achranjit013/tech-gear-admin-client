import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form, Table } from "react-bootstrap";
import CustomInput from "../../components/custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubCats } from "../category/categoryAction";
import { deleteAProduct, getAProduct, updateAProduct } from "./productAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaBackward } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { format, isValid, isDate, parseISO } from "date-fns";

// initial form state
const initialState = {
  status: "",
  name: "",
  categoryId: "",
  subCategoryId: "",
  sku: "",
  basePrice: "",
  description: "",
  thumbnail: "",
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

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const { subCatList } = useSelector((state) => state.catInfo);
  const { selectedProduct } = useSelector((state) => state.productInfo);
  const [form, setForm] = useState(initialState);
  const [imgs, setImgs] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredSubCatList, setFilteredSubCatList] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    // dispatch(getAllCats());
    dispatch(getAllSubCats());

    if (subCatList.length > 0) {
      const activeSubCategories = subCatList.flatMap((obj) =>
        obj.subCategories
          .filter((subCategory) => subCategory.status === "active")
          .map((subCategory) => ({ ...subCategory, categoryId: obj._id }))
      );
      setFilteredSubCatList(activeSubCategories);
    }
    if (_id !== form._id) {
      _id && dispatch(getAProduct(_id));
      setForm(selectedProduct);
      setRows(selectedProduct.variants);
    }
  }, [dispatch, _id, selectedProduct, subCatList.length]);

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

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "thumbnail") {
      setImgToDelete(imgToDelete.filter((item) => item != value));

      document.getElementById(value + 1).checked = false;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnImageAttach = (e) => {
    const { name, files } = e.target;

    setImgs(files);
  };

  const handleOnDeleteImg = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setImgToDelete([...imgToDelete, value]);
    } else {
      setImgToDelete(imgToDelete.filter((item) => item != value));
    }
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

  const handleOnProductDelete = async () => {
    // perform delete
    setBtnDisabled(false);

    const { status } = await dispatch(deleteAProduct(_id));

    if (status === "success") {
      // after delete success, redirect to product page
      navigate("/product");
    }

    setBtnDisabled(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setBtnDisabled(true);

    const { __v, slug, createdAt, updatedAt, variants, ...rest } = form;

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

    imgToDelete.length && formDt.append("imgToDelete", imgToDelete);

    // append variants to FormData
    if (rows.length > 0) {
      rows.forEach((item, index) => {
        if (!item.price) item.price = form.basePrice;

        const { _id, qty, price, salesPrice, ...rest } = item;

        formDt.append(
          `variants[]`,
          JSON.stringify({
            ...rest,
            qty: String(qty),
            price: String(price),
            salesPrice: salesPrice ? String(salesPrice) : null,
          })
        ); // Note the [] for multiple values
      });
    }

    const { status } = await dispatch(updateAProduct(_id, formDt));

    if (status === "success") {
      // after update success, populate the form with updated data

      setForm((prevForm) => ({
        ...prevForm,
        ...formDt,
      }));

      setRows(rows);

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

  // formatting the values of table rows
  const getFormattedValue = (value) => {
    let formattedValue;

    if (typeof value === "string") {
      const date = parseISO(value); // Convert the string to a Date object
      if (isValid(date) && isDate(date)) {
        formattedValue = format(date, "yyyy-MM-dd"); // Format as date
      } else {
        formattedValue = value; // Use the value as it is if it's not a valid date
      }
    } else if (typeof value === "number") {
      formattedValue = value.toString(); // Convert the number to a string
    } else {
      formattedValue = null; // Handle other types of values
    }

    return formattedValue;
  };

  return (
    <AdminLayout title="Update Product">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/product">
          <Button variant="secondary" className="px-4">
            <FaBackward className="fs-3" />
          </Button>
        </Link>

        <Button
          variant="danger"
          className="px-4"
          disabled={btnDisabled}
          onClick={handleOnProductDelete}
        >
          <MdDelete className="fs-3" />
        </Button>
      </div>

      <Form className="rounded shadow-lg p-3 mt-3" onSubmit={handleOnSubmit}>
        <h2>Update product below</h2>
        <hr />

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            onChange={handleOnChange}
            value={form.status}
            required
          >
            <option value="">-- select one --</option>
            <option key="active" value="active">
              active
            </option>
            <option key="inactive" value="inactive">
              inactive
            </option>
          </Form.Select>
        </Form.Group>

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
                      value={getFormattedValue(row[item.name])}
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

        {/* display the existing images / attachments */}
        <div className="d-flex justify-content-between gap-5 flex-wrap mb-3">
          {form.images?.map((url, index) => (
            <div key={url}>
              <div className="d-flex gap-1">
                <input
                  type="radio"
                  name="thumbnail"
                  id={url}
                  checked={url === form.thumbnail}
                  onChange={handleOnChange}
                  value={url}
                />
                <label htmlFor={url}>Use as thumbnail</label>
              </div>
              <img src={url} width={100} height={50} />

              <div className="d-flex gap-1">
                <input
                  type="checkbox"
                  id={url + 1}
                  onChange={handleOnDeleteImg}
                  value={url}
                  disabled={url === form.thumbnail}
                />
                <label htmlFor={url + 1}>Delete</label>
              </div>
            </div>
          ))}
        </div>

        {/* handling the attachmnets */}
        <Form.Group className="mb-3">
          <Form.Control
            id="imageInput"
            type="file"
            name="img"
            multiple
            onChange={handleOnImageAttach}
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="warning" type="submit" disabled={btnDisabled}>
            {btnDisabled ? "Processing..." : "Update product"}
          </Button>
        </div>
      </Form>
    </AdminLayout>
  );
};

export default EditProduct;
