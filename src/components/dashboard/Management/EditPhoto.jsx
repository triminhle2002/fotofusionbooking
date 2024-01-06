import React, { useContext, useEffect, useState } from 'react'
import * as requestApi from '../../../apis/request'
import AuthContext from '../../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';

const EditPhoto = () => {
    const { auth } = useContext(AuthContext);
    const [requests, setRequests] = useState([])
    const [openModal, setOpenModal] = useState(false);
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
    useEffect(() => {
        const fetchAdd = async () => {
            try {
                const request = await requestApi.getRequest(auth.accessToken);
                console.log(request);
                setRequests(request)
            } catch (error) {
                console.error('Error in fetchAdd:', error);
            }
        };
        if (auth.accessToken !== undefined) {
            fetchAdd();
        }
    }, [auth.accessToken])
    const handleDeleteReques = async (id) => {
        if (auth.accessToken) {
            try {
                const deleteR = await requestApi.deleteRequest(auth.accessToken, id)

                if (deleteR.statusCode === 204) {
                    await window.location.reload();
                    notify("Xóa yêu cầu thành công", "success")

                }
                else {
                    notify("Xóa yêu cầu không thành công")
                }
            } catch (error) {

            }
        }
    }

    return (
        <div className='w-full'>
            <div className='flex items-center justify-center'>
                <h1 className='font-bold text-5xl m-10'>Bảng Yêu Cầu Chỉnh Sửa Hình Ảnh</h1>
            </div>
            <div className='flex items-center justify-center'>
                <div className='w-3/4'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Hình Ảnh</th>
                                    <th>Yêu Cầu</th>
                                    <th>Tình Trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {requests.map((item) => {
                                    return (
                                        <tr>

                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-24 h-24">
                                                            <img src={item.img_url_old} alt="photo" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td className='w-1/2'>
                                                <span className='line-clamp-3'>{item.request}</span>
                                            </td>
                                            <td>
                                                {item.status}

                                            </td>
                                            <th>
                                                <button className="btn btn-success"
                                                    onClick={() => handleDeleteReques(item.id)}
                                                >Xóa</button>
                                            </th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default EditPhoto
