import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import { FileInput, Label } from 'flowbite-react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../config/firebase.config';
import { v4 } from "uuid";
import { Spinner } from '@material-tailwind/react';

import * as vnpayApi from '../../apis/vnpay'
import { formatCurrency } from '../helples/Format'

const RequestEditPage = () => {
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { auth } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState(null);
    const EditFee = 100000;


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
        window.scrollTo(0, 0);
    }, [])
    const [imageUploads, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const handleFileChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImageUpload((prevState) => [...prevState, newImage]);
            setSelectedFile(newImage)
        }
    };
    const uploadFile = async () => {
        await Promise.all(
            imageUploads.map(async (imageUpload) => {
                const imageRef = ref(storage, `/PhotoEdit/${v4()}`);
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
        if (imageUrls.length === imageUploads.length) {
            //console.log(imageUrls[0]);
            const performAddRequest = async () => {
                try {
                    const requestData = await vnpayApi.creatPayment(EditFee, auth.email, 2, 8, imageUrls[0], message)

                } catch (error) {
                    setLoading(false)
                    setSubmit(false)
                }
            }
            if (submit) {
                performAddRequest()
            }
        }
    }, [submit, imageUrls])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (auth && Object.keys(auth).length > 0) {
            if (!selectedFile) {
                notify("Vui lòng chọn ảnh.", "error");
                return;
            }
            if (!message) {
                notify("Vui lòng nhập mô tả yêu cầu.", "error");
                return;
            }
            setLoading(true);
            try {
                await uploadFile();

                setSubmit(true);
            } catch (error) {
                // Handle the error if the upload fails
                // console.error("Error during file upload:", error);
                notify("Đã xảy ra lỗi trong quá trình tải ảnh lên.", "error");
                setLoading(false);
            }
        } else {
            notify("Bạn phải đăng nhập để sử dụng dịch vụ này")
        }

    };
    return (
        <>
            <ToastContainer />
            <div className='w-full bg-black'>
                <div className='flex items-center justify-center '>
                    <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Products%2FbannerEditor.png?alt=media&token=1666224e-7e7c-454c-a307-64eb9bbe85b7" alt="" />
                </div>
                <div className='flex justify-center items-center'>
                    <div className='w-2/3 p-4'>
                        <form action="" onSubmit={(e) => handleSubmit(e)}>
                            <div className='p-4 border rounded shadow-sm m-2 bg-white'>
                                <div className='w-full flex items-center justify-center'>
                                    <div class="w-full text-2xl py-4 px-6 bg-btnprimary text-white text-center font-bold uppercase border rounded-xl">
                                        THÔNG TIN CHỈNH SỬA
                                    </div>
                                </div>

                                <div className='w-full mt-6'>
                                    <div>
                                        <div class="mb-4 w-full">
                                            <label class=" text-gray-700 font-bold my-4 flex items-start justify-start text-2xl" >
                                                Giá cố định :
                                                <span className=' text-red-700 ml-10'>
                                                    {formatCurrency(EditFee)}
                                                </span>
                                            </label>
                                            <label class="block text-gray-700 font-bold mb-2" for="phone">
                                                Thanh toán online qua VNPay
                                            </label>
                                        </div>

                                        <div className='w-full max-sm:w-full max-md:w-full'>
                                            <div class="mb-4">
                                                <label class="block text-gray-700 font-bold mb-2" for="phone">
                                                    Chọn ảnh *
                                                </label>
                                                <div className="flex w-full items-center justify-center">
                                                    <Label
                                                        htmlFor="dropzone-file"
                                                        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100dark:bg-gray-700"
                                                    >
                                                        {selectedFile ? (

                                                            <img
                                                                src={URL.createObjectURL(selectedFile)}
                                                                alt="Uploaded File"
                                                                className="max-h-64 max-w-full"
                                                            />
                                                        ) : (
                                                            // If no file is selected, display the upload UI
                                                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                                                <svg
                                                                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 20 16"
                                                                >
                                                                    {/* Your SVG path here */}
                                                                </svg>
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
                                                            </div>
                                                        )}
                                                        <FileInput
                                                            id="dropzone-file"
                                                            className="hidden"
                                                            onChange={handleFileChange}
                                                        />
                                                    </Label>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="mb-4 w-full">
                                            <label class="block text-gray-700 font-bold mb-2" for="message">
                                                Mô tả yêu cầu
                                            </label>
                                            <textarea
                                                className="textarea textarea-warning w-full"
                                                id="message" rows="4" placeholder="Nhập yêu cầu hoặc ý tưởng của bạn về yêu cầu chỉnh sửa ảnh..." onChange={(event) => setMessage(event.target.value)} >
                                            </textarea>
                                        </div>

                                    </div>
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
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>

    );
};

export default RequestEditPage;