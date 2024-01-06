import React, { useState, useEffect, useContext } from 'react';
import { icons } from '../../../utils/icons'
import AuthContext from '../../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import { formatCurrency } from '../../helples/Format'

import * as VNpayApi from '../../../apis/vnpay'
import * as shopApi from '../../../apis/shop';
import * as orderApi from '../../../apis/order';

import { useNavigate } from 'react-router';
import { Spinner } from '@material-tailwind/react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const CheckOut = () => {
    const navigation = useNavigate();
    const { auth } = useContext(AuthContext);
    const [cartList, setCartList] = useState([]);
    const [totalAmount, setTotalAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [infoLoading, setInfoLoading] = useState(false);
    const TransportFee = 30000;
    const today = new Date();

    const [paymentMethod, setPaymentMethod] = useState(''); // Biến state cho phương thức thanh toán

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value); // Cập nhật giá trị biến state paymentMethod khi thay đổi
    };

    const notify = (message, type) => {
        const toastType = type === 'success' ? toast.success : toast.error;
        return toastType(message, {
            position: 'top-center',
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
        window.scrollTo(0, 0);

        if (auth.accessToken !== undefined) {
            const fetchCart = async () => {
                const fetchCart = await shopApi.getItemInCart(auth.accessToken, auth.id);
                console.log(fetchCart.data);
                if (fetchCart.statusCode === 200) {
                    setCartList(fetchCart.data);
                    setTotalAmount(fetchCart.totalAmount);
                } else {
                    console.log(fetchCart.error);
                }
            };
            fetchCart();
        }
    }, [auth.accessToken]);


    useEffect(() => {
        let calculatedTotal = 0;
        cartList.forEach((product) => {
            calculatedTotal += product.price * product.quantity;
        });
        setTotalAmount(calculatedTotal);

    }, [cartList]);
    useEffect(() => {
        console.log(auth.address);
        if (!auth.fullName || !auth.address || !auth.phone) {
            notify("Vui lòng điền đầy đủ thông tin giao hàng");
            navigation('/profile', { state: { toastMessage: 'Bạn chưa có địa chỉ giao hàng!' } });

        }

    }, [auth])

    const handleCheckout = async () => {
        if (auth.fullName === '' || auth.address === '' || auth.phone === '') {
            notify("Vui lòng điền đầy đủ thông tin giao hàng");
            navigation('/profile', { state: { toastMessage: 'Bạn chưa có địa chỉ giao hàng!' } });

        } else {
            setLoading(true);
            if (paymentMethod === '') {
                notify('Bạn chưa lựa chọn phương thức thanh toán');
            } else if (paymentMethod === 'VNPAY') {
                console.log(totalAmount);
                const vnpay = await VNpayApi.creatPayment(totalAmount, auth.email, 1, 8, "", "")
            } else {
                try {
                    const responseOrder = await orderApi.createOrder(auth.accessToken, paymentMethod, today, totalAmount, TransportFee, auth.id);
                    if (responseOrder.statusCode === 201) {
                        for (const product of cartList) {
                            let totalPriceOfProd = product.price * product.quantity;
                            const responseDetail = await orderApi.createOrderDetail(auth.accessToken, responseOrder.id, product.prodId, product.quantity, totalPriceOfProd);
                            if (responseDetail.statusCode === 201) {
                                setLoading(false);
                                navigation('/', { state: { toastMessage: 'Thanh Toán Thành Công!' } });
                            } else {
                                notify('Lỗi khi tạo đơn hàng chi tiết', 'error');
                                setLoading(false);
                            }
                        }
                    } else {
                        notify('Lỗi khi tạo đơn hàng', 'error');
                        setLoading(false);
                    }
                } catch (error) {
                    notify('Lỗi khi thực hiện thanh toán', 'error');
                    setLoading(false);
                }
            }
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="container mx-auto">
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgshop.png?alt=media&token=4e3f4f50-988d-44fe-be90-16ed54a6cb92" alt="" />

                {/* header checkout */}
                <div className='flex items-center justify-center'>
                    <div className='w-[70]'>
                        <div className="h-20 flex items-center mx-auto border pl-10 mt-10">
                            <div className="w-14 h-14 flex items-center justify-center text-white text-3xl font-bold mr-4">
                                <img
                                    src="https://cdn.icon-icons.com/icons2/1786/PNG/128/shoppingcart-checkout_114473.png"
                                    alt="Logo"
                                    className="h-10 w-10 mr-2"
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-black">Thanh Toán</h1>
                        </div>
                        {/* body checkout */}
                        <div className="mx-auto shadow-lg rounded-lg px-8 py-6 my-8 border-spacing-2 border-primaryColor">
                            {/* Body information user */}
                            <div>
                                <h2 className="text-black text-2xl font-semibold mb-6">
                                    <icons.CiLocationOn className="text-black mr-2" />
                                    Thông Tin Giao Hàng
                                </h2>
                                <div className='border p-4 rounded shadow-sm m-2 max-sm:w-full'>

                                    <div className='flex items-center justify-between  max-sm:text-xs'>
                                        <div class="mb-4 w-[48%]">
                                            <label class="block text-gray-700 font-bold mb-2" for="name">
                                                Tên Khách Hàng
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-black font-semibold  max-sm:text-xs leading-tight focus:outline-none focus:shadow-outline"
                                                id="name" type="text" value={auth.fullName} readOnly />
                                        </div>
                                        <div class="mb-4 w-[48%]">
                                            <label class="block text-gray-700 font-bold mb-2" for="email">
                                                Số Điện Thoại
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-black max-sm:text-xs font-semibold leading-tight focus:outline-none focus:shadow-outline"
                                                id="phoneNumber" type="number" value={auth.phone} readOnly />
                                        </div>
                                    </div>
                                    <div class="mb-4 max-sm:text-xs">
                                        <label class="block text-gray-700 font-bold mb-2" for="email">
                                            Địa chỉ
                                        </label>
                                        <input
                                            class="shadow appearance-none border rounded w-full py-2 px-3 max-sm:text-xs text-black font-semibold leading-tight focus:outline-none focus:shadow-outline"
                                            id="diachi" type="text" value={auth.address} readOnly />
                                    </div>
                                    <div className='flex items-end justify-end'>
                                        <Link to="/profile">
                                            <Button className='bg-green-400 right-0'>Chỉnh sửa</Button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                            {/* Body information Product */}

                            <div className="mb-4 ">
                                <h3 className="text-2xl text-black font-medium mb-6 w-[80]">Sản Phẩm</h3>
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4"></th>
                                            <th className="py-2 px-4 text-black">Loại</th>
                                            <th className="py-2 px-4 text-black">Giá</th>
                                            <th className="py-2 px-4 text-black">Số Lượng</th>
                                            <th className="py-2 px-4 text-black">Tổng Tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartList.map((product) => (
                                            <tr key={product.id}>
                                                <td className="py-2 px-4">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={product.photos}
                                                            alt={product.name}
                                                            className="w-12 h-12 rounded-lg mr-4"
                                                        />
                                                        <div>
                                                            <p className="text-xl font-medium text-textColor">
                                                                {product.nameProduct}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-4 text-lg font-medium text-center text-textColor">
                                                    {product.category}
                                                </td>
                                                <td className="py-2 px-4 text-lg font-medium text-center text-textColor">
                                                    {formatCurrency(product.price)}
                                                </td>
                                                <td className="py-2 px-4 text-lg font-medium text-center text-textColor">
                                                    {product.quantity}
                                                </td>
                                                <td className="py-2 px-4 text-lg font-medium text-center text-textColor">
                                                    {formatCurrency(product.price * product.quantity)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mb-2 text-black text-sm text-right">
                                <h3 className="font-bold text-base">
                                    Tổng tiền : <span className="text-lg font-medium">{formatCurrency(totalAmount)}</span>
                                </h3>
                            </div>

                            {/* body Payment methods */}

                            <div className="mb-4 mt-5">
                                <h3 className="text-green-500 text-2xl font-medium mb-6">Phương Thức Thanh Toán</h3>
                                <select className="select select-warning w-full " onChange={handlePaymentMethodChange}>
                                    <option disabled selected>Lựa chọn hình thức thanh toán</option>
                                    <option value="COD">Thanh Toán Khi Nhận Hàng (COD)</option>
                                    <option value="VNPAY">Thanh Toán Online VNPay</option>

                                </select>
                            </div>

                            {/* total ship + product */}
                            <div className="mb-2 text-black text-sm text-right">
                                <table className="float-right">
                                    <tbody>
                                        <tr>
                                            <td className="font-bold text-base">Tổng Tiền Đơn Hàng: </td>
                                            <td className="py-2 px-4 text-lg font-medium text-textColor">
                                                {formatCurrency(totalAmount)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold text-base">Phí Vận Chuyển: </td>
                                            <td className="py-2 px-4 text-lg font-medium text-textColor">
                                                {formatCurrency(TransportFee)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold text-base">Số Tiền Phải Trả: </td>
                                            <td>
                                                <h1 className="py-2 px-4 text-lg text-textColor font-bold inline-block">
                                                    {formatCurrency(totalAmount + TransportFee)}
                                                </h1>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* pay money */}
                            <div className="flex justify-between items-center mt-40">
                                <div className="text-black text-sm">
                                    <h3 className="font-medium text-base">
                                        Nhấp Vào Liên Kết Để Hiển Thị Các Điều Khoản FotoFushion
                                    </h3>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="btn btn-outline btn-success "
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4 font-bold" /> <span>Đang Thanh Toán....</span>
                                        </div>
                                    ) : (
                                        <span className="font-bold">Thanh Toán</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckOut;