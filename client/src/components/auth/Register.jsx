import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { AlertCircle } from 'lucide-react';
import InputField from '../ui/InputField';
import { authService } from '../../services/authService';
import { loginSuccess } from '../../redux/slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Perform registration using authService
        const response = await authService.register(name, email, password);
        
        // Immediately log in the user after successful registration
        const loginResponse = await authService.login(email, password);
        
        // Dispatch login success to update Redux store
        dispatch(loginSuccess({
          token: loginResponse.token
        }));

        // Navigate to dashboard
        navigate('/dashboard');

      } catch (err) {
        // Handle registration errors
        setErrors({ 
          form: err.message || 'Registration failed. Please try again.'
        });
      }
    }
  };

  const handleSwitchToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Create Your Account</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Start managing your projects effectively</p>
        </CardHeader>
        <CardContent>
          {/* Error handling remains the same */}
          {errors.form && (
            <div className="mb-4 flex items-center text-red-600 bg-red-50 p-3 rounded">
              <AlertCircle className="mr-2 h-5 w-5" />
              <span>{errors.form}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Input fields remain the same */}
            <InputField
              id="name"
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <InputField
              id="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />
            <InputField
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="new-password"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <InputField
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              autoComplete="new-password"
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
            <Button 
              type="submit" 
              className="w-full mt-4" 
              disabled={!name || !email || !password || !confirmPassword}
            >
              Create Account
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={handleSwitchToLogin} 
                className="text-blue-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;