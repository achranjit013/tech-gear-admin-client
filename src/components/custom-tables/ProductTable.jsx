import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../pages/product/productAction";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import CustomInput from "../custom-input/CustomInput";
import { getAllSubCats } from "../../pages/category/categoryAction";
import { format, parseISO } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductTable() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.productInfo);
  const { catList } = useSelector((state) => state.catInfo);
  const { subCatList } = useSelector((state) => state.catInfo);
  const [fileteredProductList, setFileteredProductList] = useState();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllSubCats());

    if (productList?.length > 0) {
      setFileteredProductList(productList);
    }
  }, [dispatch, productList?.length]);

  const handleOnSearch = (e) => {
    const filteredResult = productList.filter(
      (product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.slug.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.sku.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFileteredProductList(filteredResult);
  };

  const obj = {
    name: "search",
    placeholder: "Search by name (slug) or sku",
    type: "text",
  };

  return (
    <>
      <Row className="d-flex justify-content-between align-items-end">
        <Col md={6} className="">
          <p>{fileteredProductList?.length} products found !</p>
        </Col>
        <Col md={6}>
          <CustomInput {...obj} onChange={handleOnSearch} />
        </Col>
      </Row>

      {fileteredProductList?.length ? (
        <>
          <Table striped bordered className="overflow-hidden rounded shadow">
            <thead>
              <tr>
                <th>#</th>
                <th>Thumbnail</th>
                <th>Status</th>
                <th>Name (Slug)</th>
                <th>SKU</th>
                <th>Variants</th>
                <th>Catgeory / Subcategory</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fileteredProductList.map(
                (
                  {
                    _id,
                    categoryId,
                    subCategoryId,
                    thumbnail,
                    status,
                    name,
                    slug,
                    variants,
                    sku,
                    createdAt,
                  },
                  i
                ) => (
                  <tr key={_id}>
                    <td>{i + 1}</td>
                    <td>
                      <img src={thumbnail} width={100} />
                    </td>
                    <td className="text-white">
                      <span
                        className={classNames(
                          status === "active" ? "bg-success" : "bg-danger",
                          "p-1 rounded"
                        )}
                      >
                        {status}
                      </span>
                    </td>
                    <td>
                      <span className="text-capitalize">{name}</span> ({slug})
                    </td>
                    <td className="text-uppercase">{sku}</td>
                    <td>
                      <Table striped bordered className="variants-table">
                        <thead>
                          <tr>
                            <th>Size</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Sales Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {variants.map((variant, variantIndex) => (
                            <tr key={variantIndex}>
                              <td>{variant.size}</td>
                              <td>{variant.qty}</td>
                              <td>{variant.price}</td>
                              <td className="d-flex flex-column gap-1">
                                <span className="fw-bold">
                                  {variant.salesPrice}
                                </span>
                                <span>
                                  {variant.salesStartDate
                                    ? `From: ${format(
                                        parseISO(variant.salesStartDate),
                                        "yyyy/MM/dd"
                                      )}`
                                    : ""}
                                </span>
                                <span>
                                  {variant.salesEndDate
                                    ? `Ends at: ${format(
                                        parseISO(variant.salesEndDate),
                                        "yyyy/MM/dd"
                                      )}`
                                    : ""}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </td>
                    <td className="text-capitalize">
                      {catList.find(({ _id }) => _id === categoryId).title}
                      {" / "}
                      {
                        subCatList
                          .find(({ _id }) => _id === categoryId)
                          .subCategories.find(
                            ({ _id }) => _id === subCategoryId
                          ).title
                      }
                    </td>
                    <td>{format(parseISO(createdAt), "yyyy/MM/dd")}</td>
                    <td>
                      <Link to={`/product/edit/${_id}`}>
                        <Button
                          variant="warning"
                          className="p-2 d-flex justify-content-center align-items-center"
                        >
                          <FaEdit />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </>
      ) : (
        <p className="text-center">No data to display!</p>
      )}
    </>
  );
}

export default ProductTable;
