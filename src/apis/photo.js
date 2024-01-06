
import axiosClient from '../config/axios.config';

const getListPhotoByAlbumsId = async ({ albumsid }) => {
    try {
        const response = await axiosClient.get(`/getAllPhotosByAlbumsId/${albumsid}`)

        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getListPhotoByBlogId = async ({ blog_id }) => {
    console.log(blog_id);
    try {
        const response = await axiosClient.get(`/getAllPhotosByBlogId/${blog_id}`)

        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.

        return {
            data: response.data,
            urlphoto: response.url_photo
        }

    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getListPhotoByRoomid = async ({ room_id }) => {

    try {
        const response = await axiosClient.get(`/getAllPhotosByRoomId/${room_id}`)
        ///console.log(response);

        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getAllPhotosByLocationId = async ({ locations_id }) => {

    try {
        const response = await axiosClient.get(`/getAllPhotosByLocationId/${locations_id}`)
        ///console.log(response);

        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getListPhotoByCostumerId = async ({ costume_id }) => {

    try {
        const response = await axiosClient.get(`/getAllPhotosByCostumerId/${costume_id}`)
        // console.log(response);

        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getListPhotoByEquipmentId = async ({ equip_id }) => {
    console.log(equip_id);
    try {
        const response = await axiosClient.get(`/getAllPhotosByEquipmentId/${equip_id}`)
        console.log(response.data);

        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getAllPhotosByUserId = async ({ user_id }) => {
    console.log(user_id);
    try {
        const response = await axiosClient.get(`/getAllPhotosByUserId/${user_id}`)
        console.log(response.data);

        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getAllPhotosByEventId = async ({ event_id }) => {
    console.log(event_id);
    try {
        const response = await axiosClient.get(`/getAllPhotosByEvenId/${event_id}`)
        console.log(response.data);

        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getAllPhotosByProductId = async () => {

    try {
        const response = await axiosClient.get(`/getAllPhotosByProductId/`)
        console.log(response.data);

        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
        if (response) {
            const photoData = response.data.map(photo => ({
                ...photo.product,
                url_photo: photo.url_photo,
            }));

            return {
                data: response.data,
                photoData: photoData,
            };
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};
const getAllPhoto = async ({ accessToken }) => {
    try {
        const responseRoles = await axiosClient.get(`/getAllPhotos`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        },);
        console.log(responseRoles);
        return {
            id: responseRoles.data.id,
            img_name: responseRoles.data.img_name,
            url_photo: responseRoles.data.url_photo,
            albums_id: responseRoles.data.albums_id,

        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};


const CreateAPhotoForCostumer = async (accessToken, img_name, url_photo, costume_id) => {

    try {
        const response = await axiosClient.post('/createPhoto', { img_name: img_name, url_photo: url_photo, costume_id: costume_id }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
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
const updateRoomPhoto = async (accessToken, img_name, url_photo, room_id) => {

    try {
        const response = await axiosClient.post('/createPhoto', { img_name: img_name, url_photo: url_photo, room_id: room_id }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
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
const updateLocation = async (accessToken, img_name, url_photo, locations_id) => {

    try {
        const response = await axiosClient.post('/createPhoto', { img_name: img_name, url_photo: url_photo, locations_id: locations_id }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
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
const updateProductPhoto = async (accessToken, img_name, url_photo, prod_id) => {

    try {
        const response = await axiosClient.post('/createPhoto', { img_name: img_name, url_photo: url_photo, prod_id: prod_id }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
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
const updateEquipmentPhoto = async (accessToken, img_name, url_photo, equip_id) => {

    try {
        const response = await axiosClient.post('/createPhoto', { img_name: img_name, url_photo: url_photo, equip_id: equip_id }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
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
const updateBlogPhoto = async (accessToken, img_name, url_photo, blog_id) => {

    try {
        const response = await axiosClient.post('/createPhoto', { img_name: img_name, url_photo: url_photo, blog_id: blog_id }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
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
const updateEventPhoto = async (accessToken, img_name, url_photo, event_id) => {

    try {
        const response = await axiosClient.post('/createPhoto', { img_name: img_name, url_photo: url_photo, event_id: event_id }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
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
const updateUsertPhoto = async (accessToken, img_name, url_photo, user_id) => {

    try {
        const response = await axiosClient.post('/createPhoto', { img_name: img_name, url_photo: url_photo, user_id: user_id }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
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
const updateAlbumsPhoto = async (accessToken, img_name, url_photo, albums_id) => {

    try {
        const response = await axiosClient.post('/createPhoto', { img_name: img_name, url_photo: url_photo, albums_id: albums_id }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
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


const deletePhotoByCostumerId = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletephotobycostumerid/${id}`, {
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
const deletePhotoByEquipmentId = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletephotobyequipmentid/${id}`, {
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
const deletePhotoByRoomId = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletePhotoByRoomId/${id}`, {
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
const deletePhotoByLocationId = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletePhotoByLocationId/${id}`, {
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
const deletePhotoByBlogId = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletePhotoByBlogId/${id}`, {
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
const deletePhotoByUserId = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletePhotoByUserId/${id}`, {
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
const deletePhotoByAlbumId = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletePhotoByAlbumId/${id}`, {
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

const deletePhotoByEventId = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletePhotoByEventId/${id}`, {
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
const deletePhotoByProductId = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletePhotoByProductId/${id}`, {
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
    getListPhotoByAlbumsId, deletePhotoByLocationId,
    getAllPhoto, updateLocation, getAllPhotosByLocationId,
    CreateAPhotoForCostumer,
    updateRoomPhoto, updateAlbumsPhoto, updateBlogPhoto, updateEventPhoto,
    updateUsertPhoto, getAllPhotosByEventId, getAllPhotosByProductId, getAllPhotosByUserId,
    updateProductPhoto,
    getListPhotoByBlogId,
    getListPhotoByRoomid,
    getListPhotoByCostumerId,
    updateEquipmentPhoto,
    getListPhotoByEquipmentId,
    deletePhotoByCostumerId,
    deletePhotoByAlbumId,
    deletePhotoByBlogId,
    deletePhotoByEquipmentId,
    deletePhotoByEventId,
    deletePhotoByProductId,
    deletePhotoByRoomId,
    deletePhotoByUserId
};
