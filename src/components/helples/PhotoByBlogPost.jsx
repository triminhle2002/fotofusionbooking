import React, { useEffect, useState } from "react";
import { getListPhotoByBlogId } from "../../apis/photo";
import "./AlbumsPhotoPage.scss";

const PhotoByBlogPost = ({ blog_id }) => {
  const [photos, setPhotos] = useState([]);
  const [urlImg, setUrlImg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListPhotoByBlogId({ blog_id });
        setPhotos(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ảnh:", error);
      }
    };
    if (blog_id !== undefined) {
      fetchData();
    }
  }, [blog_id]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="gallerys grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4">
          {photos.slice(0, 6).map((photo, index) => (
            <div
              className="pics transform scale-100 hover:scale-110 cursor-pointer mb-4 relative group"
              key={index}
              onClick={() => {
                document.getElementById("my_modal_2").showModal();
                setUrlImg(photo.url_photo);
              }}
            >
              <img
                src={photo.url_photo}
                alt={`Hình ảnh ${index + 1}`}
                className="w-full h-48 object-cover rounded-md transition duration-300 transform group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="text-white text-lg">View Image</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-center">
            <img
              src={urlImg}
              alt="Hình ảnh"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default PhotoByBlogPost;
