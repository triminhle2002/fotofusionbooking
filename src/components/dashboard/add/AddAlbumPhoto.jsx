import React, { useContext, useEffect, useState } from 'react'
import * as albumphoto from '../../../apis/albumphoto'
import * as userApi from '../../../apis/user'

import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../config/firebase.config';
import { v4 } from "uuid";


const AddAlbumPhoto = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')

    const [sum_photo, setSum_photo] = useState('')
    const [location, setLocation] = useState(null)
    const [date_create, setDate_create] = useState('')
    const [user_id, setUser_id] = useState('')
    const [customers, setCustomers] = useState([])



    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { auth } = useContext(AuthContext);


    const [imageUploads, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImageUpload((prevState) => [...prevState, newImage]);
        }
    };
    const uploadFile = async () => {

        await Promise.all(
            imageUploads.map(async (imageUpload) => {
                const imageRef = ref(storage, `/Albums/Cover/${imageUpload.name + v4()}`);

                try {
                    const snapshot = await uploadBytes(imageRef, imageUpload);
                    const url = await getDownloadURL(snapshot.ref);
                    setImageUrls((prev) => [...prev, url]);
                } catch (error) {
                    console.error("Error uploading image: ", error);
                }
            })
        );
    }
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
        const fetchData = async () => {
            try {
                const response = await userApi.getAllUsersIsCustomer(auth.accessToken)
                console.log(response);
                setCustomers(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách :', error);
            }
        };
        if (auth.accessToken) {
            fetchData();
        }
    }, []);
    useEffect(() => {
        const fetchAdd = async () => {
            try {
                const addAlbums = await albumphoto.createAlbumsPhotoForCustomer(auth.accessToken, name, user_id, imageUrls[0], sum_photo, category, location, date_create);
                if (addAlbums.statusCode === 201) {
                    notify("Thêm albums thành công", 'success');
                    setLoading(false);
                    setSubmit(false);
                } else {
                    notify("Thêm albums thất bại");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadFile();
        setSubmit(true);
        setLoading(true);
    };
    return (
        <>
            <ToastContainer />
            <div className='w-full bg-cover bg-center object-fill' style={{ backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FNewAlbums%2F394633957_3658271094408923_3818685567209092598_n.jpg34ecbff6-6764-4f1b-b078-459b8f706e1a?alt=media&token=ec0f57d9-3a50-45a3-9dfd-81e35d130220")' }}>
                <div className='flex items-center justify-center'>
                    <div className='w-[70%] bg-black h-auto m-4 p-4 flex items-center justify-center'>
                        <span className=' text-white text-2xl'>Thêm một albums mới </span>
                    </div>
                </div>
                <div className='w-full '>
                    <div className='flex items-center justify-center '>
                        <div className='w-[70%] p-8 border border-black rounded-lg shadow-xl bg-white m-2'>
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập tên của Albums
                                    </label>
                                    <input
                                        id="nameInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="text"
                                        autoComplete=""
                                        placeholder="Tên của Albums"
                                        onChange={(event) => setName(event.target.value)}
                                        value={name}
                                    />
                                </div>
                                <div className='flex items-center justify-between'>

                                    <div className="flex flex-col mb-6 ">
                                        <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                            Nhập loại của Albums
                                        </label>
                                        <div className='flex items-center justify-between'>
                                            <input
                                                id="categoryInput"
                                                className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                                required
                                                type="text"
                                                autoComplete=""
                                                placeholder="Nhập loại sản phẩm"
                                                onChange={(event) => { setCategory(event.target.value) }}
                                                value={category}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col mb-6">
                                        <label className="font-medium text-left text-lg mb-2 text-black" htmlFor="">
                                            Lựa chọn khách hàng
                                        </label>
                                        <select
                                            className="select select-warning w-full max-w-full"
                                            defaultValue="default"
                                            onChange={(e) => setUser_id(e.target.value)}
                                        >
                                            <option value="default" disabled>Lựa chọn khách hàng</option>
                                            {customers.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập trí chụp của albums
                                    </label>
                                    <input

                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="text"
                                        autoComplete=""
                                        placeholder="null"
                                        onChange={(event) => setLocation(event.target.value)}
                                        value={location}
                                    />
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div className="flex flex-col mb-6">
                                        <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                            Nhập số lượng hình ảnh của albums
                                        </label>
                                        <input
                                            id="priceInput"
                                            className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            required
                                            type="number"
                                            autoComplete=""
                                            placeholder="...............VNĐ"
                                            onChange={(event) => setSum_photo(event.target.value)}
                                            value={sum_photo}
                                        />
                                    </div>

                                    <div className="w-[48%] flex flex-col mb-6">
                                        <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                            Nhập ngày tạo albums
                                        </label>
                                        <input
                                            id="rental_Input"
                                            className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            required
                                            type="date"
                                            autoComplete=""
                                            placeholder="Chọn ngày"
                                            onChange={(event) => { setDate_create(event.target.value) }}
                                            value={date_create}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Đưa hình ảnh đại diện của albums lên
                                    </label>
                                    <input
                                        id="urlphotoinput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="file"
                                        autoComplete=""
                                        multiple
                                        placeholder="url_photo"
                                        onChange={handleChange}
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
            </div >
        </>
    )
}

export default AddAlbumPhoto
