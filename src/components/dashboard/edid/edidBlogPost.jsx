import React, { useContext, useEffect, useState } from 'react'
import * as blogpostApi from '../../../apis/blogpost'

import AuthContext from '../../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import { formatCurrency, formatDateTime } from '../../helples/Format'



const EdidBlogPost = (item) => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [date, setDate] = useState('')


    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Add state to manage editing mode
    const { auth } = useContext(AuthContext);

    useEffect(() => {

        // Update state only if costumer object is not null
        if (item?.item) {
            setId(item.item.id || '')
            setTitle(item.item.title || '');
            setContent(item.item.content || '');
            setAuthor(item.item.author || '');
            setDate(item.item.date || '');
        }
    }, [item]);
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };
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
        const fetchAdd = async () => {
            try {
                const updateItem = await blogpostApi.updateBlogPost(auth.accessToken, id, title, content, author, date);
                console.log(updateItem);
                if (updateItem.statusCode === 200) {
                    notify("Sửa bài viết thành công", 'success');
                    setLoading(false);
                    setSubmit(false);
                    setIsEditing(false);
                } else {
                    notify("không thành công");
                    setLoading(false);
                    setSubmit(false);
                }
            } catch (error) {
                console.error('Error in fetchAdd:', error);
                setLoading(false);
                setSubmit(false);
            }
        };

        if (submit && auth.accessToken !== undefined) {
            fetchAdd();
        }
    }, [submit]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
        setLoading(true);
    };

    useEffect(() => {
        console.log(item);
    }, [item])

    return (
        <>
            <ToastContainer />
            <div className='w-full'>
                <div className="card card-side bg-base-100 shadow-xl">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="card-body ">
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập tiêu đề của bài viết
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập nội dung của bài viết
                                    </label>
                                    <textarea
                                        id="contenInput"
                                        rows="4"
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nhập mô tả"
                                        onChange={(event) => setContent(event.target.value)}
                                        value={content}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập tên tác giả bài viết
                                    </label>
                                    <input type="text"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={author} onChange={(e) => setAuthor(e.target.value)} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="w-[28%] font-medium text-left text-lg mb-2 text-black " htmlFor="">
                                        Nhập thời gian tạo
                                    </label>
                                    <input type="date"
                                        className='w-[70%] px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg'
                                        value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>

                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn btn-primary">
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <Spinner className="h-6 w-6 mr-4" /> <span>Loading...</span>
                                            </div>
                                        ) : (
                                            <span>Lưu</span>
                                        )}</button>
                                    <button type="button" onClick={handleCancelClick} className="btn btn-danger">Hủy</button>
                                </div>
                            </div>
                        </form>

                    ) : (
                        <div className="card-body">
                            <h2 className="card-title">Tiêu đề : {title} </h2>
                            <p style={{ whiteSpace: 'pre-line' }}>Nội dung :{content} </p>
                            <p>Tác giả:{author} </p>
                            <p>Ngày tạo :{formatDateTime(date)} </p>
                            <div className="card-actions justify-end">
                                <button onClick={handleEditClick} className="btn btn-primary">Chỉnh Sửa</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default EdidBlogPost
