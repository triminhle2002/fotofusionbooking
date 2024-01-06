import axiosClient from "../config/axios.config";

const LOGIN_ENDPOINT = "/auth/login";

export const loginApi = async (email, password) => {
  try {
    const response = await axiosClient.post(LOGIN_ENDPOINT, {
      email: email,
      password: password,
    });
    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
};

export const authorization = async (accessToken, email) => {
  try {
    const responseRoles = await axiosClient.get(`/getAccountByEmail/${email}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    },);
    console.log(responseRoles);
    return {
      roles: responseRoles.data.Role.name,
      phoneNumber: responseRoles.data.phone_number,
      statusCode: responseRoles.status,
    };

  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
};
export const getUser = async (accessToken, email) => {
  try {
    const responseRoles = await axiosClient.get(`/getUserByEmail/${email}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(responseRoles);
    return {
      name: responseRoles.data.name,
      id: responseRoles.data.id,
      address: responseRoles.data.address,
      gender: responseRoles.data.gender,
      statusCode: responseRoles.status,
      avatar: responseRoles.data.avatar_url,
    };
  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
};
const REGISTER_ENDPOINT = "auth/register";
export const register = async (email, password, phoneNumber) => {
  try {
    const response = await axiosClient.post(REGISTER_ENDPOINT, {
      email: email,
      password: password,
      phone_number: phoneNumber,
    });
    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
};
const CONFIRMOTP_ENDPOINT = 'auth/confirmOtp';
export const confirmOtp = async (email, otp) => {
  try {
    const response = await axiosClient.post(CONFIRMOTP_ENDPOINT, {
      email: email,
      otp: otp
    });
    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
};
const FORGOTPASSWORD_ENDPOINT = 'auth/forgotpassword';
export const forgotPassword = async (email) => {
  try {
    const response = await axiosClient.post(FORGOTPASSWORD_ENDPOINT, {
      email: email,
    });
    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
};

const RESETPASSWORD_ENDPOINT = 'auth/resetPassword';

export const resetPassword = async (otp, password) => {
  try {
    const response = await axiosClient.post(RESETPASSWORD_ENDPOINT, {
      otp: otp,
      password: password
    });
    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
}


export const changePassword = async (email, oldPassword, newPassword) => {
  try {
    const response = await axiosClient.post(`/auth/changepassword/${email}`, { oldPassword: oldPassword, newPassword: newPassword, });
    return {
      response: response,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
};





