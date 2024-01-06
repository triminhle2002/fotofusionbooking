import React from 'react';
import { formatDateTime } from '../helples//Format'

const CardPromotion = (props) => {
    return (
        <div class='w-full min-h-80 rounded-lg bg-gray-950 flex flex-row gap-6 '>
            {/* <img class='w-1/3 h-full' src={props?.imageLink} alt='imgBlog' /> */}
            <div class='px-5 py-5 w-full flex flex-col gap-5'>
                <div className='flex items-center justify-center'>
                    <span class='text-white text-4xl font-Montserrat'>{props?.title}</span>
                </div>
                <div class='grid-rows-2'>
                    <div>
                        <span class='text-btnprimary text-xl font-semibold'>Thời gian bắt đầu : {formatDateTime(props?.startdate)}</span>
                    </div>
                    <div>
                        <span class='text-btnprimary text-xl font-semibold '>Thời gian kết thúc : {formatDateTime(props?.enddate)}</span>
                    </div>
                </div>
                <span class='min-h-1/3 text-white text-base '>{props?.description}</span>
                <>
                    <div class='flex justify-end gap-4 w-full'>
                        <div>
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button" className="px-2 py-1 h-[35px] bg-blue-500 text-white rounded">Chia sẻ</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Chia sẻ lên facebook cá nhân</a></li>
                                    <li><a>Chia sẻ lên instagram</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class='cursor-pointer rounded-md bg-red-500 text-white px-2 py-1 h-[35px]' >
                            <span class='font-bold bold ' >{props?.status}</span>
                        </div>
                        <div class='cursor-pointer rounded-md bg-green-500 text-white px-2 py-1 h-[35px]' >
                            <span class='font-bold bold ' >{props?.type}</span>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

export default CardPromotion;