import React, { useContext, useEffect, useState } from 'react';
//import CategoryProducts from './CategoryProducts/CategoryProducts';
import Item from './Item.jsx';
import { Spinner } from '@material-tailwind/react';
import ProductsContext from '../../../context/productProvider.js';
// import Search from './Search/Search';
import { ToastContainer, toast } from 'react-toastify';
import * as addProductServices from '../../../apis//shop.js';
import AuthContext from '../../../context/authProvider.js';

const MainProducts = () => {
    const { auth } = useContext(AuthContext);
    const { productsList } = useContext(ProductsContext);
    const [category, setCategory] = useState('Tất cả');
    const [productsCategory, setProductsCategory] = useState([]);
    const [loadings, setLoadings] = useState(true);

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

    const handleDivideProducts = (category) => {
        return category === 'Tất cả' ? productsList : productsList.filter((product) => product.category === category);
    };

    const handleChangeCategory = (category) => {
        setCategory(category);
        const productsList = handleDivideProducts(category);
        setProductsCategory(productsList);
    };

    useEffect(() => {
        if (productsList.length === 0) {
            setLoadings(true);
        } else {
            loadings && setProductsCategory(productsList);
            loadings && setLoadings(false);
        }
    }, [loadings, productsCategory, productsList]);

    const addProduct = async (id, quantity) => {
        const response = await addProductServices.addProductToCart(auth.accessToken, auth.id, id, quantity);
        if (response.statusCode === 200) {
            notify("Thêm Sản Phẩm Thành Công")
        } else notify(response.error);
    };

    const handleAddProduct = (id) => {
        if (auth && Object.keys(auth).length > 0) {
            addProduct(id, 1);
        } else {
            notify('Đăng Nhập Trước Khi Thêm Sản Phẩm')
        }
    };

    return (
        <>
            <ToastContainer />
            <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgshop.png?alt=media&token=4e3f4f50-988d-44fe-be90-16ed54a6cb92" alt="" />
            <div className="max-w-[1100px] mb-32 mx-auto px-6 md:px-4 lg:px-0 m-4">
                {/* <CategoryProducts category={category} onCategoryChange={handleChangeCategory} /> */}
                {/* <Search /> */}
                {loadings ? (
                    <Spinner className="h-12 w-12 mt-10 mx-auto" />
                ) : (
                    <div className="grid md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
                        {productsCategory.length > 0 &&
                            productsCategory.map((product) => {
                                return <Item key={product.id} product={product} onAddProduct={handleAddProduct} />;
                            })}
                    </div>
                )}
            </div>
        </>
    );
};

export default MainProducts;