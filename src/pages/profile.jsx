import React from 'react';
import ProfileUser from '../components/Profile/profile'

const Profile = () => {
    document.title = 'Thông tin cá nhân';
    return (
        <div>
            <ProfileUser />
        </div>
    )
}

export default Profile;