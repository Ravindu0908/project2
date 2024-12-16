import React from 'react';

const Button = (props) => {
    const { btnText, borderColor, backgroundColor, fontColor, border } = props;

    const buttonStyle = {
        borderColor: borderColor || 'black', 
        backgroundColor: backgroundColor || 'white', 
        color: fontColor || 'black', 
        border: border || '3px solid', 
        padding: '0.5rem 2rem', // Adding padding for styling
        borderRadius: '9999px', // Using a large border radius for a rounded shape
    };

    return (
        <button className='py-2 px-8 rounded-full' style={buttonStyle}>
            {btnText}
        </button>
    );
};

export default Button;
