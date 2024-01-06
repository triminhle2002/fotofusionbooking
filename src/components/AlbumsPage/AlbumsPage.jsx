import React, { useEffect, useState, useRef } from 'react'
import { getAlbumsPhoto } from '../../apis/albumphoto'
import { getListPhotoByAlbumsId } from '../../apis/photo'

import { Carousel, Button } from 'flowbite-react';
import SlideHeader from '../SlidePhoto/SlideHeader'
import { Link } from 'react-router-dom';




const AlbumsPage = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await getAlbumsPhoto();
                console.log(response);
                setAlbums(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className='w-full h-auto max-sm:mt-[-50%]'>
                <SlideHeader />
                <div className='flex'>
                    <h1 className='text-6xl mt-[-20%] ml-[10%] font-medium text-white z-40 max-sm:text-xl max-sm:mt-[-70%]'>
                        ALBUMS ẢNH CỦA FOTOFUSHION
                    </h1>
                </div>
            </div>
            <div className='flex items-center justify-center mt-10 max-sm:mt-[-40%] bg-black'>
                <div className='w-[70%]'>
                    {albums.slice(0, 12).map((album, index) =>

                    (
                        <div className="grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96 m-8 ">
                            <Carousel>
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide_albums%2F408721136_7366342310045296_2384516786049187874_n.jpg?alt=media&token=053033f3-81b7-4657-9ed6-71040c7fcbf0" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide_albums%2F406516192_3585586465088360_3409389084927041750_n.jpg?alt=media&token=0af3325d-06b4-4460-ae14-c62667288afa" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide_albums%2F409187086_4451709981721043_3643374828124260085_n.jpg?alt=media&token=05abe67a-3d61-47eb-b841-7b6954774a73" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide_albums%2F409567661_10229418229176876_2965978459460606871_n.jpg?alt=media&token=56e7a2a4-a1f8-40bc-839b-473cc0b30e16" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide_albums%2F409883945_319694114319253_2919559267992298764_n.jpg?alt=media&token=e446e0a5-ac45-45ed-9167-7b492dba7bf9" alt="..." />
                                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fslide_albums%2F409928106_6857724544348658_2938814212268427496_n.jpg?alt=media&token=dbd5761a-5d0f-4993-b1fc-2206d4fd5083" alt="..." />

                            </Carousel>
                            <Link to={`/photoofalbums/${album.id}`}>
                                <div className='cursor-pointer m-2 max-sm:w-[20%] max-sm:ml-10 max-sm:mt-10 duration-500 hover:scale-105 hover:shadow-xl'>
                                    <div className=' flex items-center justify-center '>
                                        <div className='h-auto w-64 bg-white max-sm:hidden max-md:hidden'>
                                            <img src={album.cover_photo} alt="" className='h-64 w-64 object-cover' />
                                        </div>
                                    </div>
                                    <div className=' flex items-center justify-center m-2'>
                                        <span className='text-white font-medium text-5xl max-sm:text-2xl max-md:text-3xl'>Albums</span>
                                    </div>
                                    <div className=' flex items-center justify-center'>
                                        <span className='text-white font-medium text-4xl max-sm:text-xl max-md:text-2xl'>{album.name}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default AlbumsPage
