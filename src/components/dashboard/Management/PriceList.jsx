import React, { useContext, useEffect, useState } from 'react'
import AddpriceList from '../add/AddPriceList'
import { Table, Button, Modal } from 'flowbite-react';

import AuthContext from '../../../context/authProvider';
import * as priceList from '../../../apis/priceList'

import EdidPriceList from '../edid/edidPriceList';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

import { formatCurrency, formatDateTime } from '../../helples/Format'


const PriceList = () => {
    const [equipments, setEquipments] = useState([])
    const { auth } = useContext(AuthContext);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [equip_id, setEquip_id] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [delete_costumer, setDelete_costumer] = useState(false);
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
        console.log(auth.accessToken);
        const fetchData = async () => {
            try {
                const response = await priceList.getAllPriceList(auth.accessToken);
                // console.log(response);
                setEquipments(response);

            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        fetchData();
    }, []);
    const handleDeleteImage = async () => {
        try {
            const deleteCostumer = await priceList.deletePriceList(auth.accessToken, equip_id);
            console.log(deleteCostumer.statusCode);
            if (deleteCostumer.statusCode === 204) {
                notify("Xóa bảng giá thành công", 'success');
                handleCloseModal();
            }
            else {
                notify("Xóa bảng giá không thành công", 'error');

            }
        } catch (error) {
            notify(error, 'error');
        }
    };

    if (delete_costumer) {
        handleDeleteImage();
    }
    const openEditModal = (costumer) => {
        console.log(costumer);
        setSelectedCustomer(costumer);
        document.getElementById('my_modal_4 edit').showModal();
    };
    const openDeleteModal = (id) => {
        setEquip_id(id)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setReloadPage(true);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const filteredFriceList = equipments.filter((studio) => {
        const lowerCaseName = studio.name.toLowerCase();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return lowerCaseName.includes(lowerCaseSearchTerm);
    });
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <div>
            <ToastContainer />
            <div className='w-full flex items-center justify-center m-2'>
                <span className='text-2xl font-semibold'>Quản Lí Bảng Giá</span>
            </div>
            <div className='flex items-center justify-center'>
                <div className='w-3/5 h-10 m-4 flex items-center justify-center'>
                    <div class='w-3/4 mx-auto'>

                        <input className="input input-bordered input-error w-full max-w-xs" placeholder="Nhập loại bảng giá bạn cần tìm" onChange={handleSearchInputChange} />

                    </div>
                    <div className='flex items-center justify-center'>
                        <Button gradientMonochrome="lime" onClick={() => document.getElementById('my_modal_4_1').showModal()}>Thêm Bảng Giá Mới</Button>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_4_1" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <AddpriceList />
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => handleCloseModal()}>✕</button>
                            <button className="btn" onClick={() => handleCloseModal()}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className='flex items-center justify-center'>
                <div className='w-[95%] m-4'>
                    <Table>
                        <Table.Head className='font-bold text-black'>
                            <Table.HeadCell className='flex items-center justify-center'>Tên</Table.HeadCell>
                            <Table.HeadCell className='flex items-center justify-center'>Giá</Table.HeadCell>
                            <Table.HeadCell >Vị trí</Table.HeadCell>
                            <Table.HeadCell>Mô tả </Table.HeadCell>
                            <Table.HeadCell>khách hàng đạt được</Table.HeadCell>

                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {filteredFriceList.map((item) => {
                                return (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className='font-bold text-black'>
                                            {item.name}
                                        </Table.Cell>
                                        <Table.Cell>{formatCurrency(item.price)}</Table.Cell>
                                        <Table.Cell>{item.location}</Table.Cell>
                                        <Table.Cell>{item.description}</Table.Cell>
                                        <Table.Cell>{item.additional_info}</Table.Cell>
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
                                    <EdidPriceList pricelist={selectedCustomer} />
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
                                            Bạn có chắc rằng bạn muốn xóa trang phục này?
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

export default PriceList
