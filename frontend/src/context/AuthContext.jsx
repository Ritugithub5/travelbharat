// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useSafeAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      logout: () => {},
      login: async () => ({ success: false, message: 'Auth not available' }),
      register: async () => ({ success: false, message: 'Auth not available' }),
      updateProfile: async () => ({ success: false, message: 'Auth not available' }),
      loading: false
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          setUser(userData);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      const updatedUser = response.data.user;
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Update failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'admin' || user?.role === 'editor';

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    updateProfile,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;