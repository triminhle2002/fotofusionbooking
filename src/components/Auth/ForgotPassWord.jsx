import { Spinner } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import { icons } from "../../utils/icons";
import * as authApis from '../../apis/auth'
import { Carousel } from 'flowbite-react';


const Forgot = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const location = useLocation();

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

    const toLowerEmail = (email) => {
        const username = email
            .split('@')[0]
            .toLowerCase()
            .replace(/[^a-z0-9]/gi, '');
        return email.replace(/^[^@]+/, username);
    };


    useEffect(() => {
        if (submit) {
            const fetchAuth = async () => {
                const forgotPassword = await authApis.forgotPassword(email);
                console.log(forgotPassword);
                if (forgotPassword.statusCode === 200) {
                    setLoading(false);
                    navigate('/resetpassword', { state: { toastMessage: forgotPassword.response.message + ". Vui lòng kiểm tra hộp thư của bạn để nhận OTP" } });
                } else {
                    notify(forgotPassword.error.message);
                    setLoading(false);
                    setSubmit(false);
                }
            };
            fetchAuth();
        }
    }, [submit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /\S+@\S+\S+/;
        const isEmailValid = emailRegex.test(email);
        // Validation input
        if (isEmailValid && email.endsWith('@gmail.com')) {
            // email is valid and ends with "@gmail.com"
            setSubmit(true);
            setLoading(true);
        } else {
            // email is not valid or does not end with "@gmail.com"
            setSubmit(false);
            setLoading(false);
            notify('Email phải bao gồm đuôi "@gmail.com"');
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="h-screen flex items-center bg-gradient-to-r from-[#1e524e] to-[#6cff95]">
                <div className="bg-black w-full sm:w-[90%] md:w-[80%] lg:w-[75%] lg:grid lg:grid-cols-10 shadow-xl m-auto my-auto rounded-[20px] pb-4 lg:pb-0">
                    <div className="text-center lg:col-span-4">
                        <div className="w-[70%] m-auto">
                            <h1 className="text-primaryColor text-3xl font-bold py-12">Quên mật khẩu</h1>
                            <h1 className="text-primaryColor text-base font-bold">Hãy điền địa chỉ email của bạn. Bạn sẽ nhận được mã OTP để tạo mật khẩu mới qua email <icons.AiOutlineMail /></h1>
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                <div className="flex flex-col mb-6 mt-9">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Địa Chỉ Email
                                    </label>
                                    <input
                                        id="emailInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="email"
                                        autoComplete="email"
                                        placeholder="youraccount@gmail.com"
                                        onChange={(event) => setEmail(event.target.value)}
                                        value={email}
                                    />
                                </div>
                                <button className="py-3 bg-btnprimary w-full mt-3 mb-3 rounded-lg text-xl font-bold text-white  opacity-100 active:opacity-80">
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Đang tải....</span>
                                        </div>
                                    ) : (
                                        <span>Gửi</span>
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

export default Forgot;