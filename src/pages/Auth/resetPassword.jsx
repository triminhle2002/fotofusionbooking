import React from 'react'
import ResetPassWord from '../../components/Auth/RessetPassWord'

const resetPassword = () => {
    document.title = "Thay đổi Mật Khẩu";
    return (
        <div>
            <ResetPassWord />
        </div>
    )
}

export default resetPassword
