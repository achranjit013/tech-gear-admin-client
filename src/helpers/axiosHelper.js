import axios from "axios";

const rootAPI = import.meta.env.VITE_ROOT_API;
const userAPI = rootAPI + "/users";

const axiosProcessor = async ({ method, url, data }) => {
  try {
    console.log(data);
    console.log(rootAPI);
    console.log(userAPI);
    const response = await axios({
      method,
      url,
      data,
    });

    console.log(response);
    console.log("first");
    return response.data;
  } catch (error) {
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
