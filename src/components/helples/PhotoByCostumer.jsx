import React, { useEffect, useState } from 'react';

import { getListPhotoByCostumerId } from '../../apis/photo'

import './AlbumsPhotoPage.scss'


const PhotoByCostumer = ({ costume_id }) => {
    const [photos, setPhotos] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getListPhotoByCostumerId({ costume_id });
                setPhotos(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };

        fetchData();
    }, []);
    // useEffect(() => {
    //     console.log(costume_id);
    // }, [costume_id])
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

export default PhotoByCostumer
