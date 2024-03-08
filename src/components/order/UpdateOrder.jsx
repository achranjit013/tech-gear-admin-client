import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getAllOrdersAction,
  updateAOrderAction,
} from "../../pages/order/orderAction";
import TableRow from "../custom-tables/TableRow";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UpdateOrder = ({ _id, status, i }) => {
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state) => state.orderInfo);
  const newTrackingNoRef = useRef(null);
  const [quantities, setQuantities] = useState({});
  const [qtyToFulfill, setQtyToFulfill] = useState(0);

  useEffect(() => {
    if (_id) {
      // get a order for selected _id
      dispatch(getAllOrdersAction(_id));
    }

    if (selectedOrder?._id) {
      // trackingNoRef.current.value = selectedOrder.trackingNumber;
      selectedOrder?.carts?.map(
        ({ cartId, orderedQty, dispatchedQty, totalPrice }) => {
          setQtyToFulfill((prev) => prev + orderedQty - dispatchedQty);

          setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [cartId]: {
              qty: orderedQty - dispatchedQty, //qty to fulfill
              amt: (totalPrice / orderedQty) * (orderedQty - dispatchedQty), // amount for remaining qty to fulfill
              refundPrice: 0, //initial refundable price
            },
          }));
        }
      );
    }
  }, [_id, selectedOrder?._id]);

  const handleQuantityChange = (cartId, newQuantity, newPrice, newRefund) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cartId]: { qty: newQuantity, amt: newPrice, refundPrice: newRefund },
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm(`Are you sure to process the order #${i + 1}?`)) {
      const trackingNo = newTrackingNoRef.current.value;
      if (!trackingNo) return toast.error("please provide tracking number!");

      const orderedQty = selectedOrder?.carts?.reduce(
        (accumulator, { orderedQty }) => accumulator + orderedQty,
        0
      );

      const dispatchedQty = Object.values(quantities).reduce(
        (accumulator, { qty }) => accumulator + qty,
        0
      );

      let status = "fulfilled";
      if (qtyToFulfill > dispatchedQty) {
        status = "partially-fulfilled";
      }

      const cartArray = Object.entries(quantities).map(([cartId, cart], i) => ({
        cartId,
        dispatchedQty: cart.qty.toString(),
        cartRefund: cart.refundPrice.toString(),
        totalPrice: selectedOrder.carts[i].totalPrice.toString(),
        productName: selectedOrder.carts[i].productName,
        orderedQty: selectedOrder.carts[i].orderedQty.toString(),
        orderedSize: selectedOrder.carts[i].orderedSize,
        thumbnail: selectedOrder.carts[i].thumbnail,
      }));

      //dispatch to update in database table and update redux store
      dispatch(
        updateAOrderAction({
          _id,
          status,
          name: selectedOrder.name,
          email: selectedOrder.email,
          shippingStreet: selectedOrder.shippingStreet,
          shippingState: selectedOrder.shippingState,
          shippingZip: selectedOrder.shippingZip,
          trackingNumber: [trackingNo, ...selectedOrder.trackingNumber],
          carts: cartArray,
        })
      );
    }
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="fw-bold mb-3">
          <Col
            md={12}
            className="d-flex justify-content-start align-items-center gap-3"
          >
            <span className="fs-2">Order #{i + 1}</span>
            <span
              className={classNames(
                status === "fulfilled"
                  ? "bg-success"
                  : status === "partially-fulfilled"
                  ? "bg-warning"
                  : "bg-danger",
                "px-2 py-1 rounded text-uppercase fw-medium"
              )}
            >
              {status}
            </span>
          </Col>
        </Row>

        {/* user details */}
        <Row className="mb-3">
          <Col className="d-flex justify-content-start align-items-center gap-2">
            <span>{selectedOrder?.name}</span>
            <span>({selectedOrder?.email})</span>
          </Col>
        </Row>

        {/* cart */}
        <Row className="">
          <Col className="">
            <Table className="overflow-hidden rounded shadow border">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Product Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.carts?.map((cart, index) => (
                  <TableRow
                    key={cart?._id}
                    {...cart}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </tbody>
              <tfoot>
                <tr
                  className={classNames(
                    selectedOrder?.carts?.length % 2 === 0 ? "table-light" : ""
                  )}
                >
                  <td>Shipping</td>
                  <td colSpan={5} className="text-end">
                    (
                    <span
                      className={classNames(
                        selectedOrder.shipping === "standard"
                          ? "text-danger"
                          : "text-warning"
                      )}
                    >
                      {selectedOrder.shipping}
                    </span>
                    )
                    {selectedOrder.shipping === "standard"
                      ? " 10.00"
                      : " 20.00"}
                  </td>
                </tr>
                <tr
                  className={classNames(
                    selectedOrder?.carts?.length % 2 !== 0 ? "table-light" : ""
                  )}
                >
                  <td>Refundable Amount</td>
                  <td colSpan={5} className="text-end">
                    {Object.values(quantities).reduce(
                      (accumulator, { qty }) => accumulator + qty,
                      0
                    ) > 0
                      ? Object.values(quantities)
                          .reduce(
                            (accumulator, { refundPrice }) =>
                              accumulator + refundPrice,
                            0
                          )
                          .toFixed(2)
                      : selectedOrder?.shipping === "standard"
                      ? (
                          Object.values(quantities).reduce(
                            (accumulator, { refundPrice }) =>
                              accumulator + refundPrice,
                            0
                          ) + 10
                        ).toFixed(2)
                      : (
                          Object.values(quantities).reduce(
                            (accumulator, { refundPrice }) =>
                              accumulator + refundPrice,
                            0
                          ) + 20
                        ).toFixed(2)}
                  </td>
                </tr>
                <tr
                  className={classNames(
                    selectedOrder?.carts?.length % 2 === 0 ? "table-light" : ""
                  )}
                >
                  <td>Total</td>
                  <td colSpan={5} className="text-end">
                    {selectedOrder?.trackingNumber?.length > 0
                      ? Object.values(quantities)
                          .reduce(
                            (accumulator, { amt }) => accumulator + amt,
                            0
                          )
                          .toFixed(2)
                      : Object.values(quantities).reduce(
                          (accumulator, { qty }) => accumulator + qty,
                          0
                        ) > 0
                      ? selectedOrder?.shipping === "standard"
                        ? (
                            Object.values(quantities).reduce(
                              (accumulator, { amt }) => accumulator + amt,
                              0
                            ) + 10
                          ).toFixed(2)
                        : (
                            Object.values(quantities).reduce(
                              (accumulator, { amt }) => accumulator + amt,
                              0
                            ) + 20
                          ).toFixed(2)
                      : Object.values(quantities)
                          .reduce(
                            (accumulator, { amt }) => accumulator + amt,
                            0
                          )
                          .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>

        <Row className="g-2">
          <Col md={12}>
            <Form.Label className="fw-medium">Tracking Number</Form.Label>
            <Form.Control
              ref={newTrackingNoRef}
              required={true}
              placeholder="Enter new tracking number"
            />
          </Col>
        </Row>

        <Row className="g-2 mt-1">
          {selectedOrder.trackingNumber?.length &&
            selectedOrder.trackingNumber?.map((item) => (
              <Col md={4}>
                <Form.Control
                  className=""
                  value={item}
                  required={true}
                  disabled
                />
              </Col>
            ))}
        </Row>

        {selectedOrder?.status !== "fulfilled" && (
          <Row>
            <Col md={12}>
              <Button
                type="submit"
                className="mt-3 px-5 fw-bold lh-base btn-success"
                style={{ letterSpacing: "1px" }}
              >
                Process order
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};

export default UpdateOrder;
