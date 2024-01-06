import { Table } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'
import { formatDateTime, formatCurrency } from '../helples/Format'
import * as bookingApi from '../../apis/booking'
import AuthContext from '../../context/authProvider';


const ListBooking = () => {
    const [listBooking, setListBooking] = useState([])
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await bookingApi.getAllBookingDetailsByUserId(auth.accessToken, auth.id);

                setListBooking(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách booking:', error);
            }
        };
        if (auth.accessToken && auth.id) {
            fetchData();
        }
    }, [auth]);
    return (
        <div className='flex items-center justify-center'>
            <div className='w-[95%] m-4'>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Ngày Chụp</Table.HeadCell>
                        <Table.HeadCell>Tin Nhắn</Table.HeadCell>
                        <Table.HeadCell>Giá</Table.HeadCell>
                        <Table.HeadCell>Thanh toán</Table.HeadCell>
                        <Table.HeadCell>Xác nhận</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {listBooking.map((item, index) => {
                            return (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{formatDateTime(item.booking_time)}</Table.Cell>
                                    <Table.Cell>{item.messenger}</Table.Cell>
                                    <Table.Cell>{formatCurrency(item.price)}</Table.Cell>
                                    <Table.Cell className='p-0 font-bold border-r'>
                                        <span className='text-green-500'>{item.payment_status}</span>
                                    </Table.Cell>
                                    <Table.Cell className='p-0 font-bold'>
                                        <span className='text-green-500 ml-4'>{item.status}</span>
                                    </Table.Cell>

                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table >
            </div>
        </div>
    )
}

export default ListBooking
