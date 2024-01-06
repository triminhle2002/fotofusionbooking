import React, { useEffect, useState } from 'react'
import { icons } from '../../utils/icons';
import { Dropdown } from 'flowbite-react';
import * as blogpost from '../../apis/blogpost'
import { formatDateTime } from '../helples/Format'
import PhotoByBlogPost from '../helples/PhotoByBlogPost';
import Comment from '../helples/Comment';



const BlogPost = () => {
    const [blogposts, setBlogposts] = useState([]);
    const [blogpostID, setBlogpostID] = useState('');

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogpostsData = await blogpost.getAllBlogPost();
                setBlogposts(blogpostsData);
            } catch (error) {
                console.error('Error fetching blogposts:', error);
            }
        };

        fetchData();
    }, []);

    const handleExpand = () => {
        setExpanded(!expanded);
    };


    const handleLikeClick = () => {
        if (!liked) {
            // Tăng số lượt like khi người dùng bấm vào nút like
            setLikes(likes + 1);
        } else {
            // Giảm số lượt like khi người dùng nhấn lần 2
            setLikes(likes - 1);
        }
        // Đảo ngược trạng thái liked
        setLiked(!liked);
    };
    useEffect(() => { console.log(blogposts); }, [blogposts]);
    return (
        <div className='w-full  bg-black'>
            <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgprilice.png?alt=media&token=65e6f565-b049-44b1-adda-d888c962b1ab" alt="" />
            <div className='flex items-center justify-center mt-[-5%]'>
                <div className='w-[80%]'>
                    {blogposts.map((blogpost) => {

                        return (
                            <div className='m-4' key={blogpost.id}>
                                <div class="bg-white rounded shadow-lg max-w-[80%] mx-auto ">
                                    <header class="p-4 flex">
                                        <img src="https://via.placeholder.com/200" class="float-left rounded-full w-10 h-10 m-1 mr-3" />
                                        <div>
                                            <h3 class="text-lg font-bold">{blogpost.author}</h3>
                                            <p class="text-sm text-gray-600">{formatDateTime(blogpost.date)}</p>
                                        </div>
                                    </header>
                                    <section >
                                        <div className='flex items-center justify-center'>
                                            <span className='text-2xl w-[75%] font-semibold flex items-start justify-start max-sm:text-base'>
                                                {blogpost.title}
                                            </span>
                                        </div>
                                        <div>
                                            <PhotoByBlogPost blog_id={blogpost.id} />
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <div className='w-[90%] bg-gray-200 border shadow-lg rounded-sm flex items-center justify-center'>

                                                <div className="collapse bg-base-200">
                                                    <input type="checkbox" />
                                                    <div className="collapse-title text-xl font-medium">
                                                        Xem thêm ...
                                                    </div>
                                                    <div className="collapse-content">
                                                        <p style={{ whiteSpace: 'pre-line' }}>
                                                            {blogpost.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <footer class="p-4">
                                        <div className='grid grid-cols-3'>
                                            <div className='flex items-center justify-center'>
                                                <span className='py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center'
                                                    onClick={handleLikeClick}>
                                                    <span className='mr-2 '>
                                                        {liked ? <icons.FcLike /> : <icons.FcLikePlaceholder />}
                                                    </span>
                                                    <span>
                                                        {likes}  Thích
                                                    </span>
                                                </span>
                                            </div>
                                            <div className='flex items-center justify-center'>
                                                <div className='py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center'>
                                                    <span className='mr-2 '>
                                                        <icons.AiOutlineComment />
                                                    </span>
                                                    <span>Bình Luận</span>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-center'>
                                                <div className='py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center'>
                                                    <span className='mr-2 '>
                                                        <icons.BiShare />
                                                    </span>
                                                    <Dropdown label="Chia sẻ" inline className='bg-gray-600'>
                                                        <Dropdown.Item className='text-white hover:text-black'>Chia sẻ lên FaceBook</Dropdown.Item>
                                                        <Dropdown.Item className='text-white hover:text-black'>Chia sẻ lên Instagram</Dropdown.Item>
                                                        <Dropdown.Item className='text-white hover:text-black'>Chia sẻ qua messenger</Dropdown.Item>
                                                        <Dropdown.Item className='text-white hover:text-black'>Chia sẻ qua zalo</Dropdown.Item>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <Comment id={blogpost.id} />
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        );
                    })}


                </div >
            </div>
        </div >
    )
}

export default BlogPost
