import React, { useContext, useEffect, useState } from 'react';
import { icons } from '../../../utils/icons'
import ProductsSlide from '../../SlidePhoto/SlidePhoto';
import { useNavigate, useParams } from 'react-router-dom';
import ProductsContext from '../../../context/productProvider';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import AuthContext from '../../../context/authProvider';
import { formatCurrency } from '../../helples//Format'
import * as addProductServices from '../../../apis/shop';



const ProductDetailForm = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    product && (document.title = `${product.title}`);
    const { productsList } = useContext(ProductsContext);
    const { auth } = useContext(AuthContext);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const param = useParams();


    const notify = (message) =>
        toast(message, {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (productsList.length === 0) {
            setLoading(true);
        } else {
            setProduct(productsList.filter((product) => product.id === param.id)[0]);
            setLoading(false);
        }
    }, [auth.fullName, param.id, productsList]);

    const addProduct = async (id, quantity) => {
        const response = await addProductServices.addProductToCart(auth.accessToken, auth.id, id, quantity);
        if (response.statusCode === 200) {
            notify("Thêm Sản Phẩm Thành Công")
        } else notify(response.error);
    };

    const handleAddProducts = () => {
        auth.accessToken !== undefined ? addProduct(product.id, count) : navigate('/login', { state: { toastMessage: "Bạn Phải Đăng Nhập Để Sử Dụng Dịch Vụ Này" } });
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };


    return (
        <>
            <ToastContainer />

            <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgshop.png?alt=media&token=4e3f4f50-988d-44fe-be90-16ed54a6cb92" alt="" />
            <div className='w-full'>

                <div className="max-w-[1100px] m-auto mt-20">
                    {loading ? (
                        <Spinner className="h-12 w-12 mt-10 mx-auto" />
                    ) : (
                        <div className=" md:flex md:justify-center m-auto px-9">
                            <div className="md:w-1/2 mr-9">
                                <img
                                    src={product.url_photo}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded shadow"
                                />
                            </div>
                            <div className="mt-5 md:w-1/2 p-4">
                                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

                                <div className="mb-2">
                                    <p className=" text-lg font-bold">
                                        Giá cũ: <span className="font-medium">{formatCurrency(product.price)}</span>
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-lg font-bold">
                                        Danh Mục: <span className="font-medium"> {product.category} </span>
                                    </p>
                                </div>

                                <div className="flex items-center mb-2 mt-16">
                                    <button className="btn btn-outline btn-info"
                                        onClick={decrement}
                                    >
                                        <icons.FaMinus />
                                    </button>
                                    <button className="bg-gray-300  text-gray-800 font-bold py-2 px-4 mx-2">{count}</button>
                                    <button className="btn btn-outline btn-info"
                                        onClick={() => setCount(count + 1)}
                                    >
                                        <icons.FaPlus />
                                    </button>
                                    <button
                                        onClick={handleAddProducts}
                                        className="btn btn-warning ml-4"
                                    >
                                        Thêm Vào Giỏ
                                    </button>
                                </div>
                                <div className="mt-14">
                                    <div className="flex mb-2">
                                        <p className="text-xl font-bold">
                                            Giá mới:
                                            <span className="font-medium text-red-500 "> {formatCurrency(product.discounted_price)} </span>
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <span className='text-3xl font-bold'>Mô Tả</span>
                                    </div>
                                    <div className="px-9">
                                        <p className="text-center text-lg font-medium">{product.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
                <div className='mt-8'>
                    <div className='flex items-center justify-center'>
                        <span className='text-3xl font-bold text-black m-2'>Các Sản Phẩm Khác</span>
                    </div>
                    <ProductsSlide
                        title="Sản Phẩm Liên Quan"
                        products={productsList}
                        // numOfProducts={6}
                        category={product.category}
                    />
                </div>
            </div>
        </>
    );
};

export default ProductDetailForm;