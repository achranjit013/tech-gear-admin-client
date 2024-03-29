import { toast } from "react-toastify";
import {
  deleteCategory,
  deleteSubCategory,
  fetchCatgeories,
  fetchSubCatgeories,
  postCatgeory,
  postSubCatgeory,
  updateCatgeory,
  updateSubCatgeory,
} from "../../helpers/axiosHelper.js";
import { setCatList, setSubCatList } from "./categorySlice";
import { setShowModal } from "../../components/custom-modal/modalSlice.js";

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
    return { status };
  }
};

export const updateExistingCat = (obj) => async (dispatch) => {
  const pending = updateCatgeory(obj);
  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    dispatch(getAllCats());
    dispatch(setShowModal(false));
  }
};

export const deleteExistingCat = (_id) => async (dispatch) => {
  const pending = deleteCategory(_id);
  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    dispatch(getAllCats());
  }
};

export const getAllSubCats = (categoryId) => async (dispatch) => {
  const { status, message, subCategories } = await fetchSubCatgeories(
    categoryId
  );

  if (status === "success") {
    dispatch(setSubCatList(subCategories));
  }
};

export const postNewSubCat = (obj) => async (dispatch) => {
  const pending = postSubCatgeory(obj);
  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    dispatch(getAllSubCats());
    return { status };
  }
};

export const updateExistingSubCat = (obj) => async (dispatch) => {
  const pending = updateSubCatgeory(obj);
  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    dispatch(getAllSubCats());
    dispatch(setShowModal(false));
  }
};

export const deleteExistingSubCat = (_id) => async (dispatch) => {
  const pending = deleteSubCategory(_id);
  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    dispatch(getAllSubCats());
  }
};
