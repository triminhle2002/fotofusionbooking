import React, { useContext, useEffect, useState } from 'react'

import * as pricelist from '../../../apis/priceList'
import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';

const AddPriceList = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [number_camera, setNumber_camera] = useState('')
    // const [photo_album_id, setPhoto_album_id] = useState('')
    const [number_photo, setNumber_photo] = useState('')
    const [light_equip, setLight_equip] = useState('')
    const [location, setLocation] = useState('')
    const [number_photographer, setNumber_photographer] = useState('')
    const [number_assistant_photographer, setNumber_assistant_photographer] = useState('')
    const [camera_equipment, setCamera_equipment] = useState('')
    const [description, setDescription] = useState('')
    const [additional_info, setAdditional_info] = useState('')


    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { auth } = useContext(AuthContext);


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
            const getPrice = await pricelist.getAllPriceList()
            // console.log(getPrice.data[0].additional_info);
        }
        fetchAdd()
    }, [])
    useEffect(() => {
        const fetchAdd = async () => {
            try {
                const addPrice = await pricelist.CreateAPriceForAlbums(auth.accessToken, name, price,
                    number_camera, number_photo, light_equip, location, number_photographer,
                    number_assistant_photographer, camera_equipment, description, additional_info);


                if (addPrice.statusCode === 201) {
                    notify("Thêm bảng giá thành công", 'success');
                    setLoading(false);
                    setSubmit(false);
                } else {
                    notify("Thêm bảng giá thất bại");
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
        <>
            <ToastContainer />
            <div className='flex items-center justify-center'>
                <div className='w-2/3 bg-black h-auto m-4 p-4 flex items-center justify-center'>
                    <span className=' text-white text-2xl'>Thêm một giá mới cho albums hình ảnh </span>
                </div>
            </div>
            <div className='w-full '>
                <div className='flex items-center justify-center'>
                    <div className='w-[80%] p-8 border border-black rounded-lg shadow-xl'>
                        <form action="" onSubmit={(e) => handleSubmit(e)}>
                            {/* <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập id của albums hình ảnh bạn muốn thêm giá
                                </label>
                                <input
                                    id="idAlbumsInput"
                                    className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                    required
                                    type="text"
                                    autoComplete=""
                                    placeholder="Tên gói chụp"
                                    onChange={(event) => setPhoto_album_id(event.target.value)}
                                    value={photo_album_id}
                                />
                            </div> */}
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập tên gói chụp
                                </label>
                                <input
                                    id="nameInput"
                                    className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                    required
                                    type="text"
                                    autoComplete=""
                                    placeholder="Tên gói chụp"
                                    onChange={(event) => setName(event.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className="w-[48%] flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập giá của gói chụp
                                    </label>
                                    <input
                                        id="priceInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="number"
                                        autoComplete=""
                                        placeholder="...............VNĐ"
                                        onChange={(event) => setPrice(event.target.value)}
                                        value={price}
                                    />
                                </div>
                                <div className="w-[48%] flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập số lượng hình ảnh
                                    </label>
                                    <input
                                        id="numphotoInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="text"
                                        autoComplete=""
                                        placeholder="Không giới hạn"
                                        onChange={(event) => setNumber_photo(event.target.value)}
                                        value={number_photo}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập tên thiết bị chụp
                                </label>
                                <input
                                    id="nameCamInput"
                                    className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                    required
                                    type="text"
                                    autoComplete=""
                                    placeholder="Tên thiết bị chụp"
                                    onChange={(event) => setCamera_equipment(event.target.value)}
                                    value={camera_equipment}
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập tên thiết bị ánh sáng
                                </label>
                                <input
                                    id="nameLightEquipInput"
                                    className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                    required
                                    type="text"
                                    autoComplete=""
                                    placeholder="Tên thiết bị ánh sáng"
                                    onChange={(event) => setLight_equip(event.target.value)}
                                    value={light_equip}
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập vị trí chụp
                                </label>
                                <input
                                    id="nameLocationInput"
                                    className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                    required
                                    type="text"
                                    autoComplete=""
                                    placeholder="vị trí chụp ảnh"
                                    onChange={(event) => setLocation(event.target.value)}
                                    value={location}
                                />
                            </div>

                            <div className='w-full flex items-center justify-between'>

                                <div className="w-[32%] flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập số lượng camera
                                    </label>
                                    <input
                                        id="numCamInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="number"
                                        autoComplete=""
                                        placeholder="cái"
                                        onChange={(event) => setNumber_camera(event.target.value)}
                                        value={number_camera}
                                    />
                                </div>

                                <div className="w-[32%] flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập sl thợ chụp ảnh
                                    </label>
                                    <input
                                        id="numphotographerInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="number"
                                        autoComplete=""
                                        placeholder="....... thợ"
                                        onChange={(event) => setNumber_photographer(event.target.value)}
                                        value={number_photographer}
                                    />
                                </div>
                                <div className="w-[32%] flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập số lượng thợ phụ
                                    </label>
                                    <input
                                        id="numerInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="number"
                                        autoComplete=""
                                        placeholder="...... thợ"
                                        onChange={(event) => setNumber_assistant_photographer(event.target.value)}
                                        value={number_assistant_photographer}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập mô tả như số buổi chụp , xem ảnh , hỗ trợ đạo cụ ,trang phục , trang điểm
                                </label>
                                <textarea
                                    id="nameDescriptionInput"
                                    rows="4"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Nhập mô tả"
                                    onChange={(event) => setDescription(event.target.value)}
                                    value={description}
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập mô tả về khách hàng nhận được những gì
                                </label>
                                <textarea
                                    id="nameadditionalInput"
                                    rows="4"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Khách hàng nhận được"
                                    onChange={(event) => setAdditional_info(event.target.value)}
                                    value={additional_info}
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

                </div>
            </div>
        </>
    )
}

export default AddPriceList
