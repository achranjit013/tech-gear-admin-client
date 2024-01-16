import { toast } from "react-toastify";
import { fetchCatgeories, postCatgeory } from "../../helpers/axiosHelper.js";
import { setCatList } from "./categorySlice";

export const getAllCats = () => async (dispatch) => {
  const { status, message, categories } = await fetchCatgeories();

  if (status === "success") {
    dispatch(setCatList(categories));
  }
};

export const postNewCat = (obj) => async (dispatch) => {
  const pending = postCatgeory(obj);
  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;
  toast[status](message);

  if (status === "success") {
    dispatch(getAllCats());
  }
};
