import React from 'react'
import DashBoard from '../../components/dashboard/DashBoard'

const dashBoard = () => {
    document.title = "bảng điều khiển ";
    return (

        <div>
            <DashBoard />
        </div>
    )
}

export default dashBoard
