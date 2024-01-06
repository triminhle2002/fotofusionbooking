import React from 'react'
import ShoppingCart from '../../components/Store/product/ShopingCart'

const shoppingCart = () => {
    document.title = "Giỏ Hàng";
    return (
        <div>
            <ShoppingCart />
        </div>
    );
}

export default shoppingCart
