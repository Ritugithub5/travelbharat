// frontend/src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-700 transition text-sm font-medium border border-gray-700"
      title={currentLang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
    >
      <FaGlobe className="text-gray-400" />
      <span className="text-gray-300">
        {currentLang === 'en' ? '🇬🇧 English' : '🇮🇳 हिंदी'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;