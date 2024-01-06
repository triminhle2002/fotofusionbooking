import { icons } from "../../utils/icons";
import { Carousel } from 'flowbite-react';
import { Spinner } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import * as authApis from '../../apis/auth'


const Reset = () => {
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hiddenPass, setHiddenPass] = useState(true);
    const [hiddenRePass, setHiddenRePass] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

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
    useEffect(() => {
        if (location.state?.toastMessage !== '') {
            notify(location.state?.toastMessage, "success");
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);

    useEffect(() => {
        if (submit) {
            const fetchReset = async () => {
                const resetPassword = await authApis.resetPassword(otp, password);
                if (resetPassword.statusCode === 200) {
                    setLoading(false);
                    navigate('/login', { state: { toastMessage: resetPassword.response.message } });
                } else {
                    notify(resetPassword.error.message);
                    setLoading(false);
                    setSubmit(false);
                }
            };
            fetchReset();
        }
    }, [submit]);

    const handleHiddenPassword = () => {
        hiddenPass ? setHiddenPass(false) : setHiddenPass(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation input
        if (otp.length !== 6) {
            notify('Mã OTP phải có đúng 6 chữ số');
            setSubmit(false);
        } else if (password.length < 6) {
            notify('Mật khẩu phải có tối thiểu 6 ký tự');
            setSubmit(false);
        } else if (rePassword !== password) {
            notify('Mật khẩu nhập lại không khớp');
            setSubmit(false);
        } else {
            setLoading(true);
            setSubmit(true);
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="h-screen flex items-center bg-gradient-to-r from-[#1e524e] to-[#6cff95]">
                <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[75%] lg:grid lg:grid-cols-10 shadow-xl m-auto my-auto rounded-[20px] pb-4 lg:pb-0">
                    <div className="text-center lg:col-span-4">
                        <div className="w-[70%] m-auto">
                            <h1 className="text-primaryColor text-3xl font-bold py-10">Đặt lại mật khẩu</h1>
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        OTP
                                    </label>
                                    <input
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="text"
                                        placeholder="Mã OTP của bạn"
                                        onChange={(event) => setOtp(event.target.value)}
                                        value={otp}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Mật Khẩu Mới
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenPass ? 'password' : 'text'}
                                            required
                                            placeholder="Mật khẩu mới của bạn"
                                            onChange={(event) => setPassword(event.target.value)}
                                            value={password}
                                        />
                                        {hiddenPass ? (
                                            <span onClick={handleHiddenPassword}
                                                className="absolute top-5 right-6">
                                                <icons.BsEyeSlashFill />
                                            </span>
                                        ) : (
                                            <span onClick={handleHiddenPassword}
                                                className="absolute top-5 right-6">
                                                <icons.AiOutlineEye />
                                            </span>

                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col ">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Xác Nhận Mật Khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenRePass ? 'password' : 'text'}
                                            required
                                            placeholder="Nhập lại mật khẩu của bạn"
                                            onChange={(e) => setRePassword(e.target.value)}
                                            value={rePassword}
                                        />
                                        {hiddenPass ? (
                                            <span onClick={() => setHiddenRePass(false)}
                                                className="absolute top-5 right-6">
                                                <icons.BsEyeSlashFill />
                                            </span>
                                        ) : (
                                            <span onClick={() => setHiddenRePass(true)}
                                                className="absolute top-5 right-6">
                                                <icons.AiOutlineEye />
                                            </span>

                                        )}
                                    </div>
                                </div>
                                <button className="py-3 bg-primaryColor w-full mt-8 mb-12 rounded-lg text-xl font-bold text-white  opacity-100 active:opacity-80">
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Đang tải....</span>
                                        </div>
                                    ) : (
                                        <span>Đặt lại</span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="hidden lg:block h-full w-full col-span-6 bg-black">
                        <div className="h-full w-full object-cover lg:rounded-r-[20px] ">
                            <Carousel slideInterval={2000}>
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide-fogot%2F408908287_10161267835404742_1666607562902893736_n.jpg?alt=media&token=862f7eb3-5c00-455e-b1e2-e05d2e7142ba" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide-fogot%2F408921895_10161267835529742_3160317140637161876_n.jpg?alt=media&token=f8f32942-2a75-41d9-be75-5d641b4d7aa9" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide-fogot%2F409185050_329556656521378_3889653913081834389_n.jpg?alt=media&token=77dbf148-486e-4b10-b054-90ec8961b8fd" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide-fogot%2F409406727_7366342330045294_8598210587131921035_n.jpg?alt=media&token=aa1befb7-9f90-4598-8a82-80b9624a090f" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide-fogot%2F409434812_1138291923804286_4015756808812724934_n.jpg?alt=media&token=c285bb7e-07c5-4edd-ba71-b926c1423762" alt="..." />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reset;