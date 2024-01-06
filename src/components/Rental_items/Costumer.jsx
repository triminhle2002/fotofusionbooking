import React from 'react';
import Costumers from '../helples/Costumer';
const Costumer = () => {
    const onSelectCostumer = () => {
        console.log("Costumer selected");

    };
    return (
        <div>
            <div className='w-full'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2FbgCostumer.png?alt=media&token=c514d7f3-8c58-4350-a5e5-f53c7971ed5f" alt="" />
                <Costumers onSelectCostumer={onSelectCostumer} />
            </div>

        </div>
    );
};
export default Costumer;
