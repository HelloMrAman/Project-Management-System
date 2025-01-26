import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice.js';
import { authService } from '../../services/authService.js';
import Button from '../ui/Button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: '', password: '', form: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const errors = { email: '', password: '', form: '' };
    let isValid = true;

    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(loginStart());
      
      try {
        const response = await authService.login(email, password);
        
        dispatch(loginSuccess({
          token: response.token
        }));
        
        navigate('/dashboard');
      } catch (err) {
        const errorMessage = err.message || 'Login failed';
        dispatch(loginFailure(errorMessage));
        setError(prev => ({ ...prev, form: errorMessage }));
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to continue to your dashboard
          </p>
        </CardHeader>
        <CardContent>
          {error.form && (
            <div className="mb-4 flex items-center text-red-600 bg-red-50 p-3 rounded">
              <AlertCircle className="mr-2 h-5 w-5" />
              <span>{error.form}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error.email}
              autoComplete="email"
            />
            <div className="relative mt-4">
              <Input
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <Button 
              type="submit" 
              className="w-full mt-6"
              disabled={!email || !password}
            >
              Sign In
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={onSwitchToRegister} 
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;