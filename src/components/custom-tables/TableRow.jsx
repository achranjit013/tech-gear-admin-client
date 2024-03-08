import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const TableRow = ({
  cartId,
  totalPrice,
  productName,
  orderedQty,
  dispatchedQty,
  cartRefund,
  orderedSize,
  thumbnail,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(orderedQty - dispatchedQty);

  const increaseQuantity = () => {
    if (quantity < orderedQty - dispatchedQty) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      onQuantityChange(
        cartId,
        quantity + 1, // qty to fulfill
        (totalPrice / orderedQty) * (quantity + 1), // amount for remaining qty to fulfill
        (totalPrice / orderedQty) * (orderedQty - dispatchedQty - quantity - 1) // refundable price
      );
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onQuantityChange(
        cartId,
        quantity - 1, // qty to fulfill
        (totalPrice / orderedQty) * (quantity - 1), // amount for remaining qty to fulfill
        (totalPrice / orderedQty) * (orderedQty - dispatchedQty - quantity + 1) // refundable price
      );
    }
  };

  return (
    <tr>
      <td>
        <img src={thumbnail} alt={productName} width={100} height={50} />
      </td>
      <td>{productName}</td>
      <td>sku</td>
      <td className="d-flex gap-2 align-items-center">
        <Button variant="dark" size="sm" onClick={increaseQuantity}>
          <FaPlus />
        </Button>
        <span>{quantity}</span>
        <Button variant="dark" size="sm" onClick={decreaseQuantity}>
          <FaMinus />
        </Button>
      </td>
      <td className="text-uppercase">{orderedSize}</td>
      <td>{((totalPrice / orderedQty) * quantity).toFixed(2)}</td>
    </tr>
  );
};

export default TableRow;
