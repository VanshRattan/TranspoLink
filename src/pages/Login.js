import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Truck, 
  Building,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const userTypes = [
    { id: 'business', label: 'Business Owner', icon: <Building className="w-5 h-5" />, description: 'I need to transport goods' },
    { id: 'driver', label: 'Driver', icon: <Truck className="w-5 h-5" />, description: 'I provide transport services' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.userType) {
      newErrors.userType = 'Please select your user type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate login - in real app, this would be an API call
      const userData = {
        email: formData.email,
        userType: formData.userType,
        name: formData.email.split('@')[0], // Simple name generation
        id: Date.now().toString()
      };
      
      // Login using context
      login(userData);
      
      // Redirect based on user type
      if (formData.userType === 'driver') {
        navigate('/driver-dashboard');
      } else if (formData.userType === 'business') {
        navigate('/client-dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-primary-green to-primary-orange rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
        >
          Sign in to your account
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 text-center text-sm text-gray-600"
        >
          Or{' '}
          <Link
            to="/signup"
            className="font-medium text-primary-green hover:text-green-500 transition-colors duration-200"
          >
            create a new account
          </Link>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-1 gap-3">
                {userTypes.map((type) => (
                  <label
                    key={type.id}
                    className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all duration-200 ${
                      formData.userType === type.id
                        ? 'border-primary-green ring-2 ring-primary-green ring-opacity-50 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.id}
                      checked={formData.userType === type.id}
                      onChange={(e) => handleInputChange('userType', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formData.userType === type.id
                            ? 'border-primary-green bg-primary-green'
                            : 'border-gray-300'
                        }`}>
                          {formData.userType === type.id && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex flex-col">
                        <span className={`block text-sm font-medium ${
                          formData.userType === type.id ? 'text-primary-green' : 'text-gray-900'
                        }`}>
                          {type.label}
                        </span>
                        <span className="block text-sm text-gray-500">
                          {type.description}
                        </span>
                      </div>
                    </div>
                    {formData.userType === type.id && (
                      <CheckCircle className="absolute top-4 right-4 h-5 w-5 text-primary-green" />
                    )}
                  </label>
                ))}
              </div>
              {errors.userType && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.userType}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-200 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.email && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-200 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button className="font-medium text-primary-green hover:text-green-500 transition-colors duration-200">
                  Forgot your password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green transition-colors duration-200"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-green-500 group-hover:text-green-400" />
                </span>
                Sign in
              </button>
            </div>
          </form>

          {/* Demo Accounts Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</h3>
            <div className="space-y-1 text-xs text-gray-600">
              <p><strong>Driver:</strong> driver@demo.com / password123</p>
              <p><strong>Business:</strong> business@demo.com / password123</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 