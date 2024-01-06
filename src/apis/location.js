import axiosClient from '../config/axios.config';

const createNewLocations = async (accessToken, name, address, type, description) => {

    try {
        const response = await axiosClient.post('/createNewLocations', { name: name, address: address, type: type, description: description }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            id: response.data.id,
            data: response.data,
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};
const UpdateLocationsById = async (accessToken, id, name, address, type, description) => {

    try {
        const response = await axiosClient.put(`/updateLocationsById/${id}`, { name: name, address: address, type: type, description: description }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            id: response.data.id,
            data: response.data,
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};
const deleteLocationsById = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deleteLocationsById/${id}`, {
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
const GetAllLocations = async () => {
    try {
        const response = await axiosClient.get(`/getAllLocations`)
        if (response.data) {
            return {
                data: response.data
            }
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getAllCategoryOfLocation = async () => {
    try {
        const response = await axiosClient.get(`/getAllCategoryOfLocation`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getLocationById = async (id) => {
    try {
        const response = await axiosClient.get(`/getLocationsById/${id}`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
export {
    createNewLocations,
    GetAllLocations,
    deleteLocationsById,
    UpdateLocationsById,
    getAllCategoryOfLocation,
    getLocationById

};