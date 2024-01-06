import axiosClient from '../config/axios.config';

const CreateABlogPost = async (accessToken, title, content, author, date) => {

    try {
        const response = await axiosClient.post('/createNewBlogPost',
            {
                title: title,
                content: content,
                author: author,
                date: date

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
const updateBlogPost = async (accessToken, id, title, content, author, date) => {

    try {
        const response = await axiosClient.put(`/updateBlogPostById/${id}`, { title: title, content: content, author: author, date: date }, {
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
const deleteBlogPost = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deleteBlogPostById/${id}`, {
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
const getAllBlogPost = async () => {
    try {
        const response = await axiosClient.get(`/getAllBlogPosts`);
        //console.log(response);
        return response.data;
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
export {
    CreateABlogPost,
    getAllBlogPost,
    updateBlogPost,
    deleteBlogPost
};