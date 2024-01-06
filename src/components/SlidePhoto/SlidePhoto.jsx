import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlidePhoto = () => {

    const images = [
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty110.jpg?alt=media&token=e2f7f791-e9aa-49d9-9428-07e049d923da',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty104.jpg?alt=media&token=622ad1a7-a03d-4ae3-aba6-6960eefc93bd',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty113.jpg?alt=media&token=c101b5f6-4228-440b-ac6f-7ff076029afd',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty134.jpg?alt=media&token=fcd48247-b0b2-42bb-a654-9391fab66a36',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty127.jpg?alt=media&token=6fd16e17-1b54-449b-8a44-1fb23576621c',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty129.jpg?alt=media&token=5651005b-bb30-454c-832f-25161bbbc623',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty135.jpg?alt=media&token=3cbef1ea-1dd1-4962-82f4-91895c2bcb63',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty114.jpg?alt=media&token=48a6e83e-afdc-4c54-b637-b41f8d396f44',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty100.jpg?alt=media&token=eb365a09-6eb0-49bf-b07f-8a9448e49ce1',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty118.jpg?alt=media&token=fb302c2c-be42-47b5-8829-2c9b6655c920',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty119.jpg?alt=media&token=963ba281-ca5f-4e05-ae12-e9dfee92ece6',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty142.jpg?alt=media&token=8661bd5d-41d0-4cb0-9114-fe1fe3154d11',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty138.jpg?alt=media&token=7b23da7e-d643-41fe-a458-f7ad6a8e8ab1',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty106.jpg?alt=media&token=b4196135-ba79-4086-baf3-d6d78cc6949b',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty103.jpg?alt=media&token=39bbefb6-52ae-49f3-a0ba-d793bfd60924',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty139.jpg?alt=media&token=62c4cd53-205a-47ea-b425-14be88eef44f',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty141.jpg?alt=media&token=a45ff6af-81b5-4143-8654-8ecf9daafaaf',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty137.jpg?alt=media&token=4e14603e-4cac-49df-a7c9-bb0f39c8ed8d',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty122.jpg?alt=media&token=e91e5959-a125-42a6-95c8-76d09fa301fa',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty116.jpg?alt=media&token=6e80b0b4-e14b-4d68-bc0a-af3619be96f5',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty140.jpg?alt=media&token=5a70d18f-8150-4b21-8107-6c4453c13bd7',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty146.jpg?alt=media&token=0c273f07-f666-4be9-9937-1bf3ddf24ccd',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty126.jpg?alt=media&token=7a5e7335-2cc3-411f-84eb-baf0014d2a92',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty152.jpg?alt=media&token=3c74de60-4927-4035-825f-f033bb0f1ff6',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty105.jpg?alt=media&token=be4023a3-0154-4b06-8d8e-6d5f8b5aee68',
        'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/Albums%2FBeauty%2FBeauty154.jpg?alt=media&token=22d15447-6197-45c5-8fe7-090f5cc555a5'
    ]

    const settings = {
        infinite: true, // Cho phép trượt vô hạn
        speed: 500, // Tốc độ trượt
        slidesToShow: 5, // Hiển thị 5 hình ảnh cùng một lúc
        slidesToScroll: 1, // Trượt 1 hình ảnh mỗi lần
        autoplay: true, // Tự động trượt
        autoplaySpeed: 1000, // Khoảng thời gian giữa các lần trượt (5 giây)
    };

    return (
        <div className="w-full h-64 bg-black border border-white ">
            <Slider {...settings}>
                {images.map((imageUrl, index) => (
                    <div key={index}>
                        <img
                            src={imageUrl}
                            alt={`Hình ảnh ${index + 1}`}
                            className="w-64 h-64 object-cover "
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SlidePhoto
