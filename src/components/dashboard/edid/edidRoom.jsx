import React, { useContext, useEffect, useState } from 'react'
import * as roomApi from '../../../apis/room'
import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import { formatCurrency } from '../../helples/Format'


const EdidRoomPhoto = (item) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [is_status, setIs_status] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Add state to manage editing mode
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        // Update state only if costumer object is not null
        if (item?.item) {
            setId(item.item.id || '')
            setName(item.item.name || '');
            setCategory(item.item.category || '');
            setIs_status(item.item.is_status || '');
            setPrice(item.item.price || '');
        }
    }, [item]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };
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
                const updateItem = await roomApi.updateRoom(auth.accessToken, id, name, is_status, category, price);
                console.log(updateItem);
                if (updateItem.statusCode === 200) {
                    notify("Sửa phòng concept thành công", 'success');
                    setLoading(false);
                    setSubmit(false);
                    setIsEditing(false);
                } else {
                    notify("Sửa phòng concept không thành công");
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

    useEffect(() => {
        console.log(item);
    }, [item])

    return (
        <>
            <ToastContainer />
            <div className='w-full'>
                <div className="card card-side bg-base-100 shadow-xl">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="card-body ">
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập tên của phòng concept
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập loại phòng concept
                                    </label>
                                    <input
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        type="text"
                                        value={category} onChange={(e) => setCategory(e.target.value)} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập trạng thái của phòng concept
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="statusCheckbox"
                                            className="mr-2"
                                            checked={is_status}
                                            onChange={() => setIs_status(!is_status)}
                                        />
                                        <label htmlFor="statusCheckbox" className="text-lg">
                                            Đang hoạt động
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập giá thuê của phòng concept
                                    </label>
                                    <input type="number"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>

                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn btn-primary">
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <Spinner className="h-6 w-6 mr-4" /> <span>Loading...</span>
                                            </div>
                                        ) : (
                                            <span>Lưu</span>
                                        )}</button>
                                    <button type="button" onClick={handleCancelClick} className="btn btn-danger">Hủy</button>
                                </div>
                            </div>
                        </form>

                    ) : (
                        <div className="card-body">
                            <h2 className="card-title">Tên phòng concept : {name} </h2>
                            <h2 className="card-title">Loại phòng : {category} </h2>
                            <p>
                                Trạng thái: {is_status ? 'Đang sử dụng' : 'Phòng trống'}
                            </p>
                            <p>Giá phòng :{formatCurrency(price)} / 2h </p>
                            <div className="card-actions justify-end">
                                <button onClick={handleEditClick} className="btn btn-primary">Chỉnh Sửa</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default EdidRoomPhoto
