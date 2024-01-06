import axiosClient from "../config/axios.config";

const addAProduct = async (
  accessToken,
  name,
  description,
  category,
  price,
  discounted_price
) => {
  try {
    const response = await axiosClient.post(
      "/createProduct",
      {
        name: name,
        description: description,
        category: category,
        price: price,
        discounted_price: discounted_price,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
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

const createProductApi = async ({ storeId, formData }) => {
  const res = await axiosClient.post(
    `/product/create-product/${storeId}`,
    formData
  );
  if (res) {
    return res;
  }
};

const getListProductsByStoreApi = async ({
  orderBy,
  sortBy,
  q,
  limit,
  page,
  categoryId,
  rating,
  minPrice,
  maxPrice,
  storeId,
}) => {
  const res = await axiosClient.get(
    `/product/list-products/by-store/${storeId}?q=${q}&sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&limit=${limit}&categoryId=${categoryId}&rating=${rating}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
  if (res) {
    return res;
  }
};

const getListProductsByUserApi = async ({
  orderBy,
  sortBy,
  q = "",
  limit,
  page,
  categories = [],
  rating,
  minPrice,
  maxPrice,
  storeId,
}) => {
  const res = await axiosClient.get(
    `/product/list-products/by-user?q=${q}&sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&limit=${limit}&categories=${categories}&rating=${rating}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
  if (res) {
    return res;
  }
};
const getAllProduct = async () => {
  try {
    const response = await axiosClient.get(`/getAllProducts`);
    //console.log(response);
    return response.data;
  } catch (error) {
    return {
      error,
      statusCode: error.status,
    };
  }
};
const deleteProduct = async (accessToken, id) => {
  try {
    const response = await axiosClient.delete(`/deleteProduct/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      statusCode: response.status,
    };
  } catch (error) {
    console.error("Lỗi khi lấy danh sách ảnh:", error);
    throw error;
  }
};

export {
  addAProduct,
  createProductApi,
  getListProductsByStoreApi,
  getListProductsByUserApi,
  getAllProduct,
  deleteProduct,
};
