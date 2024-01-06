import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import * as roleApi from '../../../apis/role'
import AuthContext from '../../../context/authProvider';

const AddRole = () => {
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
    const [nameRole, setNameRole] = useState('')
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchAdd = async () => {
            try {
                const addRole = await roleApi.CreateNewRole(auth.accessToken, nameRole);
                if (addRole.statusCode === 201) {
                    notify("Thêm vai trò mới thành công ", 'success');
                    setLoading(false);
                    setSubmit(false);
                } else {
                    notify("Thêm vai trò mới không thành công ");
                    setLoading(false);
                    setSubmit(false);
                }
            } catch (error) {
                console.error('Error in fetchAdd:', error);
                setLoading(false);
                setSubmit(false);
            }
        };
        if (submit && auth.accessToken !== undefined) {
            fetchAdd();
        }
    }, [submit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
        setLoading(true);
    };
    return (
        <div>
            <>
                <ToastContainer />
                <div className='flex items-center justify-center'>
                    <div className='w-2/3 bg-black h-auto m-4 p-4 flex items-center justify-center'>
                        <span className=' text-white text-2xl'>Thêm một vai trò mới </span>
                    </div>
                </div>
                <div className='w-full'>
                    <form action="" onSubmit={(e) => handleSubmit(e)}>
                        <div className="flex flex-col mb-6">
                            <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                Nhập tên của vai trò
                            </label>
                            <input
                                id="nameInput"
                                className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                required
                                type="text"
                                autoComplete=""
                                placeholder="Tên của trang phục"
                                onChange={(event) => setNameRole(event.target.value)}
                                value={nameRole}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="py-2 px-4 bg-btnprimary text-blue-gray-900 rounded-md w-32 mx-6 hover:bg-light-green-800"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <Spinner className="h-6 w-6 mr-4" /> <span>Loading...</span>
                                    </div>
                                ) : (
                                    <span>Thêm</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </>

        </div>
    )
}

export default AddRole
