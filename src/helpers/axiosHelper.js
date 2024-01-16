import axios from "axios";

const rootAPI = import.meta.env.VITE_ROOT_API;
const userAPI = rootAPI + "/users";

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};

const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};

const axiosProcessor = async ({
  method,
  url,
  data,
  isPrivate,
  refreshToken,
}) => {
  try {
    const token = refreshToken ? getRefreshJWT() : getAccessJWT();

    const headers = {
      Authorization: isPrivate ? token : null,
    };

    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    if (error.response?.data?.message.includes("jwt expired")) {
      const { accessJWT } = await fetchNewAccessJWT();

      if (accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);
        return axiosProcessor({ method, url, data, isPrivate, refreshToken });
      }
    }

    return {
      status: "error",
      message: error.message,
    };
  }
};

// user api
// create new user (admin)
export const postNewAdmin = (data) => {
  console.log("i am in axios");
  return axiosProcessor({
    method: "post",
    url: userAPI,
    data,
  });
};

// verify email
export const postVerifyEmail = (data) => {
  console.log("i am in axios");
  return axiosProcessor({
    method: "post",
    url: userAPI + "/verify-email",
    data,
  });
};

// log in
export const postLoginUser = (data) => {
  console.log("i am in axios");
  return axiosProcessor({
    method: "post",
    url: userAPI + "/login",
    data,
  });
};

// fetching user
export const fetchUser = () => {
  console.log("i am in axios");
  return axiosProcessor({
    method: "get",
    url: userAPI,
    isPrivate: true,
  });
};

// fetch new access jwt
export const fetchNewAccessJWT = () => {
  console.log("i am in axios");
  return axiosProcessor({
    method: "get",
    url: userAPI + "/get-accessjwt",
    isPrivate: true,
    refreshToken: true,
  });
};

// logout
export const logoutUser = (_id) => {
  console.log("i am in axios");
  return axiosProcessor({
    method: "post",
    url: userAPI + "/logout",
    data: {
      _id,
      accessJWT: getAccessJWT(),
    },
  });
};

// request otp
export const requestOTP = (email) => {
  console.log("i am in axios");
  return axiosProcessor({
    method: "post",
    url: userAPI + "/request-otp",
    data: {
      email,
    },
  });
};

// reset password
export const updatePassword = (data) => {
  console.log("i am in axios");
  return axiosProcessor({
    method: "patch",
    url: userAPI,
    data,
  });
};
// update password
export const updateUserPassword = (data) => {
  console.log("i am in axios");
  return axiosProcessor({
    method: "patch",
    url: userAPI + "/password-update",
    data,
    isPrivate: true,
  });
};
