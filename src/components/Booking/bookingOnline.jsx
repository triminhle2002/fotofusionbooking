import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authProvider';
import { Button } from 'flowbite-react'
import RoomStudio from '../helples/Room'
import MakeUp from '../helples/MakeUp'
import Costumer from '../helples/Costumer'
import Location from '../helples/Location'
import { CreateABookingOnlineAll } from '../../apis/booking'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { HiEye, HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';

const BookingOnline = () => {
    const notify = (message, type) => {
        const toastType = type === 'success' ? toast.success : toast.error;
        return toastType(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const { auth } = useContext(AuthContext);
    const [selectedMakeUp, setSelectMakeUp] = useState(null);
    const [selectedCostumer, setSelectCostumer] = useState(null);
    const [selectedRoom, setSelectRoom] = useState(null);
    const [dateTryCostumer, setDateTryCostumer] = useState(null);
    const [display, setDisplay] = useState(null)
    const [displayDateTryCos, setDisplayDateTryCos] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();

    const [dateTaking, setdateTaking] = useState(null);
    const [message, setMessage] = useState(null);


    useEffect(() => {
        // window.scrollTo(0, 0);
        if (selectedMakeUp && selectedRoom && selectedCostumer) {
            console.log(selectedMakeUp.id);
            console.log(selectedRoom.id);
            console.log(selectedCostumer.id);
        }
        console.log(dateTryCostumer);

    }, [selectedMakeUp, selectedRoom, selectedCostumer, dateTryCostumer])
    useEffect(() => {
        if (location.state?.toastMessage !== '') {
            notify(location.state?.toastMessage, 'success');
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);
    useEffect(() => {
        if (auth && Object.keys(auth).length <= 0) {

            navigate("/login", { state: { toastMessage: "Bạn Phải Đăng Nhập Để Sử Dụng Dịch Vụ Này" } })
        }
    }, [auth])
    const handleBooking = async () => {
        // Kiểm tra các trường bắt buộc đã được chọn
        if (!dateTaking) {
            notify('Vui lòng điền thông tin ngày bạn muốn chụp');
            return;
        } else if (selectedCostumer) {
            if (!dateTryCostumer) {
                notify('Vui lòng điền thông tin ngày bạn thử trang phục');
                return;
            }
            // Kiểm tra ngày thử trang phục phải trước ngày chụp 1 ngày
            const dateTryCostumerObject = new Date(dateTryCostumer);
            const dateTakingObject = new Date(dateTaking);
            const oneDayInMillis = 24 * 60 * 60 * 1000; // 1 ngày tính bằng mili giây
            const differenceInDays = Math.floor((dateTakingObject - dateTryCostumerObject) / oneDayInMillis);

            if (differenceInDays < 1) {
                notify('Ngày thử trang phục phải trước ngày chụp ít nhất 1 ngày');
                return;
            }
            const differenceFromNow = Math.floor((dateTakingObject - new Date()) / oneDayInMillis);

            if (differenceFromNow < 3) {
                notify('Ngày chụp phải sau ít nhất 3 ngày kể từ ngày đặt lịch');
                return;
            }
        }

        const result = await CreateABookingOnlineAll(
            auth.accessToken,
            auth.id,
            selectedRoom ? selectedRoom.id : null,
            selectedCostumer ? selectedCostumer.id : null,
            'Chưa Thanh Toán',
            dateTaking,
            selectedMakeUp ? selectedMakeUp.id : null,
            'Chưa Xác Nhận',
            message,
            dateTryCostumer
        );

        // Xử lý kết quả, ví dụ:
        if (result.error) {
            notify(`Đặt lịch không thành công. Lỗi: ${result.error.message}`);
        } else {
            notify('Đặt lịch thành công! Hãy để ý điện thoại và email chúng tôi sẽ liên lạc sớm nhất có thể', 'success');
            // Đặt lại trạng thái nếu cần
            setSelectMakeUp(null);
            setSelectCostumer(null);
            setSelectRoom(null);
            setDateTryCostumer(null);
            setdateTaking(null);
            setMessage('');
            setDisplay(null)
        }
    };
    const Booking = () => {
        if (auth && Object.keys(auth).length > 0) {
            handleBooking()
        } else {
            notify("Bạn Phải Đăng Nhập Để Sử Dụng Dịch Vụ Này")
        }
    }

    useEffect(() => {

    }, [selectedMakeUp, selectedRoom, selectedCostumer, dateTryCostumer]);


    return (
        <>
            <ToastContainer />
            <div className='w-full bg-black'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgbooking.png?alt=media&token=ab70de9e-1783-4f94-a4bc-bf2c870f0fcf" alt="" />
                <div className='flex justify-center items-center mt-[-26%]'>
                    <div className='w-full p-4'>
                        <div class="w-[40%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden max-sm:w-full max-sm:text-xs  max-md:w-full max-md:text-xs max-xl:w-[90%] max-xl:text-lg">
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

                        <div className='p-4 border rounded shadow-sm m-2 bg-white'>
                            <div className='w-full flex items-center justify-center'>
                                <div class="w-full text-2xl py-4 px-6 bg-btnprimary text-white text-center font-bold uppercase border rounded-xl">
                                    THÔNG TIN ĐẶT LỊCH
                                </div>
                            </div>

                            <div className='w-full mt-6'>
                                <div className='flex items-start justify-center max-sm:grid max-sm:grid-cols-1 max-md:grid max-md:grid-cols-2'>
                                    <div class="mb-4 w-[23%] max-sm:w-full max-md:w-full">
                                        <label class="block text-gray-700 font-bold mb-2" for="date">
                                            Ngày Bạn Muốn Chụp *
                                        </label>
                                        <input
                                            className="input input-bordered input-warning w-full max-w-xs"
                                            id="date" type="date" placeholder="Select a date" onChange={(event) => setdateTaking(event.target.value)} />
                                    </div>
                                    <div class="mb-4 w-[23%] max-sm:w-full max-md:w-full">
                                        <label class="block text-gray-700 font-bold mb-2" for="service">
                                            Thể Loại *
                                        </label>
                                        <select className="select select-warning w-full max-w-xs" onChange={(event) => setDisplay(event.target.value)}>
                                            <option disabled selected>Chọn thể loại bạn muốn chụp</option>
                                            <option value="studio">Chụp tại Studio :
                                                <p>
                                                    {(selectedRoom !== null) && selectedRoom.name}
                                                </p></option>
                                            <option value="ngoaiCanh">Chụp Ngoại Cảnh</option>
                                        </select>
                                    </div>
                                    <div className='w-[23%] max-sm:w-full max-md:w-full'>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="phone">
                                                Trang Phục *
                                            </label>
                                            <select className="select select-warning w-full max-w-xs" onChange={(event) => {
                                                setDisplay(event.target.value)
                                                setDisplayDateTryCos(true)
                                            }
                                            }>
                                                <option disabled selected>Chọn trang phục</option>
                                                <option value="thuetrangphuc">Thuê <p>
                                                    {(selectedCostumer !== null) && selectedCostumer.name}
                                                </p></option>
                                                <option value="mua">Mua</option>
                                                <option value="tuchuanbi">Tự chuẩn bị</option>
                                            </select>
                                        </div>
                                        {(displayDateTryCos) && (
                                            <div className='flex items-center justify-start max-sm:w-full max-sm:grid max-sm:grid-cols-1'>
                                                <div className="mb-4 w-2/3">
                                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                                                        Ngày và Thời Gian Thử *
                                                    </label>
                                                    <input
                                                        className="input input-bordered input-warning w-full max-w-xs"
                                                        id="date" type="datetime-local" placeholder="Select a date" onChange={(event) => setDateTryCostumer(event.target.value)} />
                                                </div>

                                            </div>
                                        )}
                                    </div>

                                    <div class="mb-4 w-[23%] max-sm:w-full max-md:w-full">
                                        <label class="block text-gray-700 font-bold mb-2" for="phone">
                                            MakUp *
                                        </label>
                                        <select className="select select-warning w-full max-w-xs" onChange={(event) => setDisplay(event.target.value)}>
                                            <option disabled selected>Chọn make-Up</option>
                                            <option value="thuemakeup">Thuê :  <p>
                                                {(selectedMakeUp !== null) && selectedMakeUp.name}
                                            </p></option>
                                            <option value="tuMakup">Tự MakeUp</option>
                                        </select>

                                    </div>
                                </div>
                                <div className='w-full'>
                                    {display === "studio" && <RoomStudio onSelectRoom={setSelectRoom} />}
                                    {display === "ngoaiCanh" && <Location onSelectRoom={setSelectRoom} />}
                                    {(display === 'thuetrangphuc' || display === 'mua') && <Costumer onSelectCostumer={setSelectCostumer} />}
                                    {display === "thuemakeup" && <MakeUp onSelectMakeUp={setSelectMakeUp} />}
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 font-bold mb-2" for="message">
                                    Message
                                </label>
                                <textarea
                                    className="textarea textarea-warning w-full"
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
        </>

    );
};

export default BookingOnline;