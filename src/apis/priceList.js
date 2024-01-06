import axiosClient from '../config/axios.config';

const CreateAPriceForAlbums = async (accessToken, name, price,
    number_camera, number_photo, light_equip, location, number_photographer,
    number_assistant_photographer, camera_equipment, description, additional_info) => {

    try {
        const response = await axiosClient.post('/createPriceList',
            {
                // photo_album_id: photo_album_id,
                name: name,
                price: price,
                number_camera: number_camera,
                number_photo: number_photo,
                light_equip: light_equip,
                location: location,
                number_photographer: number_photographer,
                number_assistant_photographer: number_assistant_photographer,
                camera_equipment: camera_equipment,
                description: description,
                additional_info: additional_info
            }, {
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
const updatePriceList = async (accessToken, id, name, price,
    number_camera, number_photo, light_equip, location, number_photographer,
    number_assistant_photographer, camera_equipment, description, additional_info) => {

    try {
        const response = await axiosClient.put(`/updatePriceList/${id}`, {
            //photo_album_id: photo_album_id,
            name: name,
            price: price,
            number_camera: number_camera,
            number_photo: number_photo,
            light_equip: light_equip,
            location: location,
            number_photographer: number_photographer,
            number_assistant_photographer: number_assistant_photographer,
            camera_equipment: camera_equipment,
            description: description,
            additional_info: additional_info
        }, {
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
const deletePriceList = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deletePriceList/${id}`, {
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
const getAllPriceList = async () => {
    try {
        const response = await axiosClient.get(`/getAllPriceLists`)
        console.log(response);
        return response.data
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const getPriceListByAlbumsid = async ({ albumsid }) => {
    try {
        console.log(albumsid);
        const response = await axiosClient.get(`/getPriceListbyAlbumsid/${albumsid}`)

        //console.log(response.data);

        return response.data;

    } catch (error) {
        console.error('Lỗi khi lấy danh sách giá của albums:', error);
        throw error;
    }
};
const getPriceListtById = async (id) => {
    try {
        const response = await axiosClient.get(`/getPriceListById/${id}`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy thông tin bảng giá:', error);
        throw error;
    }
};
export {
    CreateAPriceForAlbums,
    getAllPriceList,
    getPriceListByAlbumsid,
    deletePriceList,
    updatePriceList,
    getPriceListtById
};