import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Modal } from 'flowbite-react';
import AuthContext from '../../../context/authProvider';
import * as equipment from '../../../apis/equipment'
import * as photo from '../../../apis/photo'
import * as firebase from '../../../apis/firebase'
import AddEquipment from '../add/AddEquipment'
import EdidEquipment from '../edid/edidEquipment';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { formatCurrency, formatDateTime } from '../../helples/Format'


const Equipment = () => {
    const [equipments, setEquipments] = useState([])
    const { auth } = useContext(AuthContext);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [equip_id, setEquip_id] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [delete_costumer, setDelete_costumer] = useState(false);
    const [url_photo, setUrl_photo] = useState('')

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reloadPage, setReloadPage] = useState(false);


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
        if (!isModalOpen && reloadPage) {
            window.location.reload();
        }
    }, [isModalOpen, reloadPage]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await equipment.getEquipment(auth.accessToken);
                // console.log(response);
                setEquipments(response);

            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(equip_id);
        const fetchData = async () => {
            try {
                const dataPhoto = await photo.getListPhotoByEquipmentId({ equip_id });
                setUrl_photo(dataPhoto.url_photo)
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        fetchData();
    }, [equip_id]);

    const handleDeleteImage = async () => {
        try {
            const deleteSuccess = await firebase.deleteImage(url_photo);
            if (deleteSuccess) {
                const deletePhoto = await photo.deletePhotoByEquipmentId(auth.accessToken, equip_id)
                if (deletePhoto.statusCode === 204) {
                    const deleteCostumer = await equipment.deleteEquipment(auth.accessToken, equip_id)
                    if (deleteCostumer.statusCode === 204) {
                        notify("Xóa thiết bị thành công", 'success');
                        handleCloseModal();
                    }
                    else {
                        notify("Xóa thiết bị không thành công", 'error');
                    }
                }
                else {
                    notify("Xóa hình ảnh thiết bị không thành công", 'error');
                }
            }
            else {
                // Xóa không thành công, thực hiện xử lý tương ứng
                notify("Xóa hình ảnh trên firebase không thành công", 'error');
            }

        } catch (error) {
            notify("Xóa thiết bị không thành công", 'error');

        }
    };
    if (delete_costumer) {
        handleDeleteImage();
    }


    const openEditModal = (costumer) => {
        setSelectedCustomer(costumer);
        document.getElementById('my_modal_4 edit').showModal();
    };
    const openDeleteModal = (id) => {
        setEquip_id(id)
        setOpenModal(true)
    }

    useEffect(() => {
        console.log(equipments);

    }, [equipments])

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setReloadPage(true);
    };
    const [equipmentsCategory, setEquipmentCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await equipment.getAllCategoryOfEquipment();
                //console.log(response);
                setEquipmentCategory(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        fetchData();
    }, []);
    const filteredStudios = equipments.filter((studio) => {
        const lowerCaseName = studio.name.toLowerCase();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const isNameMatch = lowerCaseName.includes(lowerCaseSearchTerm);
        if (selectedCategory) {
            return isNameMatch && studio.category === selectedCategory;
        }
        return isNameMatch;
    });
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <div>
            <ToastContainer />
            <div className='w-full flex items-center justify-center m-2'>
                <span className='text-2xl font-semibold'>Quản Lí Thiết Bị Cho Thuê</span>
            </div>
            <div className='flex items-center justify-center'>
                <div className='w-3/5 h-10 m-4 flex items-center justify-center'>
                    <div class='w-1/2 mx-auto'>
                        <div className="join">
                            <div>
                                <div>
                                    <input className="input input-bordered join-item" placeholder="Nhập tên trang phục bạn cần tìm" onChange={handleSearchInputChange} />
                                </div>
                            </div>
                            <select className="select select-bordered join-item"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option disabled selected>Lựa chọn</option>
                                {equipmentsCategory.map((item) => {
                                    return (
                                        <option>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Button gradientMonochrome="lime" onClick={() => document.getElementById('my_modal_4_1').showModal()}>Thêm Thiết Bị Mới</Button>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_4_1" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <AddEquipment />
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => handleCloseModal()}>✕</button>
                            <button className="btn" onClick={() => handleCloseModal()}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className='flex items-center justify-center'>
                <div className='w-[80%] m-4'>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Tên</Table.HeadCell>
                            <Table.HeadCell>Giá</Table.HeadCell>
                            <Table.HeadCell>Loại</Table.HeadCell>
                            <Table.HeadCell>Số lượng</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {filteredStudios.map((item) => {
                                return (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item.name}
                                        </Table.Cell>
                                        <Table.Cell>{formatCurrency(item.price)}</Table.Cell>
                                        <Table.Cell>{item.category}</Table.Cell>
                                        <Table.Cell>{item.quantity}</Table.Cell>

                                        <Table.Cell>
                                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 m-1 "
                                                onClick={() => openEditModal(item)}>
                                                Sửa
                                            </a>
                                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 m-1"
                                                onClick={() => openDeleteModal(item.id)}>
                                                Xóa
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                            <dialog id="my_modal_4 edit" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl">
                                    <EdidEquipment equipment={selectedCustomer} />
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => handleCloseModal()}>✕</button>
                                            <button className="btn" onClick={() => handleCloseModal()}>Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                                <Modal.Header />
                                <Modal.Body>
                                    <div className="text-center">
                                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Bạn có chắc rằng bạn muốn xóa thiết bị này?
                                        </h3>
                                        <div className="flex justify-center gap-4">
                                            <Button color="failure" onClick={() => { setOpenModal(false); setDelete_costumer(true) }}>
                                                {"Đúng, Tôi muốn xóa nó"}
                                            </Button>
                                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                                Không, Tôi nhầm lẫn
                                            </Button>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Equipment
