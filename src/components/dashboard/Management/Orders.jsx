import React, { useContext, useEffect, useState } from 'react'
import * as ordersApi from '../../../apis/order'
import AuthContext from '../../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import { Table, Button, Modal } from 'flowbite-react';
import { formatCurrency, formatDateTime } from '../../helples/Format'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const Order = () => {
    const [orderList, setOrderList] = useState([])
    const [orderDetailList, setOrderDetailList] = useState([])
    const { auth } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);
    const [viewId, setViewId] = useState('')
    const [deleteItem_id, setDeleteItem_id] = useState(false);
    const [delete_order, setDelete_order] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reloadPage, setReloadPage] = useState(false);
    useEffect(() => {
        if (!isModalOpen && reloadPage) {
            window.location.reload();
        }
    }, [isModalOpen, reloadPage]);
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
        const fetchData = async () => {
            try {
                const response = await ordersApi.getAllOrder(auth.accessToken);
                console.log(response.data);
                setOrderList(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        if (auth.accessToken) {
            fetchData();
        }
    }, [auth]);

    useEffect(() => {
        const fetchDataOrderDetail = async () => {
            try {
                const data = await ordersApi.getOrderDetailByOrderId(auth.accessToken, viewId)
                console.log(data);
                setOrderDetailList(data)
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        }
        if (auth.accessToken) {
            fetchDataOrderDetail();
        }
    }, [viewId])

    const handleDeleteOrder = async () => {
        try {
            const deleteOrderDetail = await ordersApi.deleteAllOrderByOrderId(auth.accessToken, deleteItem_id)
            if (deleteOrderDetail === 204) {
                const deleteOrder = await ordersApi.deleteOrder(auth.accessToken, deleteItem_id);
                if (deleteOrder === 204) {
                    notify("Xóa đơn hàng thành công", 'success');
                    handleCloseModal();
                }
                else {
                    notify("Xóa đơn hàng không thành công", 'error');

                }
            }
        } catch (error) {
            notify(error, 'error');
        }
    };

    if (delete_order && auth.accessToken) {
        handleDeleteOrder();
    }

    const openDeleteModal = (id) => {
        setDeleteItem_id(id)
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
                <span className='text-2xl font-semibold'>Quản Lí Đơn Đặt Hàng</span>
            </div>

            <div className='flex items-center justify-center'>
                <div className='w-[80%] m-4'>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Ngày đặt</Table.HeadCell>
                            <Table.HeadCell>Tổng giá tiền</Table.HeadCell>
                            <Table.HeadCell>Thanh toán</Table.HeadCell>
                            <Table.HeadCell>Tiền Ship</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {orderList.map((order) => {
                                return (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell >
                                            {formatDateTime(order.order_date)}
                                        </Table.Cell>
                                        <Table.Cell>{formatCurrency(order.total_amount)}</Table.Cell>
                                        <Table.Cell>{order.payment_method}</Table.Cell>
                                        <Table.Cell>{formatCurrency(order.shipping_fee)}</Table.Cell>

                                        <Table.Cell>
                                            <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 m-1"
                                                onClick={() => { document.getElementById('my_modal_4 view').showModal(); setViewId(order.id) }}
                                            >
                                                Xem Chi Tiết
                                            </button>
                                            <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 m-1"
                                                onClick={() => openDeleteModal(order.id)}
                                            >
                                                Xóa
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                            <dialog id="my_modal_4 view" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl">
                                    <div className='flex items-center justify-center'>
                                        <div className="overflow-x-auto">
                                            <table className="table">
                                                {/* head */}
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Tên Sản Phẩm</th>
                                                        <th>Loại Sản Phẩm</th>
                                                        <th>Giá Cũ</th>
                                                        <th>Giá Mới</th>
                                                        <th>Số Lượng</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderDetailList.map((order, index) => (
                                                        <tr key={index}>
                                                            <th>{index}</th>
                                                            <td>{order.name}</td>
                                                            <td>{order.category}</td>
                                                            <td>{formatCurrency(order.price)}</td>
                                                            <td>{formatCurrency(order.discounted_price)}</td>
                                                            <td>{order.quantity}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
                                            <button className="btn" >Close</button>
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
                                            <Button color="failure" onClick={() => { setOpenModal(false); setDelete_order(true) }}>
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
        </div >
    )
}

export default Order
