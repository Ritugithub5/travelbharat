// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n/i18n'; // Import i18n configuration

// Set page title and meta tags directly
document.title = 'TravelBharat - Explore India State by State';

// Add meta description
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'Discover tourist destinations across India. Explore states, heritage sites, and travel insights.';
document.head.appendChild(metaDescription);

// Add viewport meta for mobile
const viewportMeta = document.createElement('meta');
viewportMeta.name = 'viewport';
viewportMeta.content = 'width=device-width, initial-scale=1.0';
document.head.appendChild(viewportMeta);

// Add theme color
const themeColor = document.createElement('meta');
themeColor.name = 'theme-color';
themeColor.content = '#f97316';
document.head.appendChild(themeColor);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();