import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaSearch, 
  FaPalette,
  FaUser, 
  FaBars, 
  FaTimes, 
  FaMapMarkerAlt, 
  FaInfoCircle, 
  FaEnvelope, 
  FaSignOutAlt, 
  FaCog,
  FaCompass,
  FaPlane,
  FaTrain,
  FaBus,
  FaTaxi,
  FaHotel,
  FaSuitcase,
  FaUserPlus,
  FaChevronDown,
  FaGlobe,
} from 'react-icons/fa';
import { useSafeAuth } from '../context/AuthContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, isAuthenticated, logout, isAdmin } = useSafeAuth();
  const currentLang = i18n.language || 'en';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/');
      setIsOpen(false);
    }
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  // Navigation Links
  const exploreLinks = [
    { to: '/states', icon: <FaMapMarkerAlt />, label: t('navbar.states') || 'States' },
    { to: '/experience', icon: <FaCompass />, label: 'All Experiences' },
  ];

  const aboutLinks = [
    { to: '/about', icon: <FaInfoCircle />, label: t('navbar.about') || 'About' },
    { to: '/Cultural', icon: <FaPalette />, label: 'Cultural Heritage' },
    { to: '/contact', icon: <FaEnvelope />, label: t('navbar.contact') || 'Contact' },
  ];

  const transportPackagesLinks = [
    { to: '/flights', icon: <FaPlane />, label: t('booking.flights') || 'Flights' },
    { to: '/trains', icon: <FaTrain />, label: t('booking.trains') || 'Trains' },
    { to: '/buses', icon: <FaBus />, label: t('booking.buses') || 'Buses' },
    { to: '/cabs', icon: <FaTaxi />, label: t('booking.cabs') || 'Cabs' },
    { to: '/tourpackages', icon: <FaSuitcase />, label: t('booking.tourPackages') || 'Tour Packages' },
    { to: '/accommodations', icon: <FaHotel />, label: t('booking.accommodations') || 'Accommodations' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 flex-shrink-0"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              TravelBharat
            </span>
            <span className="text-lg hidden sm:inline">🇮🇳</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">

            {/* Explore Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => toggleDropdown('explore')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                  activeDropdown === 'explore' || exploreLinks.some(link => location.pathname === link.to)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                Explore
                <FaChevronDown className={`text-xs transition-transform duration-200 ${activeDropdown === 'explore' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'explore' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-fadeIn">
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        location.pathname === link.to
                          ? 'text-orange-600 bg-orange-50 font-medium'
                          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="text-orange-500 text-lg">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => toggleDropdown('about')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                  activeDropdown === 'about' || aboutLinks.some(link => location.pathname === link.to)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {t('navbar.about') || 'About'}
                <FaChevronDown className={`text-xs transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-fadeIn">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        location.pathname === link.to
                          ? 'text-orange-600 bg-orange-50 font-medium'
                          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="text-orange-500 text-lg">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services Dropdown - Structured Grid */}
            <div className="relative dropdown-container">
              <button
                onClick={() => toggleDropdown('transport')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                  activeDropdown === 'transport' || transportPackagesLinks.some(link => location.pathname === link.to)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                Services
                <FaChevronDown className={`text-xs transition-transform duration-200 ${activeDropdown === 'transport' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'transport' && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fadeIn">
                  <div className="px-4 pb-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Travel Services</p>
                  </div>
                  <div className="grid grid-cols-2 py-1">
                    {transportPackagesLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
                          location.pathname === link.to
                            ? 'text-blue-600 bg-blue-50 font-medium'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="text-blue-500 flex-shrink-0">{link.icon}</span>
                        <span className="truncate">{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>    

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative ml-2">
              <input
                type="text"
                placeholder={t('navbar.search') || 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 px-4 py-2 pl-9 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors duration-200"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
            </form>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              title={currentLang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            >
              <FaGlobe className="text-gray-400" />
              <span className="text-sm font-medium">
                {currentLang === 'en' ? 'EN' : 'हिंदी'}
              </span>
            </button>

            {/* Account Dropdown */}
            <div className="relative dropdown-container ml-1">
              <button
                onClick={() => toggleDropdown('user')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                  activeDropdown === 'user'
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <FaUser />
                <span className="hidden sm:inline">
                  {isAuthenticated ? user?.username || 'Account' : 'Account'}
                </span>
                <FaChevronDown className={`text-xs transition-transform duration-200 ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'user' && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-fadeIn">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-green-50 to-green-100/50">
                        <p className="text-sm font-semibold text-gray-800">{user?.username}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        {isAdmin && (
                          <span className="inline-block mt-1 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                            👑 Admin
                          </span>
                        )}
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <FaUser className="text-orange-500" />
                        {t('navbar.profile') || 'Profile'}
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <FaCog className="text-orange-500" />
                          {t('navbar.admin') || 'Admin'}
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setActiveDropdown(null);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left border-t border-gray-100 mt-1"
                      >
                        <FaSignOutAlt />
                        {t('navbar.logout') || 'Logout'}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100 bg-orange-50">
                        <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">Access Account</p>
                      </div>
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <FaUser className="text-orange-500" />
                        {t('navbar.login') || 'Login'}
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <FaUserPlus className="text-orange-500" />
                        {t('navbar.signup') || 'Sign Up'}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-screen border-t border-gray-200' : 'max-h-0'
      } bg-white`}>
        <div className="px-4 py-4 space-y-4 overflow-y-auto max-h-[80vh]">
          {/* Language Switcher - Mobile */}
          <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 transition-colors duration-200"
            >
              <FaGlobe className="text-gray-400" />
              <span>{currentLang === 'en' ? '🇬🇧 English' : '🇮🇳 हिंदी'}</span>
            </button>
          </div>

          {/* Explore */}
          <div className="border-t border-gray-200 pt-3">
            <p className="px-3 pb-2 text-xs font-bold text-orange-600 uppercase tracking-wider">Explore</p>
            {exploreLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-orange-600 bg-orange-50 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-orange-500 text-lg">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* About */}
          <div className="border-t border-gray-200 pt-3">
            <p className="px-3 pb-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
              {t('navbar.about') || 'About'}
            </p>
            {aboutLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-orange-600 bg-orange-50 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-orange-500 text-lg">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Services - Mobile */}
          <div className="border-t border-gray-200 pt-3">
            <p className="px-3 pb-2 text-xs font-bold text-blue-600 uppercase tracking-wider">Services</p>
            <div className="grid grid-cols-2 gap-1">
              {transportPackagesLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                    location.pathname === link.to
                      ? 'text-blue-600 bg-blue-50 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-blue-500 text-lg">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Search */}
          <div className="border-t border-gray-200 pt-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={t('navbar.search') || 'Search destinations...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 text-sm"
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </form>
          </div>

          {/* User Menu - Mobile */}
          <div className="border-t border-gray-200 pt-3 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 bg-gradient-to-r from-green-50 to-green-100/50 rounded-lg">
                  <p className="text-sm font-medium text-gray-800">{user?.username}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  {isAdmin && (
                    <span className="inline-block mt-1 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      👑 Admin
                    </span>
                  )}
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-orange-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser className="text-orange-500" />
                  {t('navbar.profile') || 'Profile'}
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-orange-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaCog className="text-orange-500" />
                    {t('navbar.admin') || 'Admin'}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full"
                >
                  <FaSignOutAlt />
                  {t('navbar.logout') || 'Logout'}
                </button>
              </>
            ) : (
              <div className="space-y-3 pt-1">
                <Link
                  to="/login"
                  className="block px-3 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-200 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {t('navbar.login') || 'Login'}
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2.5 border-2 border-orange-500 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors duration-200 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {t('navbar.signup') || 'Sign Up'}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add animation CSS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;