import React from 'react';

// Main Card component
export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg border border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// CardHeader component
export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={`p-4 border-b border-gray-200 font-bold text-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// CardTitle component
export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`text-xl font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
};

// CardContent component
export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
