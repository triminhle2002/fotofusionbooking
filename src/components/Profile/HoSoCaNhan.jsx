import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/authProvider';
import AddAddress from './AddAddress';
import * as userApi from '../../apis/user'
import { FileInput, Label } from 'flowbite-react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../config/firebase.config';
import { v4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';


const HoSoCaNhan = () => {
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
    const { auth, setAuth } = useContext(AuthContext);
    const [address, setAddress] = useState();
    const [fullName, setFullName] = useState();

    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [avatar, setAvatar] = useState();

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        console.log(auth);
        if (auth) {
            setAddress(auth.address)
            setAvatar(auth.avatar)
            setEmail(auth.email)
            setPhone(auth.phone)
            setGender(auth.gender)
            setFullName(auth.fullName)
        }
    }, [auth])

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
                const imageRef = ref(storage, `/avatar/${v4()}`);
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

    const updateInformationIncludAvatar = async () => {
        if (imageUrls.length === imageUploads.length) {
            console.log(imageUrls[0]);
            try {
                const updateInfo = await userApi.updateImformationIncludeAvatar(auth.accessToken, auth.id, fullName, imageUrls[0]);
                const updateNumber = await userApi.updatePhoneNumber(auth.accessToken, auth.email, phone);

                if (updateInfo.statusCode === 200 && updateNumber.statusCode === 200) {
                    const updatedAuth = {
                        ...auth,
                        fullName: fullName,
                        phone: phone,
                        avatar: imageUrls[0]
                    };
                    setAuth(updatedAuth);
                    localStorage.setItem('auth', JSON.stringify(updatedAuth));
                    notify("Cập Nhật Thông Tin Và Hình Ảnh Thành Công", "success")
                    setImageUrls([])
                }
                else {
                    notify("Cập Nhật Thông Tin Và Hình Ảnh Không Thành Công")

                }

            } catch (error) {
                notify("Cập Nhật Thông Tin Và Hình Ảnh Không Thành Công")


            }
        }
    }
    const updateNamePhone = async () => {
        try {
            const updateInfo = await userApi.updateName(auth.accessToken, auth.id, fullName);
            const updateNumber = await userApi.updatePhoneNumber(auth.accessToken, auth.email, phone);

            if (updateInfo.statusCode === 200 && updateNumber.statusCode === 200) {
                const updatedAuth = {
                    ...auth,
                    fullName: fullName,
                    phone: phone,
                };
                setAuth(updatedAuth);
                localStorage.setItem('auth', JSON.stringify(updatedAuth));
                notify("Cập Nhật Thông Tin Thành Công", "success")
            }
            else {
                notify("Cập Nhật Thông Tin Không Thành Công")

            }

        } catch (error) {
            notify("Cập Nhật Thông Tin Không Thành Công", "success")
        }
    }
    const handleGenderChange = async () => {
        if (auth.accessToken && auth.id) {
            try {
                const updateGender = await userApi.updateGender(auth.accessToken, auth.id, gender);
                if (updateGender.statusCode === 200) {
                    const updatedAuth = {
                        ...auth,
                        gender: gender,
                    };
                    setAuth(updatedAuth);
                    localStorage.setItem('auth', JSON.stringify(updatedAuth));
                    notify("Cập Nhật Thông Tin Giới Tính Thành Công", "success");
                } else {
                    notify("Cập Nhật Thông Tin Giới Tính  Không Thành Công");
                }
            } catch (error) {
                console.error("Error updating gender:", error);
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            await uploadFile()
            updateInformationIncludAvatar()
        }
        else {
            updateNamePhone()
        }

    };
    return (
        <>
            <ToastContainer />
            <div className='w-2/3 h-auto'>
                <div className='p-4 rounded shadow-sm m-2 w-full text-white border bg-black opacity-80'>
                    <div className='flex items-center justify-center'>
                        <div className="flex flex-col items-center pb-2">
                            <div className="avatar">
                                <div className="w-36 rounded-full">
                                    <img src={avatar} />
                                </div>
                            </div>
                            <h5 className="mb-1 text-xl font-medium text-white">{fullName}</h5>
                            <span className=" text-white text-xl">{phone}</span>
                            <h5 className="mb-1 text-xl font-medium text-white">{email}</h5>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className="btn btn-info mt-3" onClick={() => document.getElementById('my_modal_4 name').showModal()}>Thay Đổi</button>
                    </div>
                    <dialog id="my_modal_4 name" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl" >
                            <div className='w-full max-sm:w-full max-md:w-full'>
                                <div class="mb-4">
                                    <label class="block text-gray-700 font-bold mb-2" for="phone">
                                        Chọn ảnh đại diện
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
                                <div className='flex items-center justify-between'>

                                    <div class="mb-4 w-[48%]">
                                        <label class="block text-gray-700 font-bold mb-2" >
                                            Sửa Tên của bạn
                                        </label>
                                        <input
                                            className="textarea textarea-warning w-full text-black"
                                            id="name" placeholder={fullName} onChange={(event) => setFullName(event.target.value)} >
                                        </input>
                                    </div>
                                    <div class="mb-4 w-[48%]">
                                        <label class="block text-gray-700 font-bold mb-2" >
                                            Sửa số điện thoại của bạn
                                        </label>
                                        <input
                                            className="textarea textarea-warning w-full text-black"
                                            id="phone" type='number' placeholder={phone} onChange={(event) => setPhone(event.target.value)} >
                                        </input>
                                    </div>
                                </div>

                            </div>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button, it will close the modal */}
                                    <button className="btn btn-outline btn-success px-8" onClick={handleSubmit} >Lưu</button>
                                    <button className="btn btn-outline btn-warning px-8 m-2">Đóng</button>

                                </form>
                            </div>
                        </div>
                    </dialog>
                    <div className='flex items-center justify-center'>
                        <div className='w-[80%]'>
                            <div className=' flex items-center justify-between'>
                                <div class="mb-4 max-sm:text-xs w-[75%]">
                                    <label class="block text-white font-bold mb-2" for="address">
                                        Địa chỉ
                                    </label>
                                    <input
                                        className={`input input-bordered w-full max-w-xs max-sm:text-xs text-black font-semibold leading-tight focus:outline-none focus:shadow-outline`}
                                        id="address"
                                        type="text"
                                        value={address ? address : "Bạn chưa thêm thông tin địa chỉ"}
                                        name="address"
                                    />
                                </div>
                                <div >
                                    <button className="btn btn-info mt-3" onClick={() => document.getElementById('my_modal_4').showModal()}>Thay Đổi</button>
                                </div>
                                <dialog id="my_modal_4" className="modal">
                                    <div className="modal-box w-11/12 max-w-5xl" >
                                        <AddAddress />
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button, it will close the modal */}
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>

                            </div>

                            <div className="mb-4 max-sm:text-xs">
                                <label className="block text-white font-bold mb-2" htmlFor="gender">
                                    Giới Tính
                                </label>

                                <select
                                    className={`input input-bordered input-warning w-full max-w-xs max-sm:text-xs text-black font-semibold leading-tight focus:outline-none focus:shadow-outline`}
                                    id="gender"
                                    value={gender}
                                    name="gender"
                                    onChange={(e) => {
                                        setGender(e.target.value);
                                        handleGenderChange();
                                    }}
                                >
                                    {/* <option disabled>Chưa có thông tin</option> */}
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default HoSoCaNhan
