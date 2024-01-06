import axiosClient from '../config/axios.config';

const getAllUser = async (accessToken) => {
    try {
        const response = await axiosClient.get(`/getAllUsers`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const getAllUsersIsCustomer = async (accessToken) => {
    try {
        const response = await axiosClient.get(`/getAllUsersIsCustomer`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
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
const updateGender = async (accessToken, id, gender) => {

    try {
        const response = await axiosClient.put(`/updateUser/${id}`, { gender: gender }, {
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
const updatePhoneNumber = async (accessToken, email, phone_number) => {

    try {
        const response = await axiosClient.put(`/updateAccountByEmail/${email}`, { phone_number: phone_number }, {
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
const updateImformationIncludeAvatar = async (accessToken, id, name, avatar_url) => {

    try {
        const response = await axiosClient.put(`/updateUser/${id}`, { name: name, avatar_url: avatar_url }, {
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
const updateName = async (accessToken, id, name) => {

    try {
        const response = await axiosClient.put(`/updateUser/${id}`, { name: name }, {
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
const deleteUserByEmail = async (accessToken, email) => {
    try {
        const response = await axiosClient.delete(`/deleteUserByEmail/${email}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            statusCode: response.status
        }
    } catch (error) {
        console.error('Lỗi khi xóa tài khoản :', error);
        throw error;
    }
};
export {
    getAllUser,
    deleteUserByEmail,
    getAllUsersIsCustomer,
    updateAddress,
    updateImformationIncludeAvatar,
    updatePhoneNumber,
    updateGender,
    updateName
};