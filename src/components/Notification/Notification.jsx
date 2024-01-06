import React, { useEffect, useRef, useState } from 'react';
import { icons } from "../../utils/icons";

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [countNewNotification, setCountNewNotification] = useState(1);
    const [notifications, setNotificationList] = useState([
        {
            id: 1,
            content: 'You have memories to look back on today.',
            time: '14 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
        {
            id: 1,
            content: 'You have a new friend suggestion You have a new friend suggestion You have a new friend suggestion',
            time: '20 hours ago',
        },
    ]);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <icons.BiMessageAltDetail onClick={() => setIsOpen(!isOpen)} class='relative' style={{ left: countNewNotification > 0 ? 52 : 35, top: 7, fontSize: 30, color: '#111' }} />
            <div>
                {countNewNotification > 0 && (
                    <div class='relative bg-cyan-50 w-4 h-4 flex justify-center items-center rounded-[50%]' style={{ left: 43 }}>
                        <span class='text-sm  font-bold text-black'>{countNewNotification}</span>
                    </div>
                )}
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                class='border-[none] rounded-[50%] w-10 h-10 flex justify-center items-center mr-2 bg-orange-100'>
                {isOpen && (
                    <div ref={dropdownRef} class='py-2 select-none rounded-xl relative top-72 right-40 bg-slate-100'>
                        <div class='w-[400px] h-[500px] text-black overflow-y-auto'>
                            <h3 class='px-2 text-left text-2xl bold'>Thông báo</h3>
                            <div class='px-2 flex flex-col gap-1 my-3' stlye={{ padding: '0px 0px 0px 10px' }}>
                                {notifications?.map(item => (
                                    <div key={item?.id} class='w-full p-2 gap-1 flex flex-col justify-start items-start min-h-10 rounded-md bg-white hover:bg-orange-100 '>
                                        <span class='text-left bold'>
                                            {item?.content}
                                        </span>
                                        <span class='text-xs text-right w-full text-blue-900 bold'>
                                            {item?.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </button>

        </>
    );
};

export default Notification;