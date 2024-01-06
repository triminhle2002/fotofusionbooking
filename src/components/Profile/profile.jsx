import React, { useState } from 'react'
import HoSoCaNhan from './HoSoCaNhan';
import bgProfile from '../../public/img/bgprofile.jpg'
import ChangePassword from './ChangePassword';
import MyOrder from './MyOrder';
import ListBooking from './ListBooking';
import ListRequest from './ListRequest';

const Profile = () => {

    return (
        <>
            <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbnfrofile.png?alt=media&token=d2ece141-080e-4095-89a1-300babedb448" alt="" />
            <div className='flex items-center justify-center bg-black'>
                <div role="tablist" className="tabs tabs-lifted w-[60%]">
                    <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl p-8 m-2 text-blue-500 [--tab-bg:yellow]  [--tab-border-color:orange]" aria-label="Hồ Sơ Cá Nhân" checked />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[600px] " style={{
                        position: 'relative',
                        backgroundImage: `url(${bgProfile})`,
                        backgroundSize: '100% 100%', // Đặt backgroundSize
                        backgroundPosition: 'center', // Đặt backgroundPosition
                        backgroundRepeat: 'no-repeat',
                    }}>
                        <div className='flex items-center justify-center '>
                            <HoSoCaNhan />
                        </div>
                    </div>
                    <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl p-8 m-2 text-blue-500 [--tab-bg:yellow] [--tab-border-color:orange]" aria-label="Đổi Mật Khẩu" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[600px]" style={{
                        position: 'relative',
                        backgroundImage: `url(${bgProfile})`,
                        backgroundSize: '100% 100%', // Đặt backgroundSize
                        backgroundPosition: 'center', // Đặt backgroundPosition
                        backgroundRepeat: 'no-repeat',
                    }}>
                        <div className='flex items-center justify-center '>
                            <ChangePassword />
                        </div>
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl p-8 m-2 text-blue-500 [--tab-bg:yellow] [--tab-border-color:orange]" aria-label="Đơn Hàng" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[600px]" style={{
                        position: 'relative',
                        backgroundImage: `url(${bgProfile})`,
                        backgroundSize: '100% 100%', // Đặt backgroundSize
                        backgroundPosition: 'center', // Đặt backgroundPosition
                        backgroundRepeat: 'no-repeat',
                    }}>
                        <div className='flex items-center justify-center '>
                            <MyOrder />
                        </div>
                    </div>
                    <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl p-8 m-2 text-blue-500 [--tab-bg:yellow] [--tab-border-color:orange]" aria-label="Đơn Đặt Lịch" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[600px]" style={{
                        position: 'relative',
                        backgroundImage: `url(${bgProfile})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>
                        <div className='flex items-center justify-center '>
                            <ListBooking />
                        </div>
                    </div>
                    <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl p-8 m-2 text-blue-500 [--tab-bg:yellow] [--tab-border-color:orange]" aria-label="Yêu Cầu Chỉnh Sửa" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[600px]" style={{
                        position: 'relative',
                        backgroundImage: `url(${bgProfile})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>
                        <div className='flex items-center justify-center '>
                            <ListRequest />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile
