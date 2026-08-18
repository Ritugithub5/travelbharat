// frontend/src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaArrowRight, FaEye, FaEyeSlash, FaCheckSquare, FaSquare } from 'react-icons/fa';
import { useSafeAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const auth = useSafeAuth();
  const { login, register } = auth;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('register') === 'true') {
      setIsLogin(false);
    }
    
    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleRememberMe = () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
    
    if (newValue) {
      // Saving email
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      // Removing saved email
      localStorage.removeItem('rememberedEmail');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔍 Attempting login with:', formData.email);

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
    }

    try {
      let result;
      if (isLogin) {
        console.log('📤 Calling login API...');
        result = await login(formData.email, formData.password);
        console.log('📥 Login response:', result);
        
        // Save email if remember me is checked and login successful
        if (result.success && rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else if (result.success && !rememberMe) {
          localStorage.removeItem('rememberedEmail');
        }
      } else {
        result = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
      }

      if (result.success) {
        console.log('✅ Login successful, navigating to home...');
        navigate('/');
      } else {
        console.log('❌ Login failed:', result.message);
        setError(result.message);
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin 
              ? 'Sign in to explore India\'s destinations' 
              : 'Join TravelBharat and start your journey'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  required={!isLogin}
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Choose a username"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                minLength={6}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required={!isLogin}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Confirm your password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={toggleRememberMe}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition"
              >
                {rememberMe ? (
                  <FaCheckSquare className="text-orange-500 text-lg" />
                ) : (
                  <FaSquare className="text-gray-400 text-lg" />
                )}
                <span>Remember Me</span>
              </button>
              <button
                type="button"
                className="text-sm text-orange-500 hover:text-orange-600 transition font-medium"
                onClick={() => {
                  alert('Please contact support to reset your password.');
                }}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2 ${
              loading 
                ? 'bg-orange-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg'
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <FaArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({
                email: '',
                password: '',
                username: '',
                confirmPassword: ''
              });
            }}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'}
          </button>
        </div>

        {isLogin && (
          <div className="mt-4 text-center text-xs text-gray-400 border-t pt-4">
            <p>Demo: admin@travelbharat.com / admin123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;