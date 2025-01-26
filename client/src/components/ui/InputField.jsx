import React from 'react';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  error,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  const isPasswordField = id === 'password';
  const isConfirmPasswordField = id === 'confirm-password';
  const isNameField = id === 'name';

  // Determine appropriate autocomplete attribute
  const getAutocompleteAttribute = () => {
    switch (id) {
      case 'email':
        return 'email';
      case 'name':
        return 'name';
      case 'password':
        return 'new-password';
      case 'confirm-password':
        return 'new-password';
      default:
        return 'off';
    }
  };

  return (
    <div className="mb-4 relative">
      <Label htmlFor={id} className="block mb-2">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pr-10 ${error ? 'border-red-500' : ''}`}
        autoComplete={getAutocompleteAttribute()}
      />
      {(isPasswordField || isConfirmPasswordField) && (
        <button
          type="button"
          onClick={() => {
            if (isPasswordField) {
              setShowPassword(!showPassword);
            } else {
              setShowConfirmPassword(!showConfirmPassword);
            }
          }}
          className="absolute right-3 top-9 text-gray-500"
        >
          {isPasswordField && (showPassword ? <EyeOff size={20} /> : <Eye size={20} />)}
          {isConfirmPasswordField && (showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />)}
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;