import { fetchNewAccessJWT, fetchUser } from "../../helpers/axiosHelper";
import { setAdmin } from "./userSlice";

export const getUserProfile = () => async (dispatch) => {
  const resp = await fetchUser();
  console.log("first");
  console.log(resp);
  if (resp?.user) {
    dispatch(setAdmin(resp.user));
  }
};

export const autoLogin = () => async (dispatch) => {
  // check if we have access jwt, then fetch user
  console.log("auto login");
  const accessJWT = sessionStorage.getItem("accessJWT");
  console.log(accessJWT);
  if (accessJWT) {
    return dispatch(getUserProfile());
  }

  const refreshJWT = sessionStorage.getItem("refreshjJWT");
  console.log(refreshJWT);
  // get access jwt
  if (refreshJWT) {
    const token = await fetchNewAccessJWT();

    if (token?.accessJWT) {
      sessionStorage.setItem("accessJWT", token.accessJWT);

      dispatch(getUserProfile());
    }
  }
  // api call
};
