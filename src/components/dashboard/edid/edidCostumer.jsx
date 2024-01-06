import React, { useContext, useEffect, useState } from 'react'
import * as cost from '../../../apis/costumer'
import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import PhotoByCostumer from '../../helples/PhotoByCostumer';
import { formatCurrency } from '../../helples/Format'


const EdidCostumer = (costumer) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [rental_start_date, setRentalStartDate] = useState('');

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Add state to manage editing mode
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        // Update state only if costumer object is not null
        if (costumer?.costumer) {
            setId(costumer.costumer.id || '')
            setName(costumer.costumer.name || '');
            setCategory(costumer.costumer.category || '');
            setPrice(costumer.costumer.price || '');
            setQuantity(costumer.costumer.quantity || '');
            setRentalStartDate(costumer.costumer.rental_start_date || '');
        }
    }, [costumer]);
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };
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
    useEffect(() => {
        const fetchAdd = async () => {
            try {
                const updateCostumer = await cost.updateCostumer(auth.accessToken, id, name, category, price, quantity, rental_start_date);
                console.log(updateCostumer);
                if (updateCostumer.statusCode === 200) {
                    notify('success');
                    setLoading(false);
                    setSubmit(false);
                    setIsEditing(false);
                } else {
                    notify("không thành công");
                    setLoading(false);
                    setSubmit(false);
                }
            } catch (error) {
                console.error('Error in fetchAdd:', error);
                setLoading(false);
                setSubmit(false);
            }
        };

        if (submit && auth.accessToken !== undefined) {
            fetchAdd();
        }
    }, [submit]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
        setLoading(true);
    };

    useEffect(() => {
        console.log(costumer);
    }, [costumer])

    return (
        <>
            <ToastContainer />
            <div className='w-full'>
                <div className="card card-side bg-base-100 shadow-xl">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="card-body ">
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập tên của trang phục
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập loại trang phục
                                    </label>
                                    <input
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        type="text"
                                        value={category} onChange={(e) => setCategory(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập giá trang phục
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập số lượng
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập số ngày thuê
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={rental_start_date} onChange={(e) => setRentalStartDate(e.target.value)} />
                                </div>
                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn btn-primary">
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <Spinner className="h-6 w-6 mr-4" /> <span>Loading...</span>
                                            </div>
                                        ) : (
                                            <span>Lưu</span>
                                        )}</button>
                                    <button type="button" onClick={handleCancelClick} className="btn btn-danger">Hủy</button>
                                </div>
                            </div>
                        </form>

                    ) : (
                        <div className="card-body">
                            <h2 className="card-title">Tên trang phục : {name} </h2>
                            <h2 className="card-title">Giá : {formatCurrency(price)} VND</h2>
                            <p>Loại :{category} </p>
                            <p>Số lượng còn lại :{quantity} </p>
                            <p>Số ngày thuê :{rental_start_date} </p>
                            <div className="card-actions justify-end">
                                <button onClick={handleEditClick} className="btn btn-primary">Chỉnh Sửa</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default EdidCostumer
