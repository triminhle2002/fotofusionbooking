import React, { useEffect, useState } from 'react'
import logoFushion from "../../public/img/logoFushion.jpg";
import { Button } from 'flowbite-react';
import Order from './Management/Orders';
import Account from './Management/Account';
import Equipment from './Management/Equipment'
import Costumer from './Management/Costumer';
import Room from './Management/Room';
import BlogPost from './Management/BlogPost';
import Albums from './Management/Albums';
import PriceList from './Management/PriceList'
import Booking from './Management/Booking';
import Location from './Management/Location';
import Product from './Management/Product';
import EditPhoto from './Management/EditPhoto';
import { Link } from "react-router-dom";

const DashBoard = () => {
    const [menu, setMenu] = useState(() => {
        // Lấy giá trị từ localStorage, nếu không có thì mặc định là 'overview'
        return localStorage.getItem('menu') || 'overview';
    });

    useEffect(() => {
        localStorage.setItem('menu', menu);
    }, [menu]);
    return (
        <div>
            <div className='w-full p-4 bg-black flex items-center justify-center'>
                <Link to="/">
                    <div className='w-[30%] flex items-center justify-center cursor-pointer'>
                        <img src={logoFushion} className="mr-6 h-6 sm:h-9" alt="Logo" />
                        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">FotoFusion</span>
                    </div>
                </Link>
                <div className='w-[40%] flex items-center justify-center'>
                    <span className='text-2xl text-white'>BẢNG ĐIỀU KHIỂN</span>
                </div>
                <div className='w-[30%] flex items-center justify-center'>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fformlogin.jpg?alt=media&token=d36f34ed-578e-40cf-b1c4-79017d91d0ac" />
                        </div>
                    </div>
                    <Link to='/'>
                        <div className='text-white ml-2 cursor-pointer'>
                            <span>ADMIN</span>
                            <br />
                            <span>ĐẾN TRANG CHỦ </span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='w-full flex '>
                <div className='w-1/5 bg-cover bg-center' style={{ backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgadmin.png?alt=media&token=a46bed58-3118-43bc-b95b-4992f2760bc3")' }}>
                    <div className='m-6 h-[100vh]'>
                        <ul className="menu bg-base-500 w-full rounded-box font-bold  h-[100vh]">
                            <li>
                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("overview")}>
                                    Đơn đặt hàng
                                </Button>
                            </li>
                            <li>
                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("booking")}>
                                    Quản lí đặt dịch vụ
                                </Button>
                            </li>
                            <li>
                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("albums")}>
                                    Quản lí albums
                                </Button>
                            </li>

                            <li>
                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("location")}>
                                    Quản lí vị trí
                                </Button>
                            </li>
                            <li>
                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("priceList")}>
                                    Quản lí bảng giá
                                </Button>
                            </li>
                            <li>
                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("account")}>
                                    Quản lí tài khoản
                                </Button>
                            </li>
                            <li>
                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("editphoto")}>
                                    Quản lí yêu cầu chỉnh sửa
                                </Button>
                            </li>
                            <li>

                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("product")}>
                                    Quản lí sản phẩm bán
                                </Button>
                            </li>
                            <li>

                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("blogpost")}>
                                    Quản lí bài viết
                                </Button>
                            </li>
                            <li>
                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("room")}>
                                    Quản lí phòng chụp
                                </Button>
                            </li>
                            <li>

                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("costumer")}>
                                    Quản lí trang phục
                                </Button>
                            </li>
                            <li>
                                <Button outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setMenu("equipment")}>
                                    Quản lí thiết bị
                                </Button>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className='w-4/5  h-[100vh]'>
                    <div className='w-full'>
                        {menu === "overview" && <Order />}
                        {menu === "editphoto" && <EditPhoto />}
                        {menu === "account" && <Account />}
                        {menu === "equipment" && <Equipment />}
                        {menu === "costumer" && <Costumer />}
                        {menu === "product" && <Product />}
                        {menu === "room" && <Room />}
                        {menu === "blogpost" && <BlogPost />}
                        {menu === "albums" && <Albums />}
                        {menu === "priceList" && <PriceList />}
                        {menu === "booking" && <Booking />}
                        {menu === "location" && <Location />}

                    </div>

                </div>

            </div>
        </div >
    )
}

export default DashBoard
