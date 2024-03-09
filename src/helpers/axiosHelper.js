import axios from "axios";

const rootAPI = import.meta.env.VITE_SERVER_ROOT + "/api/v1";
const userAPI = rootAPI + "/users";
const catAPI = rootAPI + "/categories";
const subCatAPI = rootAPI + "/sub-categories";
const prodAPI = rootAPI + "/products";
const orderAPI = rootAPI + "/orders";

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
  return axiosProcessor({
    method: "post",
    url: userAPI,
    data,
  });
};

// verify email
export const postVerifyEmail = (data) => {
  return axiosProcessor({
    method: "post",
    url: userAPI + "/verify-email",
    data,
  });
};

// log in
export const postLoginUser = (data) => {
  return axiosProcessor({
    method: "post",
    url: userAPI + "/login",
    data,
  });
};

// fetching user
export const fetchUser = () => {
  return axiosProcessor({
    method: "get",
    url: userAPI,
    isPrivate: true,
  });
};

// fetch new access jwt
export const fetchNewAccessJWT = () => {
  return axiosProcessor({
    method: "get",
    url: userAPI + "/get-accessjwt",
    isPrivate: true,
    refreshToken: true,
  });
};

// logout
export const logoutUser = (_id) => {
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
  return axiosProcessor({
    method: "patch",
    url: userAPI,
    data,
  });
};

// update password
export const updateUserPassword = (data) => {
  return axiosProcessor({
    method: "patch",
    url: userAPI + "/password-update",
    data,
    isPrivate: true,
  });
};

// get categories
export const fetchCatgeories = () => {
  return axiosProcessor({
    method: "get",
    url: catAPI,
    isPrivate: true,
  });
};

// post categories
export const postCatgeory = (data) => {
  return axiosProcessor({
    method: "post",
    url: catAPI,
    isPrivate: true,
    data,
  });
};

// post categories
export const updateCatgeory = (data) => {
  return axiosProcessor({
    method: "put",
    url: catAPI,
    isPrivate: true,
    data,
  });
};

// delete category
export const deleteCategory = (_id) => {
  return axiosProcessor({
    method: "delete",
    url: catAPI + "/" + _id,
    isPrivate: true,
  });
};

// post sub categories
export const postSubCatgeory = (data) => {
  return axiosProcessor({
    method: "post",
    url: subCatAPI,
    isPrivate: true,
    data,
  });
};

// post sub categories
export const updateSubCatgeory = (data) => {
  return axiosProcessor({
    method: "put",
    url: subCatAPI,
    isPrivate: true,
    data,
  });
};

// get sub categories
export const fetchSubCatgeories = (categoryId) => {
  return axiosProcessor({
    method: "get",
    url: categoryId ? subCatAPI + "/" + categoryId : subCatAPI,
    isPrivate: true,
  });
};

// delete subcategory
export const deleteSubCategory = (_id) => {
  return axiosProcessor({
    method: "delete",
    url: subCatAPI + "/" + _id,
    isPrivate: true,
  });
};

// get products
export const fetchProducts = (_id) => {
  return axiosProcessor({
    method: "get",
    url: _id ? prodAPI + "/" + _id : prodAPI,
    isPrivate: true,
  });
};

// post products
export const postProducts = (data) => {
  return axiosProcessor({
    method: "post",
    url: prodAPI,
    isPrivate: true,
    data,
  });
};

// update products
export const updateProduct = (data) => {
  return axiosProcessor({
    method: "put",
    url: prodAPI,
    isPrivate: true,
    data,
  });
};

// update products
export const deleteProduct = (_id) => {
  return axiosProcessor({
    method: "delete",
    url: prodAPI + "/" + _id,
    isPrivate: true,
  });
};

// get orders
export const fetchOrders = (_id) => {
  return axiosProcessor({
    method: "get",
    url: _id ? orderAPI + "/" + _id : orderAPI,
    isPrivate: true,
  });
};

// update order status
export const updateOrder = (data) => {
  return axiosProcessor({
    method: "patch",
    url: orderAPI,
    isPrivate: true,
    data,
  });
};
