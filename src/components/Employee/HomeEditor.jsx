import React, { useContext, useEffect, useState } from 'react'
import * as requestApi from '../../apis/request'
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../config/firebase.config';
import { v4 } from "uuid";
import { Label, FileInput } from 'flowbite-react';
import { Spinner } from '@material-tailwind/react';

const HomeEditor = () => {
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
    const { auth } = useContext(AuthContext);
    const [requests, setRequests] = useState([])
    const [status, setStatus] = useState('')
    const [requestId, setRequestId] = useState('')

    const [reloadPage, setReloadPage] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        if (/*!isModalOpen && */reloadPage) {
            window.location.reload();
        }
    }, [/*isModalOpen*/, reloadPage]);

    //loadphoto
    const [imageUploads, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

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
                const imageRef = ref(storage, `/PhotoEdit/${imageUpload.name + v4()}`);
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
        const fetchAdd = async () => {
            try {
                const request = await requestApi.getRequest(auth.accessToken);
                console.log(request);
                setRequests(request)
            } catch (error) {
                console.error('Error in fetchAdd:', error);
            }
        };
        if (auth.accessToken !== undefined) {
            fetchAdd();
        }
    }, [auth.accessToken])
    // useEffect(() => {
    //     console.log(requests);
    // }, [requests])

    const submitStatus = async (id) => {
        try {
            const subSta = await requestApi.updateStatus(auth.accessToken, id, status)
            if (subSta.statusCode === 200) {
                if (status === "Đang Thực Hiện") {
                    notify("Bạn nhận chỉnh sửa hình ảnh thành công", "success")
                    setReloadPage(true)
                    setStatus(null)
                } else notify("Bạn đã hoàn thành chỉnh sửa hình ảnh", "success")
            }
        } catch (error) {
            console.error('Error in fetchAdd:', error);
        }
    }
    const openModal = (item) => {
        setSelectedItem(item);
        // Hiển thị modal
        document.getElementById('my_modal_2').showModal();
    };
    const openModalComplete = (item) => {
        setSelectedItem(item);
        setRequestId(item.id)
        // Hiển thị modal
        document.getElementById('my_modal_2 complete').showModal();
    };
    useEffect(() => {
        if (requestId !== '' && imageUrls.length === imageUploads.length) {
            //console.log(imageUrls[0]);
            const performAddRequest = async () => {
                try {
                    const requestData = await requestApi.updateNewPhoto(auth.accessToken, requestId, imageUrls[0], status)
                    if (requestData.statusCode === 200) {
                        notify("Bạn gửi yêu cầu thành công", "success")
                        setLoading(false)
                        setSubmit(false);
                        setSelectedFile(null)
                        /// setMessage(null)
                    }
                    else {
                        notify("Bạn gửi yêu cầu thất bại")
                        setLoading(false)
                        setSubmit(false);
                    }
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
        if (!selectedFile) {
            notify("Vui lòng chọn ảnh.", "error");
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
    };
    return (
        <>
            <ToastContainer />/
            <div className='w-full'>
                <div className='flex items-center justify-center border border-black'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Products%2FbannerEditor.png?alt=media&token=1666224e-7e7c-454c-a307-64eb9bbe85b7" alt="" />
                </div>
                <div className='flex items-center justify-center'>
                    <h1 className='font-bold text-5xl m-10'>Bảng Công Việc Của Chỉnh Sửa Hình Ảnh</h1>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='w-3/4'>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Hình Ảnh</th>
                                        <th>Yêu Cầu</th>
                                        <th>Tình Trạng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {requests.map((item) => {
                                        return (
                                            <tr>

                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-24 h-24">
                                                                <img src={item.img_url_old} alt="photo" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>
                                                <td className='w-1/2'>
                                                    <span className='line-clamp-3'>{item.request}</span>
                                                </td>
                                                <td>
                                                    {item.status === 'Chưa Thực Hiện' && (
                                                        <div>
                                                            <span>{item.status}</span>
                                                            <br />
                                                            <button className="btn btn-outline btn-success "
                                                                onClick={() => { setStatus("Đang Thực Hiện"); submitStatus(item.id) }}
                                                            >Nhận Chỉnh Sửa</button>
                                                        </div>

                                                    )}
                                                    {item.status === 'Đang Thực Hiện' && (
                                                        <div>
                                                            <span>{item.status}</span>
                                                            <br />
                                                            <button className="btn btn-outline btn-success"
                                                                onClick={() => { setStatus("Hoàn Thành"); openModalComplete(item) }}
                                                            >Hoàn Thành</button>
                                                        </div>
                                                    )}
                                                </td>

                                                <th>
                                                    <button className="btn btn-success"
                                                        onClick={() => openModal(item)}
                                                    >Xem Chi Tiết</button>
                                                </th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <img className="mask mask-decagon" src={selectedItem ? selectedItem.img_url_old : "https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg"} />
                        <p className="py-4">{selectedItem ? selectedItem.request : ''}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

                <dialog id="my_modal_2 complete" className="modal">
                    <div className="modal-box">
                        <form action="" onSubmit={(e) => handleSubmit(e)}>
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
                            <div className="flex justify-center m-4">
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
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </>
    )
}

export default HomeEditor
