import { icons } from '../../../utils/icons'
import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../helples/Format'

const Item = ({ product, onAddProduct }) => {
    const truncatedString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    return (
        <div className="w-full mb-7 shadow rounded">
            <div className="relative w-full h-[265px] group">
                <Link to={`/products/${product.id}`}>
                    <img className="w-full h-full object-cover rounded-t" src={product.url_photo} alt={product.title} />
                    <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center w-full rounded-t bg-black/25 text-center opacity-0 group-hover:opacity-100 transition-all"></div>
                </Link>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center">
                    <icons.FaCartPlus
                        className="p-3 h-16 w-16 text-lg text-black font-bold bg-white rounded-[50%] hover:rotate-[360deg] hover:bg-btnprimary hover:text-white opacity-0 group-hover:opacity-100 translate-y-8  group-hover:translate-y-0 transition-all"
                        onClick={() => onAddProduct(product.id)}
                    />

                </div>
            </div>

            <div className="text-center mt-3 mb-3">
                <h4 className="text-lg font-medium px-2">{truncatedString(product.name, 23)}</h4>
                <p className="text-lg font-bold text-black">{formatCurrency(product.price)}</p>
            </div>
        </div>
    );
};

export default Item;