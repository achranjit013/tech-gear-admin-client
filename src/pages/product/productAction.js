import { toast } from "react-toastify";
import {
  deleteProduct,
  fetchProducts,
  postProducts,
  updateProduct,
} from "../../helpers/axiosHelper";
import { setProductList, setSelectedProduct } from "./productSlice";

export const getAllProducts = (subcategoryId) => async (dispatch) => {
  const { status, message, products } = await fetchProducts(subcategoryId);

  if (status === "success") {
    dispatch(setProductList(products));
  }
};

export const getAProduct = (_id) => async (dispatch) => {
  const { status, message, products } = await fetchProducts(_id);

  if (status === "success") {
    dispatch(setSelectedProduct(products));
  }
};

export const postAProduct = (obj) => async (dispatch) => {
  const pending = postProducts(obj);

  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;
  toast[status](message);

  if (status === "success") {
    dispatch(getAllProducts());
  }

  return { status };
};

export const updateAProduct = (_id, obj) => async (dispatch) => {
  const pending = updateProduct(obj);

  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;
  toast[status](message);

  if (status === "success") {
    dispatch(getAProduct(_id));
  }

  return { status };
};

export const deleteAProduct = (_id) => async (dispatch) => {
  const pending = deleteProduct(_id);

  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;
  toast[status](message);

  return { status };
};
