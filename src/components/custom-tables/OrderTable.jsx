import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { getAllOrdersAction } from "../../pages/order/orderAction";
import CustomModal from "../custom-modal/CustomModal";
import { setShowModal } from "../custom-modal/modalSlice";
import UpdateOrder from "../order/UpdateOrder";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function OrderTable() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderInfo);
  const [updateRowId, setUpdateRowId] = useState({});

  useEffect(() => {
    dispatch(getAllOrdersAction());
  }, [dispatch]);

  // Function to handle the update button click
  const handleUpdateClick = (obj) => {
    setUpdateRowId(obj);
    dispatch(setShowModal(true));
  };

  return (
    <>
      <CustomModal title="Fulfill the order below!">
        <UpdateOrder {...updateRowId} />
      </CustomModal>

      {orders?.length ? (
        <>
          <p>{orders?.length} orders found !</p>
          <Table striped bordered className="overflow-hidden rounded shadow">
            <thead>
              <tr className="text-center">
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Status</th>
                <th rowSpan={2}>Name (Email)</th>
                <th colSpan={7}>Cart</th>
                <th rowSpan={2}>Total Price</th>
                <th rowSpan={2}>Address</th>
                <th rowSpan={2}>Shipping Method</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr className="text-center">
                <th>Thumbnail</th>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Ordered Qty</th>
                <th>Qty to Dispatch</th>
                <th>Size</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map(
                (
                  {
                    _id,
                    status,
                    name,
                    email,
                    shippingStreet,
                    shippingState,
                    shippingZip,
                    billingStreet,
                    billingState,
                    billingZip,
                    userId,
                    carts,
                    amount,
                    createdAt,
                    billingSameAsShipping,
                    shipping,
                  },
                  i
                ) => (
                  <>
                    <tr key={_id}>
                      <td rowSpan={carts?.length}>{i + 1}</td>
                      <td rowSpan={carts?.length} className="">
                        <span
                          className={classNames(
                            status === "fulfilled"
                              ? "bg-success"
                              : status === "partially-fulfilled"
                              ? "bg-warning"
                              : "bg-danger",
                            "px-2 py-1 rounded fw-medium"
                          )}
                        >
                          {status}
                        </span>
                      </td>
                      <td rowSpan={carts?.length}>
                        {name} ({email})
                      </td>
                      <td>
                        <img
                          src={carts[0].thumbnail}
                          alt={carts[0].productName}
                          width={100}
                          height={50}
                        />
                      </td>
                      <td>{carts[0]?.productName}</td>
                      <td>SKU</td>
                      <td>{carts[0]?.orderedQty}</td>
                      <td>{carts[0]?.orderedQty - carts[0]?.dispatchedQty}</td>
                      <td className="text-uppercase">
                        {carts[0]?.orderedSize}
                      </td>
                      <td>{carts[0]?.totalPrice}</td>
                      <td rowSpan={carts?.length}>{amount}</td>
                      <td rowSpan={carts?.length}>
                        Shipping: {shippingStreet}, {shippingState},{" "}
                        {shippingZip}
                        <hr />
                        Billing:{" "}
                        {billingSameAsShipping ? (
                          "Same as shipping"
                        ) : (
                          <>
                            {billingStreet},{billingState},{billingZip}
                          </>
                        )}
                      </td>
                      <td rowSpan={carts?.length} className="text-uppercase">
                        <span
                          className={classNames(
                            shipping === "standard"
                              ? "text-danger"
                              : "text-warning",
                            "p-1 rounded text-uppercase fw-bold"
                          )}
                        >
                          {shipping}
                        </span>
                      </td>
                      <td rowSpan={carts?.length}>
                        <Button
                          variant="warning"
                          className="p-2 d-flex justify-content-center align-items-center"
                          onClick={() => handleUpdateClick({ _id, status, i })}
                        >
                          <FaEdit />
                        </Button>
                      </td>
                    </tr>
                    {carts
                      .slice(1)
                      .map(
                        (
                          {
                            cartId,
                            totalPrice,
                            productName,
                            orderedQty,
                            dispatchedQty,
                            orderedSize,
                            thumbnail,
                          },
                          cartIndex
                        ) => (
                          <tr key={cartIndex}>
                            <td>
                              <img
                                src={thumbnail}
                                alt={productName}
                                width={100}
                                height={50}
                              />
                            </td>
                            <td>{productName}</td>
                            <td>SKU</td>
                            <td>{orderedQty}</td>
                            <td>{orderedQty - dispatchedQty}</td>
                            <td className="text-uppercase">{orderedSize}</td>
                            <td>{totalPrice}</td>
                          </tr>
                        )
                      )}
                  </>
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

export default OrderTable;
