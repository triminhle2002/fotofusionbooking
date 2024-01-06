import React, { useEffect, useState, useContext, useRef } from 'react';
import AuthContext from '../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { icons } from "../../utils/icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import bgImage from "../../public/img/formlogin.jpg"
import bgImage1 from "../../public/img/formlogin1.jpg"
import * as authApis from '../../apis/auth'


const Login = () => {
    const topRef = useRef(null); // Define topRef with an initial value of null

    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [hiddenPass, setHiddenPass] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [headings, setHeadings] = useState(['Chụp Ảnh', 'Mua Bán', 'Chỉnh Sửa']);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const switchHeading = () => {
        setVisibleIndex((prevIndex) => (prevIndex + 1) % headings.length);
    }

    useEffect(() => {
        const timer = setTimeout(switchHeading, 2000); // Chuyển đổi tiêu đề sau 2 giây
        return () => clearTimeout(timer); // Hủy bỏ timer khi component bị huỷ
    }, [visibleIndex]);

    const handleHiddenPassword = () => {
        hiddenPass ? setHiddenPass(false) : setHiddenPass(true);
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

    useEffect(() => {
        if (location.state?.toastMessage !== '') {
            notify(location.state?.toastMessage, 'success');
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);

    useEffect(() => {
        if (submit) {
            const fetchAuth = async () => {
                const authentication = await authApis.loginApi(email, password);
                console.log(authentication);

                if (authentication.statusCode === 200) {
                    const accessToken = authentication.response.accessToken;
                    const authorization = await authApis.authorization(accessToken, email);
                    console.log(authorization);

                    const getUser = await authApis.getUser(accessToken, email);
                    const id = getUser.id;
                    const fullName = getUser.name;
                    const phone = authorization.phoneNumber;
                    const address = getUser.address;
                    const role = authorization.roles
                    const gender = getUser.gender
                    const avatar = getUser.avatar

                    setAuth({ id, email, password, accessToken, fullName, phone, address, role, gender, avatar });
                    localStorage.setItem('auth', JSON.stringify({ id, email, password, accessToken, fullName, phone, address, role, gender, avatar }));

                    if (authorization.statusCode === 200) {
                        if (authorization.roles === 'admin') navigate('/dashboard', { state: { toastMessage: "Đăng nhập thành công" } });
                        else if (authorization.roles === 'customer') navigate('/', { state: { toastMessage: "Đăng nhập thành công" } });
                        else if (authorization.roles === 'editor') navigate('/homeeditor', { state: { toastMessage: "Đăng nhập thành công" } });
                        else if (authorization.roles === 'photographer') navigate('/', { state: { toastMessage: "Đăng nhập thành công" } });
                        else if (authorization.roles === 'makeup') navigate('/', { state: { toastMessage: "Đăng nhập thành công" } });
                        else if (authorization.roles === 'cusSerRep') navigate('/', { state: { toastMessage: "Đăng nhập thành công" } });


                        else notify('Đăng nhập thất bại');
                    } else {
                        notify(authorization.error.response.data.message);
                        setLoading(false);
                        setSubmit(false);
                    }
                } else {
                    notify(authentication.error.response.data.message);
                    setLoading(false);
                    setSubmit(false);
                }
            };

            fetchAuth();

        }
    }, [email, navigate, password, setAuth, submit]);

    const handleCheckInput = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        const isEmailValid = emailRegex.test(email);

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

    const handleLogin = (e) => {
        e.preventDefault();
        handleCheckInput();
    };


    return (
        <>
            <ToastContainer />
            <div className="h-screen flex items-center bg-gradient-to-r from-[#080808] to-[#0c0f0d]">
                <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[75%] lg:grid lg:grid-cols-10 shadow-xl m-auto my-auto rounded-[20px] pb-4 lg:pb-0">
                    <div className="text-center lg:col-span-4 rounded-l-[20px]"
                        style={{
                            position: 'relative',
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: '100% 100%', // Đặt backgroundSize
                            backgroundPosition: 'center', // Đặt backgroundPosition
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="w-[70%] m-auto">
                            <h1 className="text-primaryColor text-3xl font-bold py-10">Đăng Nhập </h1>
                            <form action="" onSubmit={(e) => handleLogin(e)}>
                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-primaryColor " htmlFor="">
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
                                <div className="flex flex-col ">
                                    <label className="font-medium text-left text-lg mb-2 text-primaryColor" htmlFor="">
                                        Mật Khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="passwordInput"
                                            className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenPass ? 'password' : 'text'}
                                            required
                                            placeholder="Mật khẩu của bạn"
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
                                <div className=" text-right mt-2 mb-9 ">
                                    <Link to="/forgotpassword" className="text-lg text-primaryColor">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <button className="py-3 bg-btnprimary w-full mb-3 rounded-lg text-xl font-bold text-black  opacity-100 active:opacity-80">
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Đang tải....</span>
                                        </div>
                                    ) : (
                                        <span>Đăng Nhập</span>
                                    )}
                                </button>
                            </form>

                            <div className="mt-2 mb-9">
                                <p className="text-primaryColor">
                                    Chưa có tài khoản?
                                    <Link to="/signup" className="text-lg text-primaryColor ml-2">
                                        Đăng Ký
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block h-full w-full col-span-6 rounded-r-[20px]"
                        style={{
                            position: 'relative',
                            backgroundImage: `url(${bgImage1})`,
                            backgroundSize: '100% 100%', // Đặt backgroundSize
                            backgroundPosition: 'center', // Đặt backgroundPosition
                            backgroundRepeat: 'no-repeat',
                        }}>
                        <div className=' flex'>
                            <h1 className='flex text-4xl mt-[35%] ml-[10%] font-extrabold text-white'>
                                <span className='mr-4 text-orange-600'>[</span>
                                FOTOFUSHION
                                <span className='ml-4 text-orange-600'>]</span>
                            </h1>
                            {headings.map((heading, index) => (
                                <h1 className='flex text-4xl mt-[35%] ml-10 font-extrabold text-red-500' key={index} style={{ display: index === visibleIndex ? 'block' : 'none' }}>
                                    {heading}
                                </h1>
                            ))}


                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login
