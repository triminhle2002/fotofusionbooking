import React, { useContext, useEffect, useState } from 'react'
import * as photo from '../../../apis/photo'
import * as blogpostApi from '../../../apis/blogpost'
import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../config/firebase.config';
import { v4 } from "uuid";


const AddBlogPost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [date, setDate] = useState('')

    const [img_name, setimg_name] = useState('baivietFotofushion')
    const [blog_id, setBlog_id] = useState('')
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
                const imageRef = ref(storage, `/Blog/${imageUpload.name + v4()}`);
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
        const fetchAdd = async () => {
            try {
                const addItems = await blogpostApi.CreateABlogPost(auth.accessToken, title, content, author, date);
                console.log('productid lấy từ đấu' + addItems.statusCode);

                setBlog_id(addItems.id);
                if (addItems.statusCode === 201) {
                    notify("Thêm bài viết mới thành công", 'success');
                    setLoading(false);
                    setSubmit(false);
                } else {
                    notify("Thêm bài viết mới không thành công");
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

    //Thêm hình ảnh vào bảng hình ảnh

    useEffect(() => {
        if (blog_id && imageUrls.length === imageUploads.length) {
            console.log(blog_id);
            const performAddProduct = async () => {
                try {
                    // Use Promise.all to handle asynchronous operations in map
                    await Promise.all(imageUrls.map(async (url_photo) => {

                        const addEquipmentPhoto = await photo.updateBlogPhoto(auth.accessToken, img_name, url_photo, blog_id);
                        if (addEquipmentPhoto.statusCode === 201) {
                            //notify(addEquipmentPhoto.response.message, 'success');
                            setLoading(false);
                            setSubmit(false);
                        } else {
                            // notify(addEquipmentPhoto.error.message);
                            setLoading(false);
                            setSubmit(false);
                        }
                    }));
                } catch (error) {
                    console.error('Error in performaddEquipmentPhoto:', error);
                    setLoading(false);
                    setSubmit(false);
                }
            };

            // Call the function when prod_id changes
            performAddProduct();
        }
    }, [imageUrls]);


    const handleSubmit = (e) => {
        e.preventDefault();
        uploadFile();
        setSubmit(true);
        setLoading(true);
    };
    return (
        <>
            <ToastContainer />
            <div className='flex items-center justify-center'>
                <div className='w-2/3 bg-black h-auto m-4 p-4 flex items-center justify-center'>
                    <span className=' text-white text-2xl'>Thêm một bài viết mới </span>
                </div>
            </div>
            <div className='w-full '>
                <div className='flex items-center justify-center'>
                    <div className='w-[80%] p-8 border border-black rounded-lg shadow-xl'>
                        <form action="" onSubmit={(e) => handleSubmit(e)}>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập Tiêu Đề của bài viết
                                </label>
                                <input
                                    id="nameInput"
                                    className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                    required
                                    type="text"
                                    autoComplete=""
                                    placeholder="Tên của bài viết"
                                    onChange={(event) => setTitle(event.target.value)}
                                    value={title}
                                />
                            </div>

                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập nội dung của bài viết
                                </label>
                                <textarea
                                    id="contenInput"
                                    rows="4"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Nhập mô tả"
                                    onChange={(event) => setContent(event.target.value)}
                                    value={content}
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className="w-[48%] flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập tác giả của bài viết
                                    </label>
                                    <input
                                        id="authorInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="text"
                                        autoComplete=""
                                        placeholder="...............VNĐ"
                                        onChange={(event) => setAuthor(event.target.value)}
                                        value={author}
                                    />
                                </div>
                                <div className="w-[48%] flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập ngày đăng bài
                                    </label>
                                    <input type="date"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Đưa hình ảnh của  bài viết lên
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
        </>
    )
}

export default AddBlogPost
