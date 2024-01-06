import axiosClient from '../config/axios.config';

const addEquipment = async (accessToken, name, category, price, quantity) => {
    try {
        const response = await axiosClient.post('/createNewEquipment', { name: name, category: category, price: price, quantity: quantity }, {
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
const updateEquipment = async (accessToken, id, name, category, price, quantity) => {
    try {
        const response = await axiosClient.put(`/updateEquipmentById/${id}`, { name: name, category: category, price: price, quantity: quantity }, {
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
const deleteEquipment = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deleteEquipmentById/${id}`, {
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
const getEquipment = async () => {
    try {
        const response = await axiosClient.get(`/getAllEquipment`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getAllCategoryOfEquipment = async () => {
    try {
        const response = await axiosClient.get(`/getAllCategoryOfEquipment`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getEquipmentById = async (id) => {
    try {
        const response = await axiosClient.get(`/getEquipmentById/${id}`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
export {
    addEquipment,
    getEquipment,
    deleteEquipment,
    updateEquipment,
    getAllCategoryOfEquipment,
    getEquipmentById
};