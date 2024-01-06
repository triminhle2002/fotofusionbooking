import axiosClient from "../config/axios.config";
import axios from "axios";

const header = {
  baseURL: "https://vapi.vnappmob.com",
};

const getListAdressesByUserApi = async ({ userId }) => {
  const res = await axiosClient.get(`/address/list-addreeses/${userId}`);
  if (res) {
    return res;
  }
};

const addAddressApi = async ({ userId, data }) => {
  const res = await axiosClient.post(`/address/add-address/${userId}`, data);
  if (res) {
    return res;
  }
};

const getListProvinceVietNamApi = async () => {
  const res = await axios.get(`/api/province`, header);
  if (res && res.data) {
    return res.data;
  }
};

const getListDistrictsVietNamApi = async ({ provinceId }) => {
  const res = await axios.get(
    `/api/province/district/${provinceId}`, header);
  if (res && res.data) {
    return res.data;
  }
};

const getListWardsVietNamApi = async ({ districtId }) => {
  const res = await axios.get(`/api/province/ward/${districtId}`, header);
  if (res && res.data) {
    return res.data;
  }
};

const getAddressDefaultApi = async ({ userId }) => {
  const res = await axiosClient.get(`/address/address-default/${userId}`);
  if (res) {
    return res;
  }
};

const setupDefaultAddressApi = async ({ userId, addressId }) => {
  const res = await axiosClient.put(
    `/address/set-default/${userId}/${addressId}`
  );
  if (res) {
    return res;
  }
};
const updateAddress = async (accessToken, id, address) => {

  try {
    const response = await axiosClient.put(`/updateUser/${id}`, { address: address }, {
      headers: {

        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      id: response.data.id,
      response: response.data,
      statusCode: response.status,
    };
  } catch (e) {
    return {
      error: e.response.data,
      status: e.response.status,
    };
  }
};


export {
  getListAdressesByUserApi,
  addAddressApi,
  getListProvinceVietNamApi,
  getListDistrictsVietNamApi,
  getListWardsVietNamApi,
  getAddressDefaultApi,
  setupDefaultAddressApi,
  updateAddress
};