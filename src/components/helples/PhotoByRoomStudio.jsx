import React, { useEffect, useState, useRef } from 'react';

import { getListPhotoByRoomid } from '../../apis/photo'

import './AlbumsPhotoPage.scss'


const PhotoByRoomId = ({ room_id }) => {
    const [photos, setPhotos] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getListPhotoByRoomid({ room_id });

                setPhotos(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };

        fetchData();
    }, []);

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

export default PhotoByRoomId
