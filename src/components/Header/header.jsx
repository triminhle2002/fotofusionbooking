import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoFushion from "../../public/img/logoFushion.jpg";
import { icons } from "../../utils/icons";
import AuthContext from '../../context/authProvider';

import { Avatar, Dropdown, Navbar, Button } from 'flowbite-react';

function Header() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [hasUser, setHasUser] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (Object.keys(auth).length === 0) {
      setHasUser(false);
    } else {
      setHasUser(true);
    }
  }, [auth]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = currentScrollPos > prevScrollPos;

      setPrevScrollPos(currentScrollPos);

      if (isScrolledDown && isVisible) {
        setIsVisible(false);
      } else if (!isScrolledDown && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, prevScrollPos]);

  const handleLogOut = () => {
    setAuth({});
    localStorage.removeItem('auth');
    setHasUser(false);
    navigate('/');
  };
  return (
    <div className={`fixed top-0 left-0 right-0 w-full z-50 transition-transform transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="w-full flex p-2 bg-black text-white bg-opacity-50">

        <div className="w-1/2 flex justify-center items-center font-sans text-xs">
          <ul className="flex justify-center items-center">
            <li className="flex justify-center items-center mr-4 ">
              <span className="text-orange-400 mr-2 font-bold">
                <icons.CiLocationOn />
              </span>
              <span className="max-sm:hidden max-md:hidden">254 Nguyen Van Linh, Hai Chau, DaNang</span>
            </li>
            <li className="flex justify-center items-center ">
              <span className="text-btnprimary mr-2 font-bold" >
                <icons.AiOutlineMail />
              </span>
              <span>FotoFusion@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className="w-1/2 text-white flex justify-center items-center font-sans text-xs">
          <ul className="flex justify-center items-center cursor-pointer">
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.BsInstagram />
              </a>
            </li>
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.AiOutlineFacebook />
              </a>
            </li>
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.BsTwitter />
              </a>
            </li>
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.AiOutlineYoutube />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className=" w-[90%] bg-black rounded-lg shadow-2xl">
          <div className="w-full border border-white rounded-lg">
            <Navbar className="w-full z-50 shadow-lg bg-opacity-10 rounded-lg">

              <Navbar.Brand >
                <img src={logoFushion} className="mr-6 h-6 sm:h-9" alt="Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold text-white">FotoFusion</span>
              </Navbar.Brand>
              <div className="flex md:order-2">
                <Link to='/bookingonline' >
                  <Button className="bg-btnprimary">BOOKING</Button>
                </Link>
                <Navbar.Toggle />
              </div>
              <Navbar.Collapse className="text-white">
                <div className="text-white hover:text-red-500">
                  <Link to='/' >
                    TRANG CHỦ
                  </Link>
                </div>

                <div className="text-white hover:text-red-500">
                  <Dropdown label="ALBUMS" inline>
                    <Link to='/albumspage' >
                      <Dropdown.Item>Albums Ảnh</Dropdown.Item>
                    </Link>
                    <Link to='/albumsvideo' >
                      <Dropdown.Item>Albums Video</Dropdown.Item>
                    </Link>
                  </Dropdown>
                </div>

                <div className="text-white hover:text-red-500">
                  <Dropdown label="DỊCH VỤ" inline>
                    <Link to='/store' >
                      <Dropdown.Item>Cửa hàng</Dropdown.Item>
                    </Link>
                    <Link to='/requestpage' >
                      <Dropdown.Item>Yêu cầu chỉnh sửa</Dropdown.Item>
                    </Link>
                    <Link to='/studioroom' >
                      <Dropdown.Item>Phòng studio</Dropdown.Item>
                    </Link>
                    <Link to='/costumer' >
                      <Dropdown.Item>Trang phục</Dropdown.Item>
                    </Link>
                    <Link to='/equipment' >
                      <Dropdown.Item>Thiết bị</Dropdown.Item>
                    </Link>
                    <Link to='/makeup' >
                      <Dropdown.Item>Make-up</Dropdown.Item>
                    </Link>
                    <Link to='/combotakephoto' >
                      <Dropdown.Item>Combo Chụp Hình</Dropdown.Item>
                    </Link>
                  </Dropdown>
                </div>
                <div className="text-white hover:text-red-500">
                  <Link to='/promotion' >
                    KHUYỄN MÃI
                  </Link>
                </div>
                <div className="text-white hover:text-red-500">
                  <Link to='/blogpost' >
                    BÀI VIẾT
                  </Link>
                </div>
                <div className="text-white hover:text-red-500">
                  <Link to='/contactus' >
                    LIÊN HỆ
                  </Link>
                </div>
              </Navbar.Collapse>

              {hasUser ? (
                <div className="flex md:order-2 text-white">

                  <div className="flex items-center justify-center">
                    <Link to='/cart' >
                      <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mr-2 hover:bg-btnprimary hover:text-white ">
                        <icons.BsCart4 />
                      </div>
                    </Link>
                  </div>
                  <Dropdown
                    arrowIcon={true}
                    inline
                    label={
                      <Avatar alt="User settings" img={auth.avatar} rounded />
                    }
                  >
                    <Dropdown.Header>
                      <span className="flex items-center justify-center text-xl m-2 ">{auth.fullName}</span>
                      <span className="block truncate text-sm font-medium">{auth.email}</span>
                    </Dropdown.Header>
                    {auth.role === "admin" && (
                      <Link to='/dashboard'>
                        <Dropdown.Item>Bảng Điều Khiển</Dropdown.Item>
                      </Link>
                    )}
                    {auth.role === "editor" && (
                      <Link to='/homeeditor'>
                        <Dropdown.Item>Bảng Công Việc</Dropdown.Item>
                      </Link>
                    )}
                    <Link to='/profile' >
                      <Dropdown.Item>Thông Tin cá Nhân</Dropdown.Item>
                    </Link>

                    <Link to='/myalbums' >
                      <Dropdown.Item>Albums Của Tôi</Dropdown.Item>
                    </Link>

                    <Dropdown.Divider />
                    <Link to='/' onClick={handleLogOut}>
                      <Dropdown.Item>Đăng Xuất</Dropdown.Item>
                    </Link>
                    { }
                  </Dropdown>
                </div>
              ) : (
                <Navbar.Collapse>
                  <div className="flex justify-center items-center">
                    <ul className="flex justify-center items-center ">
                      <li>
                        <Link to="/login">
                          <button className="text-red-500 mr-5 " href="">
                            ĐĂNG NHẬP
                          </button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/signup">
                          <button className="bg-btnaccess text-gray-700 rounded-2xl py-2 px-4 ">
                            ĐĂNG KÍ
                          </button>
                        </Link>
                      </li>
                    </ul>
                  </div>

                </Navbar.Collapse>
              )}
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header
