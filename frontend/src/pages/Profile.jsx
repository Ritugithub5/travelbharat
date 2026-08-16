// frontend/src/pages/Profile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaSave, FaCamera } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate passwords if changing
    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        setLoading(false);
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        setLoading(false);
        return;
      }
      if (!formData.currentPassword) {
        setError('Current password is required to change password');
        setLoading(false);
        return;
      }
    }

    try {
      const updateData = {
        username: formData.username,
        email: formData.email
      };
      
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const result = await updateProfile(updateData);
      
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setEditMode(false);
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition mb-6"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-600"></div>
          
          {/* Profile Header */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-12 gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition shadow-lg">
                  <FaCamera size={12} />
                </button>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800">{user?.username}</h1>
                <p className="text-gray-500">{user?.email}</p>
                <span className="inline-block mt-1 px-3 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
                </span>
              </div>
              <div className="flex gap-2">
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition font-medium"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                        editMode ? 'border-gray-300' : 'border-gray-100 bg-gray-50'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                        editMode ? 'border-gray-300' : 'border-gray-100 bg-gray-50'
                      }`}
                    />
                  </div>
                </div>

                {/* Change Password Section */}
                {editMode && (
                  <>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="password"
                              name="currentPassword"
                              value={formData.currentPassword}
                              onChange={handleChange}
                              placeholder="Enter current password"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="password"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                              placeholder="Enter new password"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              placeholder="Confirm new password"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {editMode && (
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-xl font-semibold text-white transition flex items-center justify-center gap-2 ${
                      loading
                        ? 'bg-orange-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave /> Save Changes
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;