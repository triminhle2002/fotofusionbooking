import axiosClient from '../config/axios.config';

const getListVideo = async () => {
    try {
        const response = await axiosClient.get(`/getAllVideos`)

        // Trích xuất dữ liệu từ response và trả về chỉ dữ liệu.
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách video:', error);
        throw error;
    }
};
const getVideoById = async (accessToken, id) => {
    try {
        const response = await axiosClient.get(`/getVideoById/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data

    } catch (error) {
        console.error('Lỗi khi lấy video:', error);
        throw error;
    }
};
export {
    getListVideo, getVideoById
}