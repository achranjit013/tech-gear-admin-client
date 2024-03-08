import { toast } from "react-toastify";
import { fetchOrders, updateOrder } from "../../helpers/axiosHelper";
import { setOrders, setSelectedOrder } from "./orderSlice";
import { setShowModal } from "../../components/custom-modal/modalSlice";

export const getAllOrdersAction = (_id) => async (dispatch) => {
  const { status, findResult } = await fetchOrders(_id);

  if (status === "success") {
    if (_id) {
      dispatch(setSelectedOrder(findResult));
      return findResult;
    } else {
      dispatch(setOrders(findResult));
    }
  }
};

export const updateAOrderAction = (obj) => async (dispatch) => {
  const pending = updateOrder(obj);
  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    dispatch(setShowModal(false));
    dispatch(getAllOrdersAction());
  }

  return { status };
};
