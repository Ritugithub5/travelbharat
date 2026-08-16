// frontend/src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaArrowRight, FaUserPlus, FaCheckCircle } from 'react-icons/fa';
import { useSafeAuth } from '../context/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Get auth context
  const auth = useSafeAuth();
  const { register } = auth;

  // Debug - log auth state
  console.log('SignUp - Auth available:', !!register);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validations
    if (!formData.username.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the Terms & Conditions');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting registration...');
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      console.log('Registration result:', result);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred: ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful! 🎉</h2>
          <p className="text-gray-600 mb-4">Welcome to TravelBharat!</p>
          <div className="animate-pulse">
            <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserPlus className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join TravelBharat and start exploring India</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Choose a username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Create a password (min 6 characters)"
                minLength={6}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Confirm your password"
                minLength={6}
              />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-600">
              I agree to the{' '}
              <Link to="/Terms" className="text-orange-600 hover:text-orange-700 font-medium">
                Terms & Conditions
              </Link>
            </label>
          </div>

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
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <FaArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;