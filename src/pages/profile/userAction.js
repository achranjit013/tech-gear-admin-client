import { fetchNewAccessJWT, fetchUser } from "../../helpers/axiosHelper";
import { setAdmin, setCustomers } from "./userSlice";

export const getUserProfile = () => async (dispatch) => {
  const resp = await fetchUser();

  if (resp?.user) {
    dispatch(setAdmin(resp.user));
  }

  if (resp?.findResult) {
    dispatch(setCustomers(resp.findResult));
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
