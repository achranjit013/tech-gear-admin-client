import { toast } from "react-toastify";
import { setShowModal } from "../../components/custom-modal/modalSlice";
import {
  fetchNewAccessJWT,
  fetchUser,
  logoutUser,
  updateAdminEmail,
  updateAdminProfile,
} from "../../helpers/axiosHelper";
import { setAdmin, setAdminList, setCustomers } from "./userSlice";

export const getUserProfile = () => async (dispatch) => {
  const resp = await fetchUser();

  if (resp?.user) {
    dispatch(setAdmin(resp.user));
  }

  if (resp?.findCustomers) {
    dispatch(setCustomers(resp.findCustomers));
  }

  if (resp?.findAdmins) {
    dispatch(setAdminList(resp.findAdmins));
  }
};

export const autoLogin = () => async (dispatch) => {
  // check if we have access jwt, then fetch user
  const accessJWT = sessionStorage.getItem("accessJWT");
  if (accessJWT) {
    return dispatch(getUserProfile());
  }

  const refreshJWT = localStorage.getItem("refreshJWT");

  // get access jwt
  if (refreshJWT) {
    const token = await fetchNewAccessJWT();

    if (token?.accessJWT) {
      sessionStorage.setItem("accessJWT", token.accessJWT);

      dispatch(getUserProfile());
    }
  }
};

export const updateAdminProfileAction = (data) => async (dispatch) => {
  const adminPromise = updateAdminProfile(data);

  toast.promise(adminPromise, {
    pending: "Please wait...",
  });

  const { status, message } = await adminPromise;

  if (status === "success") {
    // hide modal
    dispatch(setShowModal(false));

    // fetch updated admin data
    dispatch(getUserProfile());
  }

  toast[status](message);
};

export const updateAdminEmailAction = (data) => async (dispatch) => {
  const { _id, ...rest } = data;

  const adminPromise = updateAdminEmail(rest);

  toast.promise(adminPromise, {
    pending: "Please wait...",
  });

  const { status, message } = await adminPromise;

  if (status === "success") {
    logoutUser(_id);

    //clear storages
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");

    // reset store
    dispatch(setAdmin({}));
    navigate("/");
  }

  dispatch(setShowModal(false));
  toast[status](message);
};
