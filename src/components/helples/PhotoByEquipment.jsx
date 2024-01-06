import React, { useEffect, useState } from 'react';

import { getListPhotoByEquipmentId } from '../../apis/photo'

import './AlbumsPhotoPage.scss'


const PhotoByEquipment = ({ equip_id }) => {
    const [photos, setPhotos] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getListPhotoByEquipmentId({ equip_id });
                console.log(response);
                setPhotos(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // console.log(photos.url_photo);
    }, [photos])

    return (
        <div>
            <figure className='h-64 w-64' >
                <img src={photos.url_photo}
                    alt={`Hình ảnh`}
                    className='object-fill'
                />
            </figure>
        </div>
    )
}

export default PhotoByEquipment
