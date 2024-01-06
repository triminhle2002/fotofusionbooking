import React from 'react'
import MakeUps from '../helples/MakeUp'


const MakeUp = () => {
    const onSelectRoom = () => {
        console.log("Costumer selected");
        // navigate('/bookingOnline')
    };
    return (
        <div className='w-full bg-black'>
            <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2Fbgmakeup.png?alt=media&token=c77ae497-19bd-48fa-9a69-a82aec5fb0cf" alt="" />
            <MakeUps onSelectMakeUp={onSelectRoom} />
        </div>
    )
}

export default MakeUp
