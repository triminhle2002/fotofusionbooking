import axiosClient from '../config/axios.config';

const CreateNewRole = async (accessToken, name) => {

    try {
        const response = await axiosClient.post('/createRole', { name: name }, {
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
const getAllRole = async (accessToken) => {
    console.log(accessToken);
    try {
        const response = await axiosClient.get(`/getAllRoles`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(response);
        return response.data
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const updateRole = async (accessToken, id, name) => {

    try {
        const response = await axiosClient.put(`/updateAccountByEmail/${id}`, { name: name }, {
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
const deleteRole = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deleteRole/${id}`, {
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
export {
    CreateNewRole,
    getAllRole,
    updateRole,
    deleteRole
};