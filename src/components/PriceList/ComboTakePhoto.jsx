import React, { useContext, useEffect, useState } from 'react'
import * as price from '../../apis/priceList'
import BookingAlbums from '../Booking/bookingAlbums';
import { formatCurrency } from '../helples/Format'
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';

const ComboTakePhoto = () => {
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
    const { auth } = useContext(AuthContext);
    const [priceLists, setPriceLists] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);

    const openBookingModal = (priceList) => {
        if (auth && Object.keys(auth).length > 0) {
            setSelectedItem(priceList);
            document.getElementById('my_modal_1').showModal()
        } else {
            notify("Bạn phải đăng nhập để sử dụng dịch vụ này")
        }

    };

    useEffect(() => {
        const fetchAdd = async () => {
            try {
                const pricelistData = await price.getAllPriceList();
                setPriceLists(pricelistData);
                console.log(pricelistData);
            } catch (error) {
                console.error('Error fetching blogposts:', error);
            }
        };
        fetchAdd();
    }, []);

    useEffect(() => { console.log(priceLists); }, [priceLists]);
    return (
        <div>
            <ToastContainer />
            <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgprilice.png?alt=media&token=65e6f565-b049-44b1-adda-d888c962b1ab" alt="" />
            <div class="sm:flex sm:flex-col sm:align-center p-10 bg-black">
                <div class="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-6 md:grid-cols-2 md:max-w-5xl md:mx-auto xl:grid-cols-2 ">
                    {priceLists.map((pricelist) => {
                        return (
                            <div class="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200 bg-white">
                                <div class="p-6">
                                    <div className='min-h-[400px] '>
                                        <h2 class="text-xl leading-6 font-bold text-slate-900">{pricelist.name}</h2>
                                        <p class="mt-2 text-base text-slate-700 leading-tight">Thiết bị chụp : {pricelist.camera_equipment}</p>
                                        <p class="mt-2 text-base text-slate-700 leading-tight">Thiết bị chiếu sáng : {pricelist.light_equip}</p>
                                        <p class="mt-2 text-base text-slate-700 leading-tight">Địa điểm : {pricelist.location}</p>
                                        <p class="mt-2 text-base text-slate-700 leading-tight">Số lượng camera : {pricelist.number_camera} ; Số lượng hình ảnh : {pricelist.number_photo} </p>
                                        <p class="mt-2 text-base text-slate-700 leading-tight">Số lượng thợ chụp : {pricelist.number_photographer} ; Số lượng thợ phụ : {pricelist.number_assistant_photographer} </p>
                                        <p class="mt-2 text-base text-slate-700 leading-tight" style={{ whiteSpace: 'pre-line' }}>{pricelist.description}  </p>
                                    </div>
                                    <p class="mt-8">
                                        <span class="text-4xl font-bold text-red-400 animate-bounce'">{formatCurrency(pricelist.price)}</span>
                                    </p>
                                    <button
                                        class="mt-8 block w-full bg-btnprimary rounded-md py-4 text-xl text-white text-center font-semibold"
                                        onClick={() => openBookingModal(pricelist)}>
                                        SỬ DỤNG COMBO NÀY
                                    </button>
                                </div>
                                <div class="pt-6 pb-8 px-6">
                                    <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">Bạn sẽ nhận được</h3>
                                    <p role="list" class="mt-4 space-y-3" style={{ whiteSpace: 'pre-line' }}>
                                        {pricelist.additional_info}
                                    </p>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="flex items-center justify-center">
                        <BookingAlbums priceList={selectedItem} />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default ComboTakePhoto
