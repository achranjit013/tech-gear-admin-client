import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../pages/product/productAction";
import { Link } from "react-router-dom";

function ProductTable() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {productList.length} products found !
      <Table striped bordered hover className="mt-1">
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Status</th>
            <th>Name</th>
            <th>QTY</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.map(
            (
              {
                _id,
                thumbnail,
                name,
                status,
                slug,
                qty,
                price,
                salesPrice,
                createdAt,
              },
              i
            ) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={import.meta.env.VITE_SERVER_ROOT + thumbnail}
                    width={100}
                  />
                </td>
                <td
                  className={
                    status === "active" ? "text-success" : "text-danger"
                  }
                >
                  {status}
                </td>
                <td>
                  Name: {name} <br /> Slug: {slug}
                </td>
                <td>{qty}</td>
                <td>
                  Price: {price} <br /> Sales Price: {salesPrice}
                </td>
                <td>
                  <Link to={`/product/edit/${_id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
}

export default ProductTable;
