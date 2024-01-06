import React, { useContext, useEffect, useState } from 'react'
import * as photo from '../../../apis/photo'
import { ref, uploadBytes, getDownloadURL, listAll, list, } from "firebase/storage";
import { storage } from '../../../config/firebase.config';
import { v4 } from "uuid";
import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import * as albumsApi from '../../../apis/albumphoto'


const AddPhotoToAlbums = () => {
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
    const [imageUploads, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { auth } = useContext(AuthContext);
    const [img_name, setImg_name] = useState('');
    const [albums_id, setAlbums_id] = useState(null);
    const [albumspt, setAlbumspt] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await albumsApi.getAlbumsPhoto()
                setAlbumspt(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách :', error);
            }
        };
        fetchData();
    }, []);


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
                const imageRef = ref(storage, `/Albums/NewAlbums/${imageUpload.name + v4()}`);
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

    useEffect(() => {
        if (albums_id && imageUrls.length === imageUploads.length) {
            // console.log(albums_id);
            const performAddProduct = async () => {
                try {
                    await Promise.all(imageUrls.map(async (url_photo) => {
                        const addProduct = await photo.updateAlbumsPhoto(auth.accessToken, img_name, url_photo, albums_id);
                        if (addProduct.statusCode === 201) {
                            notify("Thêm hình ảnh cho albums thành công", 'success');
                            setLoading(false);
                            setSubmit(false);
                        } else {
                            notify("Thêm hình ảnh cho albums thất bại");
                            setLoading(false);
                            setSubmit(false);
                        }
                    }));
                } catch (error) {
                    console.error('Error in performAddProduct:', error);
                    setLoading(false);
                    setSubmit(false);
                }
            };

            if (submit) {
                performAddProduct();
            }
        }
    }, [imageUrls]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadFile();
        setSubmit(true);
        setLoading(true);
    };
    useEffect(() => {
        console.log(albums_id);
    }, [albums_id])
    return (
        <div>
            <ToastContainer />
            <div className='w-full '>
                <div className='flex items-center justify-center'>
                    <div className='w-[50%] p-8 border border-black rounded-lg shadow-xl'>
                        <form action="" onSubmit={(e) => handleSubmit(e)}>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập tên của hình ảnh
                                </label>
                                <input
                                    id="nameInput"
                                    className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                    required
                                    type="text"
                                    autoComplete=""
                                    placeholder="Tên của hình ảnh"
                                    onChange={(event) => setImg_name(event.target.value)}
                                    value={img_name}
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black" htmlFor="">
                                    Lựa chọn Albums cần thêm hình ảnh
                                </label>
                                <select
                                    className="select select-warning w-full max-w-xs"
                                    defaultValue="default" // Giá trị mặc định
                                    onChange={(e) => setAlbums_id(e.target.value)} // Sự kiện onChange để theo dõi giá trị thay đổi
                                >
                                    <option value="default" disabled>Lựa chọn albums</option>
                                    {albumspt.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>


                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Đưa tất cả hình ảnh của albums lên
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

        </div>
    )
}

export default AddPhotoToAlbums
