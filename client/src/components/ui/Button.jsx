import React from 'react';

// Button Component
const Button = ({ children, className, onClick, type = 'button', disabled, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded text-white transition-all duration-200 ease-in-out ${
        disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};


export default Button;
