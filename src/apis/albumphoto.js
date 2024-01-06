import axiosClient from '../config/axios.config';


const getAlbumsPhoto = async () => {
    try {
        const response = await axiosClient.get(`/getAllPhotoAlbums`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};

const getAlbumsPhotoById = async (id) => {
    try {
        const response = await axiosClient.get(`/getPhotoAlbumById/${id}`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy albums:', error);
        throw error;
    }
};
const getPhotoAlbumByUserId = async (accessToken, id) => {
    try {
        const response = await axiosClient.get(`/getPhotoAlbumByUserId/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (response) {
            return {
                statusCode: response.status,
                data: response.data
            }
        }
    } catch (error) {
        console.error('Lỗi khi lấy albums:', error);
        throw error;
    }
};
const createAlbumsPhotoForCustomer = async (accessToken, name, user_id, cover_photo, sum_photo, category, location, date_create) => {

    try {
        const response = await axiosClient.post('/createPhotoAlbum', { name: name, user_id: user_id, cover_photo: cover_photo, sum_photo: sum_photo, category: category, location: location, date_create: date_create }, {
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

const updateAlbums = async (accessToken, id, name, cover_photo, sum_photo, category, location, date_create) => {

    try {
        const response = await axiosClient.put(`/updatePhotoAlbum/${id}`, { name: name, cover_photo: cover_photo, sum_photo: sum_photo, category: category, location: location, date_create: date_create }, {
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
const deleteAlbums = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletePhotoAlbum/${id}`, {
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
    getAlbumsPhoto,
    createAlbumsPhotoForCustomer,
    updateAlbums,
    deleteAlbums,
    getAlbumsPhotoById,
    getPhotoAlbumByUserId
}