import { createContext, useEffect, useState } from 'react';
import * as photoApi from '../apis/photo'
const ProductsContext = createContext({ products: [], setProducts: () => { } });

export const ProductsProvider = ({ children }) => {
    const [productsList, setProductsList] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const dataProduct = await photoApi.getAllPhotosByProductId();
                console.log(dataProduct.photoData);
                setProductsList(dataProduct.photoData)
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        };

        fetchData();
    }, []);

    return <ProductsContext.Provider value={{ productsList, setProductsList }}>{children}</ProductsContext.Provider>;
};
export default ProductsContext;
