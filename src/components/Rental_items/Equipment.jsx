import React, { useEffect, useState } from 'react';
import * as equipment from '../../apis/equipment';
import PhotoByEquipment from '../helples/PhotoByEquipment';
import { formatCurrency } from '../helples/Format'


const Equipment = () => {
    const [equipments, setEquipments] = useState([]);
    const [equipmentsCategory, setEquipmentCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const handleRadioChange = (event) => {
        const selectedPage = parseInt(event.target.getAttribute('aria-label'), 10);
        setCurrentPage(selectedPage);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await equipment.getEquipment();
                console.log(response);
                setEquipments(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await equipment.getAllCategoryOfEquipment();
                //console.log(response);
                setEquipmentCategory(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        fetchData();
    }, []);
    const filteredStudios = equipments.filter((studio) => {
        const lowerCaseName = studio.name.toLowerCase();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const isNameMatch = lowerCaseName.includes(lowerCaseSearchTerm);
        if (selectedCategory) {
            return isNameMatch && studio.category === selectedCategory;
        }
        return isNameMatch;
    });
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudios = filteredStudios.slice(indexOfFirstItem, indexOfLastItem);



    return (
        <div>
            <div className='w-full'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgequipment.png?alt=media&token=6da0b9c1-ea94-4d28-966f-41c41b795127" alt="" />
            </div>
            <div className='flex items-center justify-center'>
                <div className='w-3/4 h-10 m-4 flex items-center justify-center'>
                    <div class='w-1/2 mx-auto'>
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
                                {equipmentsCategory.map((item) => {
                                    return (
                                        <option>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-6 md:grid-cols-3 md:max-w-5xl md:mx-auto xl:grid-cols-4'>
                {currentStudios.map((studio) => (
                    <div key={studio.id} className="card w-64 bg-base-100 shadow-xl flex items-center justify-center">
                        <div className='w-64'>
                            <PhotoByEquipment equip_id={studio.id} />
                        </div>
                        <div className="card-body">
                            <h2 className="card-title text-base">{studio.name}</h2>
                            <p className='text-red-500 animate-bounce'>{formatCurrency(studio.price)}</p>
                            <p>Số lượng còn lại : {studio.quantity}</p>
                            <div className="card-actions justify-end">
                                <button className="btn bg-btnprimary mx-2">Thuê</button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className='flex items-center justify-center m-4'>
                <div className="pagination join">
                    {Array.from({ length: Math.ceil(equipments.length / itemsPerPage) }).map((_, index) => (
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
    );
};

export default Equipment;
