import React, { useContext, useEffect, useState } from "react";
import * as productApi from "../../../apis/product";
import * as photo from "../../../apis/photo";
import * as firebase from "../../../apis/firebase";

import AddProduct from "../add/AddProduct";

import AuthContext from "../../../context/authProvider";
import ProductContext from "../../../context/productProvider";

import { Table, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import { formatCurrency, formatDateTime } from "../../helples/Format";

const Product = () => {
  const { auth } = useContext(AuthContext);
  const { productsList } = useContext(ProductContext);

  const [costume_id, setCostume_id] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [delete_costumer, setDelete_costumer] = useState(false);
  const [url_photo, setUrl_photo] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    if (!isModalOpen && reloadPage) {
      window.location.reload();
    }
  }, [isModalOpen, reloadPage]);

  const notify = (message, type) => {
    const toastType = type === "success" ? toast.success : toast.error;
    return toastType(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleDeleteImage = async () => {
    try {
      if (url_photo) {
        const deleteSuccess = await firebase.deleteImage(url_photo);
        const deletePhoto = await photo.deletePhotoByProductId(
          auth.accessToken,
          costume_id
        );
        const deleteCostumer = await productApi.deleteProduct(
          auth.accessToken,
          costume_id
        );
        if (deleteCostumer.statusCode === 204) {
          notify("Xóa sản phảm thành công", "success");
          handleCloseModal();
        } else {
          notify("Xóa sản phảm không thành công");
        }
      }
    } catch (error) {
      notify("Xóa sản phẩm không thành công", "error");
    }
  };
  if (delete_costumer) {
    handleDeleteImage();
  }
  const openDeleteModal = (id) => {
    setCostume_id(id);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReloadPage(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className="w-full flex items-center justify-center m-2">
        <span className="text-2xl font-semibold">Quản Lí Sản Phẩm</span>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-3/5 h-10 m-4 flex items-center justify-center">
          <div className="flex items-center justify-center">
            <Button
              gradientMonochrome="lime"
              onClick={() =>
                document.getElementById("my_modal_4_1").showModal()
              }
            >
              Thêm Sản Phẩm Mới
            </Button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_4_1" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <AddProduct />
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => handleCloseModal()}
              >
                ✕
              </button>
              <button className="btn" onClick={() => handleCloseModal()}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="flex items-center justify-center">
        <div className="w-[80%] m-4">
          <Table>
            <Table.Head className="font-bold text-black">
              <Table.HeadCell>Tên</Table.HeadCell>
              <Table.HeadCell>Giá mới</Table.HeadCell>
              <Table.HeadCell>Giá cũ</Table.HeadCell>
              <Table.HeadCell>Loại</Table.HeadCell>
              <Table.HeadCell>Mô tả</Table.HeadCell>
              <Table.HeadCell>Số lượng</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {productsList.map((product) => {
                return (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="font-bold text-black">
                      {product.name}
                    </Table.Cell>
                    <Table.Cell>
                      {formatCurrency(product.discounted_price)}
                    </Table.Cell>
                    <Table.Cell>{formatCurrency(product.price)}</Table.Cell>
                    <Table.Cell>{product.category}</Table.Cell>
                    <Table.Cell>{product.description}</Table.Cell>

                    <Table.Cell>
                      <button
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 m-1"
                        onClick={() => {
                          setUrl_photo(product.url_photo);
                          openDeleteModal(product.id);
                        }}
                      >
                        Xóa
                      </button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}

              <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Bạn có chắc rằng bạn muốn xóa sản phẩm này?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button
                        color="failure"
                        onClick={() => {
                          setOpenModal(false);
                          setDelete_costumer(true);
                        }}
                      >
                        {"Đúng, Tôi muốn xóa nó"}
                      </Button>
                      <Button color="gray" onClick={() => setOpenModal(false)}>
                        Không, Tôi nhầm lẫn
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Product;
