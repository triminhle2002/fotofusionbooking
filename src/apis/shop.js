import axiosClient from '../config/axios.config';

const addProductToCart = async (accessToken, user_id, prod_id, quantity) => {
    console.log(quantity);
    try {
        const response = await axiosClient.post('/addProductToCart', { user_id: user_id, prod_id: prod_id, quantity: quantity }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};
const getItemInCart = async (accessToken, user_id) => {
    try {
        const response = await axiosClient.get(`/getAllCartByUser/${user_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const processedData = response.data.map((product) => {
            // Trích xuất tất cả các trường
            const {
                id,
                quantity,
                Product: {
                    id: prodId,
                    name: nameProduct,
                    category,
                    price,
                    discounted_price,
                    photos,
                },
            } = product;

            // Lấy url_photo của phần tử đầu tiên trong mảng photos
            const urlPhoto = photos.length > 0 ? photos[0].url_photo : null;

            return {
                id,
                quantity,
                prodId,
                nameProduct,
                category,
                price,
                discounted_price,
                photos: urlPhoto,
            };
        });

        const statusCode = response.status;

        return {
            data: processedData,
            statusCode: statusCode,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status || 500, // Nếu không có status code từ error, sử dụng 500
        };
    }
};


const removeProductInCart = async (accessToken, user_id, prod_id) => {
    try {
        const response = await axiosClient.delete(`/deleteProductInCart/${user_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                prod_id: prod_id,
            },
        });

        return {
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};
const updateCartItemQuantity = async (accessToken, id, newQuantity) => {

    try {
        const response = await axiosClient.put(`/updateCartItemQuantity/${id}`, { newQuantity: newQuantity }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
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
    addProductToCart,
    removeProductInCart,
    getItemInCart,
    updateCartItemQuantity
};