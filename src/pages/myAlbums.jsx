import React from 'react'
import MyAlbums from '../components/AlbumsPage/MyAlbums';
const myAlbums = () => {
    document.title = 'Albums của tôi';
    return (
        <div>
            <MyAlbums />
        </div>
    )
}

export default myAlbums
