import React, { useContext, useEffect, useState } from 'react'
import * as albumsphoto from '../../../apis/albumphoto'
import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import { formatDateTime } from '../../helples/Format'

const EdidAlbums = (item) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [cover_photo, setCover_photo] = useState('');
    const [sum_photo, setSum_photo] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [date_create, setDate_create] = useState('');
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (item?.item) {
            setId(item.item.id || '')
            setName(item.item.name || '');
            setCategory(item.item.category || '');
            setCover_photo(item.item.cover_photo || '');
            setSum_photo(item.item.sum_photo || '');
            setLocation(item.item.location || '');
            setDate_create(item.item.date_create || '');
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
                const updateCostumer = await albumsphoto.updateAlbums(auth.accessToken, id, name, cover_photo, sum_photo, category, location, date_create);
                console.log(updateCostumer);
                if (updateCostumer.statusCode === 200) {
                    notify("Sửa albums thành công", 'success');
                    setLoading(false);
                    setSubmit(false);
                    setIsEditing(false);
                } else {
                    notify("không thành công");
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
                                        Nhập tên của Albums
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập loại Albums
                                    </label>
                                    <input
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        type="text"
                                        value={category} onChange={(e) => setCategory(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập số lượng hình ảnh
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={sum_photo} onChange={(e) => setSum_photo(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập vị trí chụp hình
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập thời gian tạo
                                    </label>
                                    <input type="date"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={date_create} onChange={(e) => setDate_create(e.target.value)} />
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
                            <h2 className="card-title">Tên Albums : {name} </h2>
                            <h2 className="card-title">Tình trạng : {category}</h2>
                            <p>Số lượng ảnh :{sum_photo} </p>
                            <p>Ngày tạo :{formatDateTime(date_create)} </p>
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

export default EdidAlbums
