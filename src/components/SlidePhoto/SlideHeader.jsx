import React from 'react'
import { Carousel } from 'flowbite-react';


const SlideHeader = () => {
    return (
        <div className='w-full h-[720px]'>
            <Carousel slideInterval={5000}>
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2F398004595_875291740632934_1799511890170300826_n.jpg?alt=media&token=acbb8113-4628-4ce4-8d83-c988ae5ffbfe" alt="..." />
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2F403599610_24476846178627575_6803398088159024386_n.jpg?alt=media&token=fc51e04b-4da5-4316-9655-53b884c069ad" alt="..." />
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2F403603632_3495231907456806_4197749036494840419_n.jpg?alt=media&token=8350c923-02ed-4b90-96dc-fdce2e14c033" alt="..." />
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2F404092999_10161051357659153_8313984326657658124_n.jpg?alt=media&token=f8a263cb-b398-426d-9530-a5dcd36c3863" alt="..." />
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2F404545992_2787950168013136_3413700860123603350_n.jpg?alt=media&token=dddc5386-c29e-49ff-9b58-0916b6d1b079" alt="..." />
            </Carousel>
        </div>


    )
}

export default SlideHeader
