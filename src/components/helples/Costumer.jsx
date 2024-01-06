import React, { useEffect, useState } from 'react';
import * as costumer from '../../apis/costumer';
import PhotoByCostumer from './PhotoByCostumer';
import { ToastContainer, toast } from 'react-toastify';
import { formatCurrency } from './Format'
import { Link } from 'react-router-dom';

const Costumer = ({ onSelectCostumer }) => {
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
    const [costumers, setCostumers] = useState([]);
    const [costumersCategory, setCostumersCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const handleRadioChange = (event) => {
        const selectedPage = parseInt(event.target.getAttribute('aria-label'), 10);
        setCurrentPage(selectedPage);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await costumer.getAllCostumer();
                // console.log(response);
                setCostumers(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response = await costumer.getAllCategoryOfCostumes();
                setCostumersCategory(response)
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        fetchData1();
    }, []);


    const filteredStudios = costumers.filter((studio) => {
        const lowerCaseName = studio.name.toLowerCase();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const isNameMatch = lowerCaseName.includes(lowerCaseSearchTerm);
        if (selectedCategory) {
            return isNameMatch && studio.category === selectedCategory;
        }
        return isNameMatch;
    });

    //const currentitem = filteredStudios.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudios = filteredStudios.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <div>
            <ToastContainer />
            <div className='flex items-center justify-center'>
                <div className='w-3/4 h-10 m-4 flex items-center justify-center'>
                    <div class='w-1/2 mx-auto flex items-center justify-center'>
                        <div className="join">
                            <div>
                                <div>
                                    <input className="input input-bordered join-item" placeholder="Nhập tên trang phục bạn cần tìm" onChange={handleSearchInputChange} />
                                </div>
                            </div>
                            <select className="select select-bordered join-item"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option disabled selected>Lựa chọn</option>
                                {costumersCategory.map((item) => {
                                    return (
                                        <option>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className='space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-4 md:grid-cols-2 md:max-w-5xl md:mx-auto xl:grid-cols-4'>
                    {currentStudios.map((studio) => (
                        <div key={studio.id} className="card w-64 bg-base-100 shadow-xl flex items-center justify-center">
                            <div className='w-64'>
                                <PhotoByCostumer costume_id={studio.id} />
                            </div>
                            <div className="card-body">
                                <div className='h-[60px]'>
                                    <h2 className="card-title text-base overflow-hidden overflow-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                                        {studio.name}
                                    </h2>
                                </div>
                                <p className='text-red-400 font-semibold animate-bounce'>{formatCurrency(studio.price)} / {studio.rental_start_date}</p>
                                <p>Số lượng còn lại : {studio.quantity}</p>
                                <div className="card-actions justify-end">
                                    <Link to='/bookingonline' >
                                        <button className="btn bg-btnprimary mx-2" onClick={() => {
                                            notify("Bạn đã lựa chọn thành công trang phục", 'success');
                                            onSelectCostumer(studio);
                                        }}>
                                            Lựa Chọn
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex items-center justify-center m-4'>
                <div className="pagination join">
                    {Array.from({ length: Math.ceil(costumers.length / itemsPerPage) }).map((_, index) => (
                        <input
                            key={index + 1}
                            className={`join-item btn btn-square`}
                            type="radio"
                            name="options"
                            aria-label={`${index + 1}`}
                            checked={currentPage === index + 1}
                            onChange={handleRadioChange}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Costumer
