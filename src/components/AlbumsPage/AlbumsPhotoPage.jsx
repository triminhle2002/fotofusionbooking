import React, { useEffect, useState, useRef } from "react";
import SlideHeader from "../SlidePhoto/SlideHeader";
import { getListPhotoByAlbumsId } from "../../apis/photo";
import { Link, useLocation } from "react-router-dom";
// import "../helples/AlbumsPhotoPage.scss";
import { Button } from "flowbite-react";

const AlbumsPhotoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [photos, setPhotos] = useState([]);

  const [urlImg, setUrlImg] = useState("");

  const location = useLocation();
  const albumsid = location.pathname.split("/").pop(); // Đặt albumsid theo giá trị bạn muốn truyền.
  console.log(albumsid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListPhotoByAlbumsId({ albumsid });
        console.log(response);
        setPhotos(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ảnh:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black">
      <div className="w-full h-auto">
        <SlideHeader />
        <div className="flex items-center justify-center">
          <Link to={`/pricelist/${albumsid}`}>
            <Button className="text-6xl h-16 mt-[-50%] font-medium text-white z-40 max-sm:text-xl max-sm:mt-[-70%] ">
              Bảng giá chi tiết của albums
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-[80%] m-auto flex items-center justify-center">
        <div className="gallerys grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {photos.map((photo, index) => {
            return (
              <div
                className="pics transform scale-100 hover:scale-110"
                key={index}
                onClick={() => {
                  document.getElementById("my_modal_2").showModal();
                  setUrlImg(photo.url_photo);
                }}
              >
                <img
                  src={photo.url_photo}
                  alt={`Hình ảnh ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
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

export default AlbumsPhotoPage;
