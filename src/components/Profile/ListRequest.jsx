import React, { useContext, useEffect, useState } from 'react'
import { formatDateTime, formatCurrency } from '../helples/Format'
import * as requestApi from '../../apis/request'
import AuthContext from '../../context/authProvider';

const ListRequest = () => {
    const [listRequest, setListRequest] = useState([])
    const { auth } = useContext(AuthContext);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);

        document.getElementById('my_modal_2').showModal();
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await requestApi.getRequestByUserId(auth.accessToken, auth.id);
                setListRequest(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách yêu cầu:', error);
            }
        };
        if (auth.accessToken && auth.id) {
            fetchData();
        }
    }, [auth]);
    return (
        <div className='w-full bg-white'>
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
                                {listRequest.map((item) => {
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
                                                {item.status === "Hoàn Thành" && (
                                                    <button className="btn btn-success"
                                                        onClick={() => openModal(item)}
                                                    >Xem Chi Tiết</button>
                                                )}
                                            </th>
                                            <dialog id="my_modal_2" className="modal">
                                                <div className="modal-box">
                                                    <p>Hình ảnh nhận được</p>
                                                    <img className="mask mask-decagon" src={selectedItem ? selectedItem.img_url_old : "https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg"} />
                                                    <p className="py-4">Yêu cầu chỉnh Sửa : {selectedItem ? selectedItem.request : ''}</p>
                                                    <p>Hình ảnh sau khi đã chỉnh sửa : </p>
                                                    <img className="" src={selectedItem ? selectedItem.img_url_new : "https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg"} />

                                                </div>
                                                <form method="dialog" className="modal-backdrop">
                                                    <button>close</button>
                                                </form>
                                            </dialog>

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

export default ListRequest
