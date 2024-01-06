import React, { useContext, useEffect, useState } from 'react'
import { FiSend } from "react-icons/fi";
import { Button } from 'flowbite-react';
import * as commentApi from '../../apis/comment'
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';

const Comment = ({ id }) => {
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
    const [loading, setLoading] = useState(false);

    const [comments, setComments] = useState([]);
    const { auth } = useContext(AuthContext);
    const [newComment, setNewComment] = useState('');

    const fetchData = async () => {
        try {
            const response = await commentApi.getAllCommentByBlogPostID(id);
            setComments(response);
        } catch (error) {
            console.error('Lỗi khi lấy bình luận:', error);
        }
    };
    const postComment = async () => {
        try {
            if (newComment.trim() === '') {
                notify('Bình luận không được trống.');
                return;
            }
            await commentApi.CreateACommentForBlog(auth.accessToken, auth.id, id, newComment);
            setLoading(false)
            fetchData();
            setNewComment('');
        } catch (error) {
            notify('Lỗi khi gửi bình luận:', error);
            setLoading(false)
        }
    };
    const deleteComment = async (cmtid) => {
        try {
            await commentApi.deleteComment(auth.accessToken, cmtid);
            fetchData();
            notify('Bình luận đã được xóa.', 'success');
        } catch (error) {
            notify('Lỗi khi xóa bình luận:', 'error');

        }
    };
    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);
    useEffect(() => {
        console.log(comments);
    }, [comments]);

    return (
        <>
            <ToastContainer />
            <div className='w-full h-auto border'>
                <div className='flex items-start justify-center m-2'>
                    <div className="avatar-group -space-x-6 rtl:space-x-reverse w-[10%]">
                        <div className="avatar">
                            <div className="w-12">
                                <img src={auth.avatar} />
                            </div>
                        </div>
                    </div>
                    <div class="flex py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 w-[80%]">
                        <textarea
                            id="comment"
                            rows="1"
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment}
                            className="textarea textarea-accent w-[90%]"
                            placeholder="Viết bình luận của bạn..."
                            required
                        ></textarea>
                        <div className='flex items-center justify-center ml-4'>
                            <Button gradientMonochrome="lime" onClick={postComment} disabled={loading}>
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <Spinner className="h-6 w-6 mr-4" /> <span>Loading...</span>
                                    </div>
                                ) : (<FiSend />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
                {comments.map((comment) => (
                    <>
                        <div key={comment.id} className='flex items-start justify-center'>
                            <div className='w-4/5 flex items-start justify-center'>
                                <div className='w-[10%] avatar-group flex justify-center items-end'>
                                    <div className='avatar'>
                                        <div className='w-8'>
                                            <img src={comment.avatar_url} alt='Avatar' />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[90%] border bg-gray-100 p-1 rounded-xl my-2'>
                                    <div className='flex items-start justify-start '>
                                        <h1 className='text-base font-semibold'>{comment.name}</h1>
                                    </div>
                                    <div className='px-2'>
                                        <h2>{comment.content}</h2>
                                    </div>
                                    {auth.id === comment.user_id && (
                                        <div className='flex items-end justify-end'>
                                            <button className='text-xs mx-2 text-red-500' onClick={() => deleteComment(comment.id)}>Xóa</button>
                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                    </>
                ))}



            </div>
        </>
    )
}

export default Comment
