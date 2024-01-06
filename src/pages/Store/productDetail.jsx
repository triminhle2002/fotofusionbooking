import React from "react";
import ProductDetail from "../../components/Store/product/ProductDetail";

const productDetail = () => {
    document.title = "Chi tiết sản phẩm";
    return (
        <div>
            <ProductDetail />
        </div>
    );
};

export default productDetail;
