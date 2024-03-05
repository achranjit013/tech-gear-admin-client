import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../pages/product/productAction";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductTable() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {productList.length ? (
        <>
          <p>{productList.length} products found !</p>
          <Table striped bordered className="overflow-hidden rounded shadow">
            <thead>
              <tr>
                <th>#</th>
                <th>Thumbnail</th>
                <th>Status</th>
                <th>Name (Slug)</th>
                <th>Variants</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map(
                (
                  { _id, thumbnail, status, name, slug, variants, createdAt },
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
                      {name} ({slug})
                    </td>
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
                              <td>{variant.salesPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </td>

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
