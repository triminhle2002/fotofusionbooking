import React, { useEffect, useState } from 'react';
import * as videoApi from '../../apis/video'
const AlbumsVideo = () => {
    const [videos, setVideos] = useState([])

    const getVideosFromDatabase = async () => {
        try {
            const response = await videoApi.getListVideo();
            console.log(response);
            const formattedVideos = response.map((video) => ({
                src: video.url_video,
                ref: React.createRef(),
            }));
            setVideos(formattedVideos);
        } catch (error) {
            console.error('Error fetching videos from the database:', error);
        }
    };

    useEffect(() => {
        getVideosFromDatabase();
    }, []);
    useEffect(() => {
        const updateVideoStyle = (video) => {
            const videoElement = video.ref.current;

            if (videoElement) {
                const { videoWidth, videoHeight } = videoElement;
                const aspectRatio = videoWidth / videoHeight;

                if (aspectRatio > 1) {
                    // Video chiều ngang
                    videoElement.style.width = '100%'; // 2/3
                    videoElement.style.height = '60vh';
                } else {
                    // Video chiều dọc hoặc vuông
                    videoElement.style.width = '100%'; // 1/3
                    videoElement.style.height = '80vh';
                }
            }
        };

        const handleResize = () => {
            videos.forEach((video) => {
                updateVideoStyle(video);
            });
        };

        window.addEventListener('resize', handleResize);

        videos.forEach((video) => {
            window.addEventListener('resize', () => updateVideoStyle(video));
        });

        handleResize(); // Gọi ngay khi component được mount

        return () => {
            window.removeEventListener('resize', handleResize);
            videos.forEach((video) => {
                window.removeEventListener('resize', () => updateVideoStyle(video));
            });
        };
    }, [videos]);
    return (
        <div className='bg-black'>
            <div className='w-full'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2FbgCostumer.png?alt=media&token=c514d7f3-8c58-4350-a5e5-f53c7971ed5f" alt="" />
            </div>
            {videos.map((video, index) => (
                <div key={index} className='flex items-center justify-center w-full m-4 '>
                    <div>
                        <video
                            className='border border-white p-4 m-8'
                            ref={video.ref}
                            controls
                            style={{ objectFit: 'cover' }}
                        >
                            <source src={video.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlbumsVideo;
