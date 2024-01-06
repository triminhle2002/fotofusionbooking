import React, { useContext, useEffect, useState } from 'react'
import * as Price from '../../../apis/priceList'

import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';


const EdidPriceList = (priceList) => {
    const [id, setId] = useState('');
    // const [photo_album_id, setPhoto_album_id] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [number_camera, setNumber_camera] = useState('');
    const [number_photo, setNumber_photo] = useState('');
    const [light_equip, setLight_equip] = useState('');
    const [location, setLocation] = useState('');
    const [number_photographer, setNumber_photographer] = useState('');
    const [number_assistant_photographer, setNumber_assistant_photographer] = useState('');
    const [camera_equipment, setCamera_equipment] = useState('');
    const [description, setDescription] = useState('');
    const [additional_info, setAdditional_info] = useState('');



    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Add state to manage editing mode
    const { auth } = useContext(AuthContext);

    useEffect(() => {

        // Update state only if costumer object is not null
        if (priceList?.pricelist) {
            setId(priceList.pricelist.id || '')
            //setPhoto_album_id(priceList.pricelist.photo_album_id || '')
            setName(priceList.pricelist.name || '')
            setPrice(priceList.pricelist.price || '')
            setNumber_camera(priceList.pricelist.number_camera || '')
            setNumber_photo(priceList.pricelist.number_photo || '')
            setLight_equip(priceList.pricelist.light_equip || '')
            setLocation(priceList.pricelist.location || '')
            setNumber_photographer(priceList.pricelist.number_photographer || '')
            setNumber_assistant_photographer(priceList.pricelist.number_assistant_photographer || '')
            setCamera_equipment(priceList.pricelist.camera_equipment || '')
            setDescription(priceList.pricelist.description || '')
            setAdditional_info(priceList.pricelist.additional_info || '')



        }
    }, [priceList]);
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
                const dataUpdate = await Price.updatePriceList(auth.accessToken, id, name, price,
                    number_camera, number_photo, light_equip, location, number_photographer,
                    number_assistant_photographer, camera_equipment, description, additional_info);
                console.log(dataUpdate);
                if (dataUpdate.statusCode === 200) {
                    notify("Sửa bảng giá thành công", 'success');
                    setLoading(false);
                    setSubmit(false);
                    setIsEditing(false);
                } else {
                    notify("Sửa bảng giá không thành công");
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
        console.log(priceList);
    }, [priceList])

    return (
        <>
            <ToastContainer />
            <div className='w-full'>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img className='w-64 h-64' src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/RentalProducts%2FCostomer%2FCosplay%2F1b7c0af57d273bbb34f95005750f6ac3.jpg?alt=media&token=e5d80974-580f-4126-90eb-e4fbf1023707" alt="Movie" /></figure>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="card-body ">
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập tên của gói
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập Giá của gói
                                    </label>
                                    <input
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        type="text"
                                        value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập Sl hình ảnh
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={number_photo} onChange={(e) => setNumber_photo(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập tên thiết bị chụp
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={camera_equipment} onChange={(e) => setCamera_equipment(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập tên thiết bị ánh sáng
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={light_equip} onChange={(e) => setLight_equip(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập vị trí
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập SL camera
                                    </label>
                                    <input type="number"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={number_camera} onChange={(e) => setNumber_camera(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập Sl thợ chụp
                                    </label>
                                    <input type="number"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={number_photographer} onChange={(e) => setNumber_photographer(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập SL thợ phụ
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={number_assistant_photographer} onChange={(e) => setNumber_assistant_photographer(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập mô tả như số buổi chụp , xem ảnh , hỗ trợ đạo cụ ,trang phục , trang điểm....
                                    </label>
                                    <textarea type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập mô tả về khách hàng nhận được những gì
                                    </label>
                                    <textarea type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={additional_info} onChange={(e) => setAdditional_info(e.target.value)} />
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
                            <h2 className="card-title">Tên gói : {name} </h2>
                            <h2 className="card-title">Giá : {price} VND</h2>
                            <p>Số lượng máy chụp :{number_camera} </p>
                            <p>Tên máy chụp :{camera_equipment} </p>
                            <p>Tên thiết bị sáng :{light_equip} </p>
                            <p>Số lượng thợ chụp :{number_photographer} </p>
                            <p>Số lượng thợ phụ :{number_assistant_photographer} </p>
                            <p>Số lượng hình ảnh :{number_photo} </p>
                            <p>Vị trí chụp :{location} </p>
                            <p style={{ whiteSpace: 'pre-line' }}>Mô tả  :{description} </p>
                            <p style={{ whiteSpace: 'pre-line' }}>Khách hàng nhận được :{additional_info} </p>
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

export default EdidPriceList
