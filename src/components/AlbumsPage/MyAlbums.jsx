import React, { useContext, useEffect, useState } from 'react';
import * as albumsApi from '../../apis/albumphoto';
import AuthContext from '../../context/authProvider';
import PhotoOfAlbums from '../helples/PhotoOfAlbums';

const MyAlbums = () => {
    const { auth } = useContext(AuthContext);
    const [albums, setAlbums] = useState('');
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await albumsApi.getPhotoAlbumByUserId(auth.accessToken, auth.id);
                console.log(response.statusCode);
                if (response.statusCode === 200) {
                    setAlbums(response.data);
                    setFlag(flag)
                } else {
                    setFlag(true);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        if (auth.accessToken && auth.id) {
            fetchData();
        }
    }, [auth.accessToken, auth.id]); // Add dependencies for the useEffect

    useEffect(() => {
        console.log(albums);
    }, [albums]);

    return (
        <div className='w-full bg-black'>
            <div className='flex items-center justify-center'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbnmyalbums.png?alt=media&token=6b9dc69f-004e-4fa2-aa6d-906d0619cb6c" alt="" />
            </div>
            {albums === '' ? (
                <div className='flex items-center justify-center m-4'>
                    <span className='text-3xl text-white'>Bạn Không có hình ảnh nào</span>
                </div>
            ) : (
                <PhotoOfAlbums item={albums} />
            )}
        </div>
    );
};

export default MyAlbums;
