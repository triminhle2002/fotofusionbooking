import React, { useContext, useEffect, useState } from 'react'
import * as photo from '../../../apis/photo'
import * as product from '../../../apis/product'
import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL, listAll, list, } from "firebase/storage";
import { storage } from '../../../config/firebase.config';
import { v4 } from "uuid";



const AddProduct = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [discounted_price, setDiscounted_price] = useState('')


    const [img_name, setimg_name] = useState('')

    const [prod_id, setProd_id] = useState('')

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { auth } = useContext(AuthContext);

    const [imageUploads, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    //const [progress, setProgress] = useState(0);
    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImageUpload((prevState) => [...prevState, newImage]);
        }
    };
    const uploadFile = async () => {
        //const urls = [];
        await Promise.all(
            imageUploads.map(async (imageUpload) => {
                const imageRef = ref(storage, `/Products/${imageUpload.name + v4()}`);

                try {
                    const snapshot = await uploadBytes(imageRef, imageUpload);
                    const url = await getDownloadURL(snapshot.ref);
                    //urls.push(url);
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
                const addProduct = await product.addAProduct(auth.accessToken, name, description, category, price, discounted_price);
                console.log('productid lấy từ đấu' + addProduct.id);
                // Update state asynchronously
                setProd_id(addProduct.id);
                if (addProduct.statusCode === 201) {
                    notify(addProduct.response.message, 'success');
                    setLoading(false);
                    setSubmit(false);
                } else {
                    notify(addProduct.error.message);
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
        if (prod_id && imageUrls.length === imageUploads.length) {
            console.log(prod_id);
            const performAddProduct = async () => {
                try {
                    // Use Promise.all to handle asynchronous operations in map
                    // await Promise.all(imageUrls.map(async (url_photo) => {
                    const addProduct = await photo.updateProductPhoto(auth.accessToken, img_name, imageUrls[0], prod_id);
                    if (addProduct.statusCode === 201) {
                        notify(addProduct.response.message, 'success');
                        setLoading(false);
                        setSubmit(false);
                    } else {
                        notify(addProduct.error.message);
                        setLoading(false);
                        setSubmit(false);
                    }
                    // }));
                } catch (error) {
                    console.error('Error in performAddProduct:', error);
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
            <div className='flex items-center justify-center mt-40'>
                <div className='w-2/3 bg-black h-auto m-4 p-4 flex items-center justify-center'>
                    <span className=' text-white text-2xl'>Thêm một sản phẩm mới </span>
                </div>
            </div>
            <div className='w-full '>
                <div className='flex items-center justify-center'>
                    <div className='w-[50%] p-8 border border-black rounded-lg shadow-xl'>
                        <form action="" onSubmit={(e) => handleSubmit(e)}>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập tên của sản phẩm
                                </label>
                                <input
                                    id="nameInput"
                                    className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                    required
                                    type="text"
                                    autoComplete=""
                                    placeholder="Tên của phòng chụp hình"
                                    onChange={(event) => setName(event.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập mô tả của sản phẩm
                                </label>
                                <textarea
                                    id="DecriptionInput"
                                    rows="4"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Mô tả sản phẩm"
                                    onChange={(event) => setDescription(event.target.value)}
                                    value={description}
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập loại sản phẩm (vd Tranh treo tường , Poster idol , Poster cầu thủ , film , albums...s)
                                </label>
                                <input
                                    id="categoryInput"
                                    className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                    required
                                    type="text"
                                    autoComplete=""
                                    placeholder="Nhập loại sản phẩm"
                                    onChange={(event) => { setimg_name(event.target.value); setCategory(event.target.value) }}
                                    value={category}
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập giá của sản phẩm
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
                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Nhập giá sau khi giảm
                                </label>
                                <input
                                    id="priceDiscountInput"
                                    className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                    required
                                    type="number"
                                    autoComplete=""
                                    placeholder="...............VNĐ"
                                    onChange={(event) => setDiscounted_price(event.target.value)}
                                    value={discounted_price}
                                />
                            </div>

                            <div className="flex flex-col mb-6">
                                <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                    Đưa hình ảnh của sản phẩm lên
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

export default AddProduct
