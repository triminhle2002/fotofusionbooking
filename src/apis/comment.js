import axiosClient from '../config/axios.config';

const CreateACommentForBlog = async (accessToken, user_id, blog_post_id, content) => {

    try {
        const response = await axiosClient.post('/createNewComment', { user_id: user_id, blog_post_id: blog_post_id, content: content }, {
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

const deleteComment = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deleteCommentById/${id}`, {
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


const getAllCommentByBlogPostID = async (id) => {
    try {
        const response = await axiosClient.get(`/getAllCommentsByBlogId/${id}`)

        const processedData = response.data.map((commentDetail) => {
            // Trích xuất tất cả các trường
            const {
                id,
                blog_post_id,
                content,
                phoab_id,
                prod_id,
                user_id,
                user: { avatar_url, name },
            } = commentDetail;

            return {
                id,
                blog_post_id,
                content,
                phoab_id,
                prod_id,
                user_id,
                avatar_url,
                name
            };
        });

        return processedData;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        throw error;
    }
};


export {
    CreateACommentForBlog,
    getAllCommentByBlogPostID,
    deleteComment
    // deleteCostumer,
    //getAllCategoryOfCostumes,
    // getAllCostumerById

};