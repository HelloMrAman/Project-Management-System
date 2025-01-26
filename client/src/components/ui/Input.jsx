import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Input = React.forwardRef(
  ({ label, id, type, placeholder, value, onChange, error, className, ...props }, ref) => {
    return (
      <div className={clsx('w-full', className)}>
        {label && (
          <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
          className={clsx(
            'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm',
            error ? 'border-red-500' : 'border-gray-300'
          )}
          autoComplete={id === 'email' ? 'email' : id === 'password' ? 'new-password' : ''}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  error: '',
  className: '',
};
