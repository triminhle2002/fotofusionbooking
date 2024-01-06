import React, { useContext, useEffect, useState } from 'react'
import * as ordersApi from '../../apis/order'
import AuthContext from '../../context/authProvider';
import { Table } from 'flowbite-react';
import { formatCurrency, formatDateTime } from '../helples/Format'


const MyOrder = () => {
    const [orderList, setOrderList] = useState([])
    const [orderDetailList, setOrderDetailList] = useState([])
    const { auth } = useContext(AuthContext);
    const [viewId, setViewId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ordersApi.getOrderByUserId(auth.accessToken, auth.id);
                console.log(response);
                setOrderList(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        if (auth.accessToken && auth.id) {
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

    return (
        <div>
            <div className='w-full flex items-center justify-center m-2'>
                <span className='text-2xl font-semibold text-blue-600'>Quản Lí Đơn Đặt Hàng</span>
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
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default MyOrder
