import axiosClient from '../config/axios.config';

const CreateABookingOnlineAll = async (accessToken, user_id, room_id, costume_id, payment_status, booking_time, price_list_id, status, messenger, time_try_customer) => {

    try {
        const response = await axiosClient.post('/createNewBookingDetail',
            {
                user_id: user_id,
                room_id: room_id,
                costume_id: costume_id,
                payment_status: payment_status,
                booking_time: booking_time,
                price_list_id: price_list_id,
                status: status,
                messenger: messenger,
                time_try_customer: time_try_customer,

            }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            id: response.data.id,
            //response: response.data,
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};
const CreateABookingAlbums = async (accessToken, user_id, payment_status, price, booking_time, price_list_id, status, messenger) => {

    try {
        const response = await axiosClient.post('/createNewBookingDetail',
            {
                user_id: user_id,
                payment_status: payment_status,
                price: price,
                booking_time: booking_time,
                price_list_id: price_list_id,
                status: status,
                messenger: messenger,

            }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            //id: response.data.id,
            //response: response.data,
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};

const getAllBookingDetails = async (accessToken) => {
    try {
        const response = await axiosClient.get(`/getAllBookingDetails`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Xử lý dữ liệu trả về từ API
        const processedData = response.data.map((bookingDetail) => {
            // Trích xuất tất cả các trường
            const {
                id,
                booking_time,
                costume_id,
                equipment_id,
                price,
                price_list_id,
                status,
                messenger,
                location,
                locations_id,
                time_try_customer,
                albums_id,
                payment_status,
                room_id,
                user: { email, account: { phone_number } },
            } = bookingDetail;

            return {
                id,
                booking_time,
                costume_id,
                equipment_id,
                price,
                price_list_id,
                status,
                messenger,
                location,
                locations_id,
                time_try_customer,
                albums_id,
                payment_status,
                room_id,
                email,
                phone_number,
            };
        });

        return processedData;
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const getAllBookingDetailsByUserId = async (accessToken, id) => {
    try {
        const response = await axiosClient.get(`/getBookingDetailByUserId/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Xử lý dữ liệu trả về từ API
        const processedData = response.data.map((bookingDetail) => {
            // Trích xuất tất cả các trường
            const {
                id,
                booking_time,
                costume_id,
                equipment_id,
                price,
                price_list_id,
                status,
                messenger,
                location,
                locations_id,
                time_try_customer,
                albums_id,
                payment_status,
                room_id,

            } = bookingDetail;

            return {
                id,
                booking_time,
                costume_id,
                equipment_id,
                price,
                price_list_id,
                status,
                messenger,
                location,
                locations_id,
                time_try_customer,
                albums_id,
                payment_status,
                room_id,

            };
        });
        return processedData;
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};
const updateStatus = async (accessToken, id) => {
    try {
        const response = await axiosClient.put(`/updateBookingDetailById/${id}`, { status: "Xác Nhận" }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            statusCode: response.status,
        };
    } catch (e) {
        return {
            status: e.response.status,
        };
    }
};
const updatePaymentStatus = async (accessToken, id) => {
    try {
        const response = await axiosClient.put(`/updateBookingDetailById/${id}`, { payment_status: "Đã Thanh Toán" }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            statusCode: response.status,
        };
    } catch (e) {
        return {
            status: e.response.status,
        };
    }
};
const updateDate = async (accessToken, id, booking_time, setTime_try_customer) => {
    try {
        const response = await axiosClient.put(`/updateBookingDetailById/${id}`, { booking_time: booking_time, setTime_try_customer: setTime_try_customer }, {
            headers: {

                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            statusCode: response.status,
        };
    } catch (e) {
        return {
            status: e.response.status,
        };
    }
};
const deleteBooking = async (accessToken, id) => {
    try {
        const response = await axiosClient.delete(`/deleteBookingDetailById/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return {
            statusCode: response.status
        }

    } catch (error) {
        console.error('Lỗi khi xóa dịch vụ:', error);
        throw error;
    }
};
const sendMailConfirmBooking = async (accessToken, email, booking_time) => {
    try {
        const response = await axiosClient.post(`/sendMailConfirmBooking`, { email: email, booking_time: booking_time }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return {
            statusCode: response.status
        }

    } catch (error) {
        console.error('Lỗi khi xóa dịch vụ:', error);
        throw error;
    }
};

export {
    CreateABookingOnlineAll,
    CreateABookingAlbums,
    getAllBookingDetails,
    updateStatus,
    updatePaymentStatus,
    updateDate,
    sendMailConfirmBooking,
    deleteBooking,
    getAllBookingDetailsByUserId

};