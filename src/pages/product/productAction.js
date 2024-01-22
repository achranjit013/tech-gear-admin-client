import { toast } from "react-toastify";
import { fetchProducts, postProducts } from "../../helpers/axiosHelper";
import { setProductList } from "./productSlice";

export const getAllProducts = () => async (dispatch) => {
  const { status, message, products } = await fetchProducts();

  if (status === "success") {
    dispatch(setProductList(products));
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
};
