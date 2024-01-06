import React, { useEffect, useState } from 'react';

import { getAllPhotosByLocationId } from '../../apis/photo'

import './AlbumsPhotoPage.scss'

const PhotoByLocation = ({ locations_id }) => {
    const [photos, setPhotos] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await getAllPhotosByLocationId({ locations_id });
                console.log(locations_id);
                console.log(response);
                setPhotos(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };

        fetchData();

    }, []);
    // useEffect(() => {
    //     console.log(locations_id);
    // }, [locations_id])
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



export default PhotoByLocation
