// frontend/src/components/GoogleMapsButton.jsx
import React from 'react';

const GoogleMapsButton = ({ destination }) => {
  const openGoogleMaps = () => {
    if (!destination) return;
    
    const name = destination?.name || '';
    const state = destination?.state || destination?.stateId?.name || 'India';
    const query = encodeURIComponent(`${name} ${state}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={openGoogleMaps}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-200 hover:shadow-xl"
    >
      <span className="text-xl">📍</span>
      <span className="font-semibold">View on Google Maps</span>
    </button>
  );
};

export default GoogleMapsButton;