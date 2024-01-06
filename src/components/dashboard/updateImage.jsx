import React, { useContext, useState, useEffect } from 'react'

import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";

import { v4 } from "uuid";


import * as firebase from '../../apis/firebase'



const UpdateImage = () => {
    const [imageUploads, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    // const imagesListRef = ref(storage, "/Blog/4");

    const imagePathToDelete = 'https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/test%2F172975d4ce1cfdd437071cf44a0a3cbd.jpg?alt=media&token=7f47bef7-8e5b-4e5c-8b40-8ef0743bb3dd';
    useEffect(() => {
        const handleDeleteImage = async () => {
            try {
                await firebase.deleteImage(imagePathToDelete);
                console.log('Component đã xóa hình ảnh thành công.');
            } catch (error) {
                console.error('Lỗi khi xóa hình ảnh trong component:', error);
            }
        };

        // Gọi hàm xóa ảnh khi component được render
        handleDeleteImage();
    }, [imagePathToDelete]);


    // const handleChange = (e) => {
    //     for (let i = 0; i < e.target.files.length; i++) {
    //         const newImage = e.target.files[i];
    //         newImage["id"] = Math.random();
    //         setImageUpload((prevState) => [...prevState, newImage]);
    //     }
    // };


    // const uploadFile = async () => {
    //     //const urls = [];
    //     await Promise.all(
    //         imageUploads.map(async (imageUpload) => {
    //             const imageRef = ref(storage, `/Blog/3/${imageUpload.name + v4()}`);

    //             try {
    //                 const snapshot = await uploadBytes(imageRef, imageUpload);
    //                 const url = await getDownloadURL(snapshot.ref);
    //                 //urls.push(url);
    //                 setImageUrls((prev) => [...prev, url]);
    //             } catch (error) {
    //                 console.error("Error uploading image: ", error);
    //             }
    //         })
    //     );
    // }

    // useEffect(() => {
    // imageUrls.map((imgurl) => {
    //     console.log(imgurl);
    // })

    //     listAll(imagesListRef).then((response) => {
    //         const urls = [];
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 setImageUrls((prev) => [...prev, url]);
    //                 urls.push(url);
    //             });
    //         });
    //     });
    // }, []);


    return (
        <div className="w-100% h-auto mt-80">

            {/* <progress value={progress} max="100" />
            <br />
            <br />
            <input type="file" multiple onChange={handleChange} />
            <button onClick={uploadFile}>Upload</button>
            <br /> */}

            {/* 
            <div>
                <h3>Total URLs: {imageUrls.length}</h3>
                <ul>
                    {imageUrls.map((url, index) => (
                        <li key={index}>
                            <p> {url}</p>
                            <img className='w-[300px] m-10' src={url} />;
                        </li>
                    ))}
                </ul>
            </div> */}
            {/* {
                imageUrls.map((url) => {
                    <span>{url}</span>
                })
            } */}
        </div>
    )
}

export default UpdateImage
