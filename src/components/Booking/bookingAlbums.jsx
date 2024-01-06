import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authProvider';
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom';


import { CreateABookingAlbums } from '../../apis/booking'
import * as VNpayApi from '../../apis/vnpay'

const BookingAlbums = ({ priceList }) => {

    const { auth } = useContext(AuthContext);
    const [dateTaking, setdateTaking] = useState(null);
    const [message, setMessage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(''); // Biến state cho phương thức thanh toán

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value); // Cập nhật giá trị biến state paymentMethod khi thay đổi
    };

    useEffect(() => {
        setMessage(null)
        setdateTaking(null)
        console.log(priceList);
    }, [priceList])

    const handleBooking = async () => {
        // Kiểm tra các trường bắt buộc đã được chọn
        if (!dateTaking) {
            alert('Vui lòng điền thông tin ngày bạn muốn chụp');
            window.scrollTo(0, 0);
            return;
        }
        const dateTakingObject = new Date(dateTaking);
        const oneDayInMillis = 24 * 60 * 60 * 1000;
        const differenceFromNow = Math.floor((dateTakingObject - new Date()) / oneDayInMillis);
        if (differenceFromNow < 3) {
            alert('Ngày chụp phải sau ít nhất 3 ngày kể từ ngày đặt lịch');
            return;
        }
        if (paymentMethod === '') {
            alert('Bạn chưa chọn hình thức thanh toán ')
            return;
        }
        const result = await CreateABookingAlbums(
            auth.accessToken,
            auth.id,
            'Chưa Thanh Toán',
            priceList.price,
            dateTaking,
            priceList.id,
            'Chưa Xác Nhận',
            message,
        );
        if (result.statusCode === 201) {
            if (paymentMethod === 'VNPAY') {
                const vnpay = await VNpayApi.creatPayment(priceList.price, auth.email, 3, result.id, "", "")
            }
            else {
                alert('Đặt lịch thành công! Hãy để ý điện thoại và email chúng tôi sẽ liên lạc sớm nhất có thể', 'success');
                setdateTaking(null);
                setMessage('')
            }
        } else {
            alert(`Đặt lịch không thành công. Lỗi: ${result.error.message}`);

        }
    };
    const Booking = () => {
        handleBooking()
    }


    return (
        <>

            <div className='w-full bg-black'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgbooking.png?alt=media&token=ab70de9e-1783-4f94-a4bc-bf2c870f0fcf" alt="" />
                <div className='flex justify-center items-center mt-[-26%]'>
                    <div className='w-full p-4'>
                        <div className='flex items-center justify-center'>

                            <div class="w-[90%] m-2 p-4 bg-white shadow-lg rounded-lg overflow-hidden max-sm:w-full max-sm:text-xs  max-md:w-full max-md:text-xs max-xl:w-[90%] max-xl:text-lg">
                                <div class="text-2xl py-4 px-6 bg-btnprimary text-white text-center font-bold uppercase">
                                    ĐẶT LỊCH TRỰC TUYẾN
                                </div>
                                <div class="py-4 px-6 ">
                                    <div className='border p-4 rounded shadow-sm m-2 max-sm:w-full'>
                                        <div className='flex items-center justify-center'>
                                            <label class="block text-gray-700 font-bold mb-2 text-xl" for="name">
                                                Thông Tin Cá Nhân
                                            </label>
                                        </div>
                                        <div className='flex items-center justify-between  max-sm:text-xs'>
                                            <div class="mb-4 w-[48%]">
                                                <label class="block text-gray-700 font-bold mb-2" for="name">
                                                    Tên Khách Hàng
                                                </label>
                                                <input
                                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-black font-semibold  max-sm:text-xs leading-tight focus:outline-none focus:shadow-outline"
                                                    id="name" type="text" value={auth.fullName} readOnly />
                                            </div>
                                            <div class="mb-4 w-[48%]">
                                                <label class="block text-gray-700 font-bold mb-2" for="email">
                                                    Số Điện Thoại
                                                </label>
                                                <input
                                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-black max-sm:text-xs font-semibold leading-tight focus:outline-none focus:shadow-outline"
                                                    id="phoneNumber" type="number" value={auth.phone} readOnly />
                                            </div>
                                        </div>
                                        <div class="mb-4 max-sm:text-xs">
                                            <label class="block text-gray-700 font-bold mb-2" for="email">
                                                Email
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 max-sm:text-xs text-black font-semibold leading-tight focus:outline-none focus:shadow-outline"
                                                id="email" type="email" value={auth.email} readOnly />
                                        </div>
                                        <div className='flex items-end justify-end'>
                                            <Link to="/profile">
                                                <Button className='bg-green-400 right-0'>Chỉnh sửa</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-4 border rounded shadow-sm m-2 bg-white'>
                            <div className='w-full flex items-center justify-center'>
                                <div class="w-full text-2xl py-4 px-6 bg-btnprimary text-white text-center font-bold uppercase border rounded-xl">
                                    THÔNG TIN ĐẶT LỊCH
                                </div>
                            </div>

                            <div className='w-full mt-6'>
                                <div className='flex items-start justify-between max-sm:grid max-sm:grid-cols-1 max-md:grid max-md:grid-cols-2'>
                                    <div class="mb-4 w-[30%] max-sm:w-full max-md:w-full">
                                        <label class="block text-gray-700 font-bold mb-2" for="date">
                                            Ngày Bạn Muốn Chụp *
                                        </label>
                                        <input
                                            className="input input-bordered input-warning w-full max-w-xs"
                                            id="date" type="date" placeholder="Select a date" onChange={(event) => setdateTaking(event.target.value)} />
                                    </div>
                                    <div class="mb-4 w-[30%] max-sm:w-full max-md:w-full">
                                        <label class="block text-gray-700 font-bold mb-2" for="date">
                                            Giá
                                        </label>
                                        <input
                                            className="input input-bordered input-warning w-full max-w-xs cursor-none text-red-500"
                                            id="price" type="text" value={priceList?.price || ''} readOnly />
                                    </div>
                                    <div class="mb-4 w-[30%] max-sm:w-full max-md:w-full">
                                        <label class="block text-gray-700 font-bold mb-2" for="date">
                                            Tên Gói
                                        </label>
                                        <input
                                            className="input input-bordered input-warning w-full max-w-xs cursor-none text-red-500"
                                            id="name" type="text" value={priceList?.name || ''} readOnly />
                                    </div>
                                </div>
                                <div className="mb-4 mt-5">
                                    <h3 className="text-green-500 text-xl font-medium mb-6">Phương Thức Thanh Toán</h3>
                                    <select className="select select-warning w-full " onChange={handlePaymentMethodChange}>
                                        <option disabled selected>Lựa chọn hình thức thanh toán</option>
                                        <option value="FOTOFUSHION">Thanh Toán Tại Studio FotoFushion</option>
                                        <option value="VNPAY">Thanh Toán Online VNPay</option>
                                    </select>
                                </div>
                                <div class="mb-4">
                                    <label class="text-green-500 text-xl font-medium mb-4" for="message">
                                        Lời Nhắn Cho Studio
                                    </label>
                                    <textarea
                                        className="textarea textarea-warning w-full mt-6"
                                        id="message" rows="4" placeholder="Nhập yêu cầu hoặc ý tưởng của bạn về buổi chụp bạn muốn" onChange={(event) => setMessage(event.target.value)} >

                                    </textarea>
                                </div>
                                <div class="flex items-center justify-center mb-4">
                                    <button
                                        className="btn  bg-btnprimary text-white text-center font-bold uppercase border rounded-xl shadow-lg"
                                        type="submit" onClick={() => Booking()}>
                                        BooKing
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default BookingAlbums;