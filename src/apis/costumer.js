import axiosClient from '../config/axios.config';

const CreateACostumer = async (accessToken, name, category, price, quantity, rental_start_date) => {

    try {
        const response = await axiosClient.post('/createNewCostume', { name: name, category: category, price: price, quantity: quantity, rental_start_date: rental_start_date }, {
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

const updateCostumer = async (accessToken, id, name, category, price, quantity, rental_start_date) => {

    try {
        const response = await axiosClient.put(`/updateCostumeById/${id}`, { name: name, category: category, price: price, quantity: quantity, rental_start_date: rental_start_date }, {
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

const deleteCostumer = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deleteCostumeById/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(response.status);
        return {
            statusCode: response.status
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};


const getAllCostumer = async () => {
    try {
        const response = await axiosClient.get(`/getAllCostumes`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getAllCostumerById = async (id) => {
    try {
        const response = await axiosClient.get(`/getCostumeById/${id}`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getAllCategoryOfCostumes = async () => {
    try {
        const response = await axiosClient.get(`/getAllCategoryOfCostumes`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};

export {
    CreateACostumer,
    getAllCostumer,
    updateCostumer,
    deleteCostumer,
    getAllCategoryOfCostumes,
    getAllCostumerById

};