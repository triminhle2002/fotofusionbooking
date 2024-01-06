import axiosClient from '../config/axios.config';

const createRequest = async (accessToken, user_id, img_url_old, request) => {
    try {
        const response = await axiosClient.post(`/createRequest`, { user_id: user_id, img_url_old: img_url_old, request: request, is_status: "false" }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
        if (response) {
            return {
                status: response.status
            }
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách video:', error);
        throw error;
    }
};

const getRequest = async (accessToken) => {
    try {
        const response = await axiosClient.get(`/getAllRequests`, {
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
const getRequestByUserId = async (accessToken, id) => {
    try {
        const response = await axiosClient.get(`/getRequestByUserId/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        //console.log(response);
        return response.data

    } catch (error) {
        console.error('Lỗi khi lấy yêu cầu:', error);
        throw error;
    }
};
const updateStatus = async (accessToken, id, status) => {
    try {
        const response = await axiosClient.put(`/updateRequest/${id}`, { status: status }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            statusCode: response.status,
        };
    } catch (e) {
        return {
            status: e.response.status,
        };
    }
};
const updateNewPhoto = async (accessToken, id, img_url_new, status) => {
    try {
        const response = await axiosClient.put(`/updateRequest/${id}`, { img_url_new: img_url_new, status: status }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response
    } catch (e) {
        return {
            status: e.response.status,
        };
    }
};
const deleteRequest = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deleteRequest/${id}`, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            statusCode: response.status,
        };
    } catch (error) {

    }
}
export {
    createRequest,
    getRequest,
    updateStatus,
    updateNewPhoto,
    getRequestByUserId,
    deleteRequest
}