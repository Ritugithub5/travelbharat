// frontend/src/context/AppContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api, { API_URL } from '../services/api';

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [states, setStates] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const fetchStates = async () => {
    setLoading(true);
    try {
      const response = await api.get('/states');
      setStates(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDestinations = async (filters = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/destinations?${queryParams}`);
      setDestinations(response.data.destinations || response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    states,
    destinations,
    loading,
    error,
    searchTerm,
    selectedCategory,
    selectedState,
    setSearchTerm,
    setSelectedCategory,
    setSelectedState,
    fetchStates,
    fetchDestinations,
    API_URL
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};