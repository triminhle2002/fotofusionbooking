import React, { useEffect, useState } from 'react';
import Room from '../helples/Room'
import { useNavigate } from 'react-router-dom';

const Studio = () => {
    const navigate = useNavigate();

    const onSelectRoom = () => {
        console.log("Costumer selected");
        navigate('/bookingOnline')
    };

    return (
        <div>
            <div className='w-full'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgstudio.png?alt=media&token=981be79e-b348-423f-9e2a-b3a822b06f17" alt="" />
            </div>

            <Room onSelectRoom={onSelectRoom} />
        </div>

    );
};

export default Studio;
