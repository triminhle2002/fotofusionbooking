import axiosClient from '../config/axios.config';

export const creatPayment = async (amount, email, payment_type, id, img_url_old, request) => {
    console.log(id);
    console.log(img_url_old);
    console.log(request);
    console.log(amount);
    console.log(email);
    console.log(payment_type);

    try {
        const response = await axiosClient.post('/creatPayment', {

            amount: amount,
            email: email,
            payment_type: payment_type,

            id: id, // dùng cho booking
            url: img_url_old, // dùng cho request
            request: request,// dùng cho request
            bankCode: ''
        });

        //console.log(response);

        // Xử lý phản hồi thành công ở đây
        const redirectUrl = response.data.redirectUrl;
        console.log("Redirecting to:", redirectUrl);
        window.location.replace(redirectUrl);

    } catch (error) {
        console.error('Error:', error);

        // Handle the error if needed
        return {
            error,
            statusCode: error.status,
        };
    }

};