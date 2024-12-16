import React from 'react';

const Card = ({ title, subtitle, count }) => {
    return (
        <div className="bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8 flex flex-col items-center gap-4">
            <h2 className='text-pink-900 text-2xl font-bold uppercase'>{title}</h2>
            <h3 className='text-gray-600 text-xl'>{subtitle}</h3>
            <p className='text-pink-900 text-4xl font-extrabold'>{count}</p>
        </div>
    );
};

export default Card;