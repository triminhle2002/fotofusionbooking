import React from 'react'
import AlbumsPage from '../../components/AlbumsPage/AlbumsPage';

const albumsPage = () => {
    document.title = "albums ";
    return (

        <div>
            <AlbumsPage />
        </div>
    )
}

export default albumsPage
