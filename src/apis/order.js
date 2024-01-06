import axiosClient from '../config/axios.config';

const createOrder = async (accessToken, payment_method, order_date, total_amount, shipping_fee, user_id) => {
  try {
    const response = await axiosClient.post(`/createOrder`, { payment_method: payment_method, order_date: order_date, total_amount: total_amount, shipping_fee: shipping_fee, user_id: user_id }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
    if (response) {
      return {
        id: response.data.id,
        statusCode: response.status
      }
    }
  } catch (error) {
    console.error('Lỗi khi tạo mới đơn hàng', error);
    throw error;
  }
};
const createOrderDetail = async (accessToken, order_id, prod_id, quantity, total_price) => {
  try {
    const response = await axiosClient.post(`/createNewOrderDetail`, { order_id: order_id, prod_id: prod_id, quantity: quantity, total_price: total_price }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
    if (response) {
      return {
        id: response.data.id,
        statusCode: response.status
      }
    }
  } catch (error) {
    console.error('Lỗi khi tạo mới chi tiết đơn hàng', error);
    throw error;
  }
};


const getOrderByUserId = async (accessToken, id) => {
  try {
    const response = await axiosClient.get(`/getOrderByUserId/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    //console.log(response);
    return response.data

  } catch (error) {
    console.error('Lỗi khi lấy video:', error);
    throw error;
  }
};
const getOrderDetailByOrderId = async (accessToken, id) => {
  try {
    const response = await axiosClient.get(`/getOrderDetailByOrderId/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const processedData = response.data.map((orderDetail) => {

      const {
        order_id,
        quantity,
        product: { category, discounted_price, name, price },
      } = orderDetail;
      return {
        order_id, quantity, category, discounted_price, name, price
      };
    });

    return processedData;

  } catch (error) {
    console.error('Lỗi khi lấy video:', error);
    throw error;
  }
};
const getAllOrder = async (accessToken) => {
  try {
    const response = await axiosClient.get(`/getAllOrders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);

    return {
      data: response.data,
      statusCode: response.status
    }

  } catch (error) {
    console.error('Lỗi khi lấy order:', error);
    throw error;
  }
};
const deleteOrder = async (accessToken, id) => {
  try {
    const response = await axiosClient.delete(`/deleteOrder/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.status

  } catch (error) {
    console.error('Lỗi khi lấy order:', error);
    throw error;
  }
}
const deleteAllOrderByOrderId = async (accessToken, id) => {
  try {
    const response = await axiosClient.delete(`/deleteAllOrderByOrderId/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.status

  } catch (error) {
    console.error('Lỗi khi lấy order:', error);
    throw error;
  }
}

export {
  createOrder,
  createOrderDetail,
  getOrderByUserId,
  getOrderDetailByOrderId,
  getAllOrder,
  deleteOrder,
  deleteAllOrderByOrderId
}