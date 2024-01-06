import React, { useEffect, useState } from 'react'
import * as price from '../../apis/priceList'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { formatCurrency } from './Format'

const MakeUp = ({ onSelectMakeUp }) => {
    const notify = (message, type) => {
        const toastType = type === 'success' ? toast.success : toast.error;
        return toastType(message, {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const [priceLists, setPriceLists] = useState([])


    const albumsid = '038057a3-668e-4b76-ade8-082cc984bb51'

    useEffect(() => {
        const fetchAdd = async () => {
            try {
                const pricelistData = await price.getPriceListByAlbumsid({ albumsid });
                setPriceLists(pricelistData);
            } catch (error) {
                console.error('Error fetching blogposts:', error);
            }
        };
        fetchAdd();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className='bg-black'>
                <div className='flex items-center justify-center'>
                    <div className='v-4/5 grid grid-cols-3 max-md:grid-cols-1 max-xl:grid-cols-2'>
                        {priceLists.map((price) => {
                            return (
                                <div className="card w-96 bg-white text-black m-4">
                                    <div className="card-body">
                                        <div className='h-[60px]'>
                                            <h2 className="card-title text-base overflow-hidden overflow-ellipsis text-xl" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                                                {price.name}
                                            </h2>
                                        </div>
                                        <p className='text-lg text-red-400 font-semibold animate-bounce'>{formatCurrency(price.price)}</p>
                                        <p style={{ whiteSpace: 'pre-line' }}>{price.description}</p>
                                        <div className="card-actions justify-end">
                                            <Link to='/bookingonline' >
                                                <button className="btn bg-btnprimary" onClick={() => {
                                                    notify("Bạn đã lựa chọn thành công gói makeUp", 'success');
                                                    onSelectMakeUp(price); // Call the prop to update the state in the parent
                                                }}
                                                >Lựa Chọn</button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}

export default MakeUp
