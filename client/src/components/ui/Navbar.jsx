import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { authService } from '../../services/authService'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    if (authService.getCurrentUser()) {
      // If user is logged in, redirect to Dashboard
      navigate('/dashboard');
    } else {
      // If user is not logged in, navigate to Login page
      navigate('/login');
    }
  };

  const handleSignupClick = () => {
    if (authService.getCurrentUser()) {
      // If user is logged in, redirect to Dashboard
      navigate('/dashboard');
    } else {
      // If user is not logged in, navigate to Register page
      navigate('/signup');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="text-3xl font-bold text-teal-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/">VizSync</Link>
        </motion.div>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-700 hover:text-teal-600 transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-teal-600 transition">About</Link>
          <Link to="/features" className="text-gray-700 hover:text-teal-600 transition">Features</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-teal-600 transition">Pricing</Link>
          <Link to="/contact" className="text-gray-700 hover:text-teal-600 transition">Contact</Link>

          {/* Buttons */}
          <button
            onClick={handleLoginClick}
            className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition"
          >
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className="bg-gray-100 text-teal-600 py-2 px-6 rounded-lg hover:bg-gray-200 transition"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <motion.div
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </motion.div>
        </div>
      </div>

      {/* Mobile Navbar Links */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-white p-6 absolute top-0 left-0 right-0 shadow-md space-y-4`}
      >
        <Link to="/" className="text-gray-700 hover:text-teal-600 block">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-teal-600 block">About</Link>
        <Link to="/features" className="text-gray-700 hover:text-teal-600 block">Features</Link>
        <Link to="/pricing" className="text-gray-700 hover:text-teal-600 block">Pricing</Link>
        <Link to="/contact" className="text-gray-700 hover:text-teal-600 block">Contact</Link>
        <button
          onClick={handleLoginClick}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 block text-center"
        >
          Login
        </button>
        <button
          onClick={handleSignupClick}
          className="bg-gray-100 text-teal-600 py-2 px-6 rounded-lg hover:bg-gray-200 block text-center"
        >
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
