import axiosClient from '../config/axios.config';

const CreateARoom = async (accessToken, name, is_status, category, price) => {

    try {
        const response = await axiosClient.post('/createPhotographyRoom', { name: name, is_status: is_status, category: category, price: price }, {
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
const updateRoom = async (accessToken, id, name, is_status, category, price) => {

    try {
        const response = await axiosClient.put(`/updatePhotographyRoom/${id}`, { name: name, is_status: is_status, category: category, price: price }, {
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
const deleteRoom = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletePhotographyRoom/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            statusCode: response.status
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getStudioRoom = async () => {
    try {
        const response = await axiosClient.get(`/getAllPhotographyRooms`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getAllCategoryOfPhotographyRooms = async () => {
    try {
        const response = await axiosClient.get(`/getAllCategoryOfPhotographyRooms`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getRoomById = async (id) => {
    try {
        const response = await axiosClient.get(`/getPhotographyRoomById/${id}`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
export {
    CreateARoom,
    getStudioRoom,
    deleteRoom,
    updateRoom,
    getAllCategoryOfPhotographyRooms,
    getRoomById
};