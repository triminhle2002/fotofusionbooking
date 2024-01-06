import React, { useContext, useEffect, useState } from 'react'
import * as bookingApi from '../../../apis/booking'
import AuthContext from '../../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import { Table, Button, Modal } from 'flowbite-react';

import EditBooking from '../edid/editBooking';

import { HiOutlineExclamationCircle } from 'react-icons/hi'

import { formatDateTime, formatCurrency } from '../../helples/Format'

const Booking = () => {
    const [listBooking, setListBooking] = useState([])
    const { auth } = useContext(AuthContext);
    const [booking_id, setBooking_id] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [delete_booking, setDelete_booking] = useState(false);
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
                const response = await bookingApi.getAllBookingDetails(auth.accessToken);
                console.log(response);
                setListBooking(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách booking:', error);
            }
        };
        if (auth.accessToken !== undefined) {
            fetchData();
        }
    }, [auth.accessToken]);

    const handleConfirmStatus = async (id, email, booking_time) => {

        try {
            const updateStatusBooking = await bookingApi.updateStatus(auth.accessToken, id)
            if (updateStatusBooking.statusCode === 200) {
                const sendMail = await bookingApi.sendMailConfirmBooking(auth.accessToken, email, booking_time)
                if (sendMail.statusCode === 200) {
                    setReloadPage(true);
                    notify("Lịch đã được xác nhận, và gửi email thành công", 'success')
                }
            }
            else {
                notify("Lịch không được xác nhận ")
            }
        } catch (error) {
            notify('Lỗi', 'error');
        }
    }
    const handleConfirmPaymentStatus = async (id) => {
        try {
            const updateStatusBooking = await bookingApi.updatePaymentStatus(auth.accessToken, id)
            if (updateStatusBooking.statusCode === 200) {

                await notify("Đã xác nhận thanh toán", 'success')
                setLoading(false)
                setReloadPage(true);
            }
            else {
                notify("Thanh toán không được xác nhận ")
                setLoading(false)

            }
        } catch (error) {
            notify('Lỗi', 'error');
        }
    }


    const handleDeleteBooking = async () => {
        try {
            const deleteBooking = await bookingApi.deleteBooking(auth.accessToken, booking_id);
            // console.log(deleteBooking.statusCode);
            if (deleteBooking.statusCode === 204) {
                await notify("Xóa lịch đặt thành công", 'success');
                handleCloseModal();
                setLoading(false)
            }
            else {
                notify("Xóa lịch đặt không thành công");
                setLoading(false)
            }
        } catch (error) {
            notify(error, 'error');
        }
    };

    if (delete_booking) {
        handleDeleteBooking();
    }

    // mở modal sửa
    const openEditModal = (item) => {
        setSelectedItem(item);
        document.getElementById('my_modal_4 edit').showModal();
    };

    // mở modal xóa

    const openDeleteModal = (id) => {
        setBooking_id(id)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setReloadPage(true);
    };
    return (
        <div>
            <ToastContainer />
            <div className='w-full flex items-center justify-center m-2'>
                <span className='text-2xl font-semibold'>Quản Lí Lịch Đặt Chụp Ảnh</span>
            </div>

            <div className='flex items-center justify-center'>
                <div className='w-[95%] m-4'>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>STT</Table.HeadCell>
                            <Table.HeadCell>Ngày Chụp</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Số Điện Thoại</Table.HeadCell>
                            <Table.HeadCell>Tin Nhắn</Table.HeadCell>
                            <Table.HeadCell>Giá</Table.HeadCell>
                            <Table.HeadCell>Thanh toán</Table.HeadCell>
                            <Table.HeadCell>Xác nhận</Table.HeadCell>

                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {listBooking.map((item, index) => {
                                return (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            {index}
                                        </Table.Cell>
                                        <Table.Cell>{formatDateTime(item.booking_time)}</Table.Cell>
                                        <Table.Cell>{item.email}</Table.Cell>
                                        <Table.Cell>{item.phone_number}</Table.Cell>
                                        <Table.Cell>{item.messenger}</Table.Cell>
                                        <Table.Cell>{formatCurrency(item.price)}</Table.Cell>
                                        <Table.Cell className='p-0 font-bold border-r'>
                                            {item.payment_status === 'Chưa Thanh Toán' ? (
                                                <div>
                                                    <span className='text-red-600'>{item.payment_status}</span>
                                                    {loading
                                                    }
                                                    <button
                                                        className="btn btn-success mt-2"
                                                        onClick={() => { handleConfirmPaymentStatus(item.id); setLoading(true) }}
                                                    >
                                                        {loading ? (
                                                            <div className="flex items-center justify-center">
                                                                <span className="loading loading-infinity loading-xs">Loading...</span>
                                                            </div>
                                                        ) : (
                                                            <span>Thanh Toán</span>
                                                        )}
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className='text-green-500'>{item.payment_status}</span>
                                            )}
                                        </Table.Cell>

                                        <Table.Cell className='p-0 font-bold'>
                                            {item.status === 'Chưa Xác Nhận' ? (
                                                <div>
                                                    <span className='text-red-500'>{item.status}</span>
                                                    <button

                                                        className="btn btn-success mt-2"
                                                        onClick={() => { handleConfirmStatus(item.id, item.email, item.booking_time); setLoading(true) }}
                                                    >
                                                        {loading ? (
                                                            <div className="flex items-center justify-center">
                                                                <span className="loading loading-infinity loading-xs">Loading...</span>
                                                            </div>
                                                        ) : (
                                                            <span>Xác Nhận</span>
                                                        )}
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className='text-green-500 ml-4'>{item.status}</span>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell className='p-0'>
                                            <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 "
                                                onClick={() => openEditModal(item)}>
                                                Chi tiết
                                            </button>
                                            <br />
                                            <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 m-1"
                                                onClick={() => openDeleteModal(item.id)}>
                                                Xóa
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                            <dialog id="my_modal_4 edit" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl">
                                    <EditBooking item={selectedItem} />
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
                                            <button className="btn">Close</button>
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
                                            Bạn có chắc rằng bạn muốn xóa dịch vụ này của khách hàng này?
                                        </h3>
                                        <div className="flex justify-center gap-4">
                                            <Button color="failure" onClick={() => { setOpenModal(false); setDelete_booking(true) }}>
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

export default Booking
