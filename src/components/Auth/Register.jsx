import { icons } from "../../utils/icons";
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from 'react';
import * as authApis from '../../apis/auth'
import Countdown from '../helples/Countdown';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authProvider';
import { Carousel } from 'flowbite-react';
import { Button, Modal } from 'flowbite-react';

const Register = () => {
    const { setAuth } = useContext(AuthContext);
    const [hiddenPass, setHiddenPass] = useState(true);
    const [reHiddenPass, setReHiddenPass] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isCountdownActive, setIsCountdownActive] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const [otp, setOtp] = useState('');
    const [confirm, setConfirm] = useState(false);

    const navigate = useNavigate();

    const handleTimeout = () => {
        setIsCountdownActive(false);
        // Thực hiện các hành động khi countdown hết giờ, ví dụ: gửi lại mã OTP
    };

    const notify = (message, type) => {
        const toastType = type === "success" ? toast.success : toast.error
        return toastType(message, {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    }

    const replaceEmail = (email) => {
        const username = email
            .split('@')[0]
            .toLowerCase()
            .replace(/[^a-z0-9.]/gi, '');
        return email.replace(/^[^@]+/, username);
    };
    const handlePhoneNumberChange = (e) => {
        const inputValue = e.target.value;
        const sanitizedInput = inputValue.replace(/\D/g, '');
        const limitedInput = sanitizedInput.slice(0, 10);
        setPhoneNumber(limitedInput);
    };

    useEffect(() => {
        if (submit) {
            const fetchRegister = async () => {
                const register = await authApis.register(email, password, phoneNumber);
                if (register.statusCode === 201) {
                    notify("Mã OTP đã được gửi đến Gmail của bạn", 'success')
                    setOpenModal(true)
                } else {
                    notify("Gmail đã được sử dụng");
                    setLoading(false);
                    setSubmit(false);
                }
            };
            fetchRegister();
        }
    }, [email, password, phoneNumber, setAuth, submit]);



    const handleCheckInput = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        const isEmailValid = emailRegex.test(email);
        if (isEmailValid && email.endsWith('@gmail.com')) {
            if (rePassword === password) {
                setLoading(true);
                setSubmit(true);
            } else {
                notify('Mật khẩu nhập lại không khớp');
                setSubmit(false);
            }
        } else {
            notify('Email phải bao gồm đuôi "@gmail.com"');
            setSubmit(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCheckInput();
    };
    const handleConfirm = async (e) => {
        try {
            const confirmResponse = await authApis.confirmOtp(email, otp);
            if (confirmResponse.statusCode === 200) {
                setLoading(false);
                setOpenModal(false)
                navigate('/login', { state: { toastMessage: "Bạn đã đăng kí tài khoản thành công" } })
            } else {
                notify("Mã OTP không phù hợp");
                setLoading(false);
                //setSubmit(false);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error("Error in handleConfirm:", error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="h-screen flex items-center bg-gradient-to-r from-[#444444] to-[#000000]">
                <div className="bg-[#2d2e2e]  w-full sm:w-[90%] md:w-[80%] lg:w-[75%] lg:grid lg:grid-cols-10 shadow-xl mx-auto rounded-[20px] pb-4 lg:pb-0">

                    <div className="text-center lg:col-span-4">
                        <h1 className="text-white text-3xl font-bold py-6">Đăng Kí</h1>
                        <div className="w-[70%] m-auto text-white">
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                <div className="flex flex-col mb-2">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Địa Chỉ Email
                                    </label>
                                    <input
                                        id="emailInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg text-black"
                                        required
                                        type="email"
                                        autoComplete="email"
                                        placeholder="youraccount@gmail.com"
                                        onChange={(event) => setEmail(replaceEmail(event.target.value))}
                                        value={email}
                                    />
                                </div>
                                <div className="flex flex-col mb-2">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Số điện thoại
                                    </label>
                                    <input
                                        className="text-gray-500 px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        type="text"
                                        placeholder="Số điện thoại của bạn"
                                        onChange={handlePhoneNumberChange}
                                        value={phoneNumber}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-2">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Mật Khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="text-gray-500 w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenPass ? 'password' : 'text'}
                                            placeholder="Mật khẩu của bạn"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                        />
                                        {hiddenPass ? (
                                            <span onClick={setHiddenPass}
                                                className="absolute top-5 right-6">
                                                <icons.BsEyeSlashFill />
                                            </span>
                                        ) : (
                                            <span onClick={setHiddenPass}
                                                className="absolute top-5 right-6">
                                                <icons.AiOutlineEye />
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Xác Nhận Mật Khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="text-gray-500 w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={reHiddenPass ? 'password' : 'text'}
                                            required
                                            placeholder="Nhập lại mật khẩu của bạn"
                                            onChange={(e) => setRePassword(e.target.value)}
                                            value={rePassword}
                                        />
                                        {reHiddenPass ? (
                                            <span onClick={setReHiddenPass}
                                                className="absolute top-5 right-6">
                                                <icons.BsEyeSlashFill />
                                            </span>
                                        ) : (
                                            <span onClick={setReHiddenPass}
                                                className="absolute top-5 right-6">
                                                <icons.AiOutlineEye />
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button className="py-2 bg-btnprimary w-full mb-3 rounded-lg text-xl font-bold text-white opacity-100 active:opacity-80">
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Đang tải....</span>
                                        </div>
                                    ) : (
                                        <span>Đăng Ký</span>
                                    )}
                                </button>
                            </form>

                            <div className="mt-2 mb-9">
                                <p className="">
                                    Đã có tài khoản?
                                    <Link to="/login" className="text-lg text-btnprimary ml-2">
                                        Đăng nhập
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block h-full w-full col-span-6 bg-black">
                        <div className="h-full w-full object-cover lg:rounded-r-[20px] ">
                            <Carousel slideInterval={2000}>
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide-regis%2F409545090_1105994830843230_2157843334834832738_n.jpg?alt=media&token=c6f0af1d-c9d3-4170-97c7-7ae9d6a4b9cc" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide-regis%2F409548079_2109107996105184_6936437252922352272_n.jpg?alt=media&token=54094487-e973-434f-a685-e65b4c133332" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide-regis%2F409554895_24360487113597594_3118450683455908892_n.jpg?alt=media&token=091f7f9c-6a1b-4235-962b-3c12d4b82160" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide-regis%2F409812054_1105994904176556_7732531811464827346_n.jpg?alt=media&token=158d8d71-680e-4592-9bd1-3f10a4dc3c3b" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide-regis%2F409848838_2282567431934405_2556037988827419922_n.jpg?alt=media&token=8bc6aef8-65d1-44f7-9088-242ff08b64f9" alt="..." />
                            </Carousel>
                        </div>
                    </div>
                    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>
                            <h1 className="font-semibold text-orange-500 text-3xl ">Email Verification</h1>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flex items-center justify-center m-4">
                                <h1 className="font-semibold text-black text-sm ">Mã otp được gửi đến Gmail : {email} </h1>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <input
                                    className="input input-bordered input-warning w-full max-w-xs"
                                    required
                                    type="text"
                                    placeholder="Mã OTP của bạn"
                                    onChange={(event) => setOtp(event.target.value)}
                                    value={otp}
                                />
                            </div>
                            <div className="w-full flex items-center justify-center">
                                {isCountdownActive && <Countdown onTimeout={handleTimeout} />}
                            </div>
                            <div className="w-full flex items-center justify-center mt-4">
                                <Button outline gradientDuoTone="greenToBlue" size="xl"
                                    onClick={() => handleConfirm()}
                                >
                                    Xác thực tài khoản
                                </Button>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="flex items-center justify-center m-2">
                                <p>Bạn không nhận được mã ? </p>
                                <button class="flex flex-row items-center text-blue-600 m-2">Gửi lại</button>
                            </div>

                        </Modal.Footer>
                    </Modal>


                </div>
            </div>
        </>
    );
};
export default Register
