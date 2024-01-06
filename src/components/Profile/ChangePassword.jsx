import React, { useContext, useState } from 'react'
import { icons } from "../../utils/icons";
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import * as authApi from '../../apis/auth'

const ChangePassword = () => {
    const notify = (message, type) => {
        const toastType = type === 'success' ? toast.success : toast.error;
        return toastType(message, {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const { auth } = useContext(AuthContext);
    const [hiddenPass, setHiddenPass] = useState(true);
    const [passwordOld, setPasswordOld] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleHiddenPassword = () => {
        hiddenPass ? setHiddenPass(false) : setHiddenPass(true);
    };
    const handleChangePassword = async () => {
        if (auth.accessToken && auth.email) {
            try {

                if (!passwordOld || !passwordNew || !confirmPassword) {
                    notify("Không được để trống trường nào ", "error");
                    return;
                }
                if (passwordNew !== confirmPassword) {
                    notify("Trường mật khẩu cũ và xác nhận mật khẩu không giống nhau ", "error");
                    return;
                }

                const response = await authApi.changePassword(auth.email, passwordOld, passwordNew);

                if (response.statusCode === 200) {
                    notify("Thay đổi mật khẩu thành công!", "success");
                    setPasswordNew('')
                    setPasswordOld('')
                    setConfirmPassword('')
                } else {
                    notify("Nhập sai mật khẩu cũ. Hãy Thử Lại.", "error");
                }
            } catch (error) {
                console.error('Error during password change:');
                notify("Internal Server Error. Please try again later.", "error");
            }
        }
    };


    return (
        <>
            <ToastContainer />
            <div className='w-2/3 h-auto'>
                <div className='p-4 rounded shadow-sm m-2 w-full text-white border bg-black opacity-80'>
                    <div className='flex items-center justify-center'>
                        <span className='font-semibold text-3xl '>Thay Đổi Mật Khẩu</span>
                    </div>
                    <div className="flex flex-col m-8">
                        <label className="font-medium text-left text-lg mb-2 text-primaryColor" htmlFor="">
                            Nhập mật khẩu hiện tại
                        </label>
                        <div className="relative text-black">
                            <input
                                id="passwordOldInput"
                                className=" w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                type={hiddenPass ? 'password' : 'text'}
                                required
                                placeholder="Mật khẩu của bạn"
                                onChange={(event) => setPasswordOld(event.target.value)}
                                value={passwordOld}
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
                    <div className="flex flex-col m-8">
                        <label className="font-medium text-left text-lg mb-2 text-primaryColor" htmlFor="">
                            Nhập mật khẩu mới
                        </label>
                        <div className="relative text-black">
                            <input
                                id="passwordNewInput"
                                className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                type={hiddenPass ? 'password' : 'text'}
                                required
                                placeholder="Mật khẩu mới"
                                onChange={(event) => setPasswordNew(event.target.value)}
                                value={passwordNew}
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
                    <div className="flex flex-col m-8">
                        <label className="font-medium text-left text-lg mb-2 text-primaryColor" htmlFor="">
                            Nhập lại mật khẩu mới
                        </label>
                        <div className="relative text-black">
                            <input
                                id="passwordConfirmInput"
                                className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                type={hiddenPass ? 'password' : 'text'}
                                required
                                placeholder="Nhập lại mật khẩu mới"
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                value={confirmPassword}
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
                    <div className='flex items-center justify-center'>
                        <button className="btn btn-outline btn-primary" onClick={handleChangePassword}>Thay đổi</button>
                    </div>
                    <div className='flex items-end justify-end'>
                        <Link to='/forgotpassword'>
                            <button className="link link-error">Quên Mật Khẩu</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword