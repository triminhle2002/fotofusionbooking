import React, { useContext, useEffect, useState } from 'react'
import * as photo from '../../../apis/photo'
import * as costumer from '../../../apis/costumer'
import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../config/firebase.config';
import { v4 } from "uuid";


const AddCostumer = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [rental_start_date, setRental_start_date] = useState('')

    const [img_name, setimg_name] = useState('')
    const [costume_id, setCostume_id] = useState('')

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
        await Promise.all(
            imageUploads.map(async (imageUpload) => {
                const imageRef = ref(storage, `/RentalProducts/Costomer/${imageUpload.name + v4()}`);
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
                const addCostumer = await costumer.CreateACostumer(auth.accessToken, name, category, price, quantity, rental_start_date);
                console.log('productid lấy từ đấu' + addCostumer.id);
                // Update state asynchronously
                setCostume_id(addCostumer.id);
                if (addCostumer.statusCode === 201) {
                    notify("Thêm trang phục thành công ", 'success');
                    setLoading(false);
                    setSubmit(false);
                } else {
                    notify("Thêm trang phục không thành công ");
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
        if (costume_id && imageUrls.length === imageUploads.length) {
            console.log(costume_id);
            const performAddProduct = async () => {
                try {
                    // Use Promise.all to handle asynchronous operations in map
                    //await Promise.all(imageUrls.map(async (url_photo) => {
                    const dataImgCostumer = await photo.CreateAPhotoForCostumer(auth.accessToken, img_name, imageUrls[0], costume_id);
                    if (dataImgCostumer.statusCode === 201) {
                        //notify(dataImgCostumer.response.message, 'success');
                        setLoading(false);
                        setSubmit(false);
                    } else {
                        //notify(dataImgCostumer.error.message);
                        setLoading(false);
                        setSubmit(false);
                    }
                    //}));
                } catch (error) {
                    //console.error('Error in performaddEquipmentPhoto:', error);
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
            <div className='w-full bg-cover bg-center object-fill' style={{ backgroundImage: 'url("https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/402193474_1072122090448818_9070160038261961007_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=46XD4qyNmaIAX8RVsZ5&_nc_ht=scontent.fsgn2-9.fna&cb_e2o_trans=t&oh=00_AfBRK6_t3nGkeE_GH7SH7-E3F2XZsp3tPGjGc9xd8AdoJQ&oe=655F8542")' }}>
                <div className='flex items-center justify-center'>
                    <div className='w-[70%] bg-black h-auto m-4 p-4 flex items-center justify-center'>
                        <span className=' text-white text-2xl'>Thêm một sản phẩm mới </span>
                    </div>
                </div>
                <div className='w-full '>
                    <div className='flex items-center justify-center '>
                        <div className='w-[70%] p-8 border border-black rounded-lg shadow-xl bg-white m-2'>
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập tên của trang phục
                                    </label>
                                    <input
                                        id="nameInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="text"
                                        autoComplete=""
                                        placeholder="Tên của trang phục"
                                        onChange={(event) => setName(event.target.value)}
                                        value={name}
                                    />
                                </div>

                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập loại Loại trang phục (vd Vaycuoi,TrangPhucPhuDau ....)
                                    </label>
                                    <div className='flex items-center justify-between'>
                                        <input
                                            id="categoryInput"
                                            className="w-2/3 px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            required
                                            type="text"
                                            autoComplete=""
                                            placeholder="Nhập loại sản phẩm"
                                            onChange={(event) => { setimg_name(event.target.value); setCategory(event.target.value) }}
                                            value={category}
                                        />
                                        <select className=" w-[30%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg">
                                            <option disabled selected>Lựa Chọn </option>
                                            <option>Auto</option>
                                            <option>Dark mode</option>
                                            <option>Light mode</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập giá cho thuê của trang phục
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

                                <div className='flex items-center justify-between'>

                                    <div className="w-[48%] flex flex-col mb-6">
                                        <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                            Nhập số lượng hiện có
                                        </label>
                                        <input
                                            id="priceDiscountInput"
                                            className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            required
                                            type="number"
                                            autoComplete=""
                                            placeholder="...............cái"
                                            onChange={(event) => setQuantity(event.target.value)}
                                            value={quantity}
                                        />
                                    </div>
                                    <div className="w-[48%] flex flex-col mb-6">
                                        <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                            Nhập số ngày cho thuê trang phục
                                        </label>
                                        <input
                                            id="rental_Input"
                                            className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            required
                                            type="text"
                                            autoComplete=""
                                            placeholder="Nhập số ngày cho thuê"
                                            onChange={(event) => { setRental_start_date(event.target.value) }}
                                            value={rental_start_date}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Đưa hình ảnh của trang thiết bị lên
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

export default AddCostumer
