import React, { useContext, useEffect, useState } from 'react'
import * as blogpost from '../../../apis/blogpost'
import * as photo from '../../../apis/photo'
import * as firebase from '../../../apis/firebase'
import AddBlogPost from '../add/AddBlogPost'
import EdidBlogPost from '../edid/edidBlogPost';
import { formatDateTime } from '../../helples/Format'
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import AuthContext from '../../../context/authProvider';
import { Table, Button, Modal } from 'flowbite-react';

const BlogPost = () => {
    const [blogposts, setBlogposts] = useState([])

    const { auth } = useContext(AuthContext);

    const [selectedItem, setSelectedItem] = useState(null);
    const [blog_id, setBlog_id] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [delete_costumer, setDelete_costumer] = useState(false);
    const [url_photos, setUrl_photos] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reloadPage, setReloadPage] = useState(false);


    const notify = (message, type) => {
        const toastType = type === 'success' ? toast.success : toast.error;
        return toastType(message, {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    useEffect(() => {
        if (!isModalOpen && reloadPage) {
            window.location.reload();
        }
    }, [isModalOpen, reloadPage]);


    //Lấy tất cả blogpost ra dạng bảng
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await blogpost.getAllBlogPost();
                setBlogposts(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        fetchData();
    }, []);



    useEffect(() => {
        console.log(blog_id);
        const fetchData = async () => {
            try {
                const response = await photo.getListPhotoByBlogId({ blog_id });
                const dataPhoto = response.data; // Kiểm tra cách dữ liệu được trả về

                // Kiểm tra xem dataPhoto có thuộc tính data và là mảng không
                if (Array.isArray(dataPhoto)) {
                    const urlPhotos = dataPhoto.map(data => data.url_photo);
                    // Kiểm tra xem có giá trị trong mảng urlPhotos không
                    if (urlPhotos.length > 0) {
                        setUrl_photos(prevUrlPhotos => [...prevUrlPhotos, ...urlPhotos]);
                    } else {
                        console.log('Mảng urlPhotos trống');
                    }
                } else {
                    console.log('Dữ liệu không phải là mảng');
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
            }
        };
        fetchData();
    }, [blog_id]);

    useEffect(() => {
        console.log(url_photos);
    }, [url_photos])

    const handleDeleteImage = async () => {

        try {
            let allImagesDeleted = true; // Biến flag để theo dõi trạng thái xóa hình ảnh
            console.log(url_photos);
            for (const url_photo of url_photos) {
                const deleteSuccess = await firebase.deleteImage(url_photo);
                if (!deleteSuccess) {
                    // Nếu một hình ảnh không xóa thành công, đặt biến flag là false
                    allImagesDeleted = false;
                    notify("Xóa hình ảnh trên firebase không thành công", 'error');
                    break; // Thoát khỏi vòng lặp nếu một hình ảnh không xóa thành công
                }
            }

            const deletePhoto = await photo.deletePhotoByBlogId(auth.accessToken, blog_id);

            if (deletePhoto.statusCode === 204) {
                // Nếu tất cả hình ảnh đã xóa thành công, bạn có thể tiếp tục xóa blogpost ở đây
                const deleteCostumer = await blogpost.deleteBlogPost(auth.accessToken, blog_id);
                if (deleteCostumer.statusCode === 204) {
                    notify("Xóa bài viết thành công", 'success');
                    handleCloseModal();
                } else {
                    notify("Xóa bài viết không thành công", 'error');
                }
            } else {
                // Nếu có ít nhất một hình ảnh không xóa thành công, thông báo lỗi
                notify("Xóa hình ảnh của bài viết không thành công", 'error');
            }

        } catch (error) {
            notify("Xóa thiết bị không thành công", 'error');
        }
    };
    if (delete_costumer) {
        handleDeleteImage();
    }


    const openEditModal = (item) => {
        setSelectedItem(item);
        document.getElementById('my_modal_4 edit').showModal();
    };
    const openDeleteModal = (id) => {
        setBlog_id(id)
        setOpenModal(true)
    }


    const handleCloseModal = () => {
        setIsModalOpen(false);
        setReloadPage(true);
    }

    return (

        <div>
            <ToastContainer />
            <div className='w-full flex items-center justify-center m-2'>
                <span className='text-2xl font-semibold'>Quản Lí Bài Viết</span>
            </div>
            <div className='flex items-center justify-center'>
                <div className='w-3/5 h-10 m-4 flex items-center justify-center'>

                    <div className='flex items-center justify-center'>
                        <Button gradientMonochrome="lime" onClick={() => document.getElementById('my_modal_4_1').showModal()}>Thêm Bài Viết Mới</Button>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_4_1" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <AddBlogPost />
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => handleCloseModal()}>✕</button>
                            <button className="btn" onClick={() => handleCloseModal()}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className='flex items-center justify-center'>
                <div className='w-[80%] m-4'>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Tiêu đề</Table.HeadCell>
                            <Table.HeadCell>Tác giả</Table.HeadCell>
                            <Table.HeadCell>Ngày viết</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {blogposts.map((item) => {
                                return (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item.title}
                                        </Table.Cell>
                                        <Table.Cell>{item.author}</Table.Cell>
                                        <Table.Cell>{formatDateTime(item.date)}</Table.Cell>
                                        <Table.Cell>
                                            <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 m-1 "
                                                onClick={() => openEditModal(item)}>
                                                Sửa
                                            </button>
                                            <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 m-1"
                                                onClick={() => openDeleteModal(item.id)}>
                                                Xóa
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                            <dialog id="my_modal_4 edit" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl">
                                    <EdidBlogPost item={selectedItem} />
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => handleCloseModal()}>✕</button>
                                            <button className="btn" onClick={() => handleCloseModal()}>Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                                <Modal.Header />
                                <Modal.Body>
                                    <div className="text-center">
                                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Bạn có chắc rằng bạn muốn xóa thiết bị này?
                                        </h3>
                                        <div className="flex justify-center gap-4">
                                            <Button color="failure" onClick={() => { setOpenModal(false); setDelete_costumer(true) }}>
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
    )
}

export default BlogPost
