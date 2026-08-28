// frontend/src/components/Navbar.jsx

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

  const {
    user,
    isAuthenticated,
    logout,
    isAdmin,
  } = useSafeAuth();

  const currentLang = i18n.language || 'en';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);

    setSearchQuery('');
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (logout) {
      logout();
    }

    navigate('/');
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) =>
      prev === name ? null : name
    );
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en';

    i18n.changeLanguage(newLang);

    localStorage.setItem('i18nextLng', newLang);
  };

  const exploreLinks = [
    {
      to: '/states',
      icon: <FaMapMarkerAlt />,
      label: t('navbar.states') || 'States',
    },
    {
      to: '/experience',
      icon: <FaCompass />,
      label: 'All Experiences',
    },
  ];

  const aboutLinks = [
    {
      to: '/about',
      icon: <FaInfoCircle />,
      label: t('navbar.about') || 'About',
    },
    {
      to: '/Cultural',
      icon: <FaPalette />,
      label: 'Cultural Heritage',
    },
    {
      to: '/contact',
      icon: <FaEnvelope />,
      label: t('navbar.contact') || 'Contact',
    },
  ];

  const transportPackagesLinks = [
    {
      to: '/flights',
      icon: <FaPlane />,
      label: t('booking.flights') || 'Flights',
    },
    {
      to: '/trains',
      icon: <FaTrain />,
      label: t('booking.trains') || 'Trains',
    },
    {
      to: '/buses',
      icon: <FaBus />,
      label: t('booking.buses') || 'Buses',
    },
    {
      to: '/cabs',
      icon: <FaTaxi />,
      label: t('booking.cabs') || 'Cabs',
    },
    {
      to: '/tourpackages',
      icon: <FaSuitcase />,
      label: t('booking.tourPackages') || 'Tour Packages',
    },
    {
      to: '/accommodations',
      icon: <FaHotel />,
      label: t('booking.accommodations') || 'Accommodations',
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isAnyActive = (links) => {
    return links.some((link) => location.pathname === link.to);
  };

  const closeMenus = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
          IMPORTANT:
          sticky instead of fixed
          so page content does NOT hide underneath navbar
      ====================================================== */}

      <nav
        className={`
          sticky top-0 z-[100]
          w-full
          bg-white
          border-b
          transition-all
          duration-300
          ${
            isScrolled
              ? 'shadow-md border-gray-200'
              : 'shadow-sm border-gray-100'
          }
        `}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-16">

            <Link
              to="/"
              onClick={closeMenus}
              className="
                flex
                items-center
                flex-shrink-0
                group
              "
            >
              <span
                className="
                  text-2xl
                  sm:text-[26px]
                  font-bold
                  tracking-tight
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-600
                  bg-clip-text
                  text-transparent
                  transition
                  duration-300
                  group-hover:from-orange-600
                  group-hover:to-red-500
                "
              >
                TravelBharat
              </span>

              <span
                className="
                  ml-2
                  text-base
                  sm:text-lg
                  hidden
                  sm:inline
                "
              >
                IN
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">

              <div className="relative dropdown-container">

                <button
                  type="button"
                  onClick={() => toggleDropdown('explore')}
                  className={`
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    flex
                    items-center
                    gap-1.5
                    transition-all
                    duration-200

                    ${
                      activeDropdown === 'explore' ||
                      isAnyActive(exploreLinks)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }
                  `}
                >
                  Explore

                  <FaChevronDown
                    className={`
                      text-[10px]
                      transition-transform
                      duration-200
                      ${
                        activeDropdown === 'explore'
                          ? 'rotate-180'
                          : ''
                      }
                    `}
                  />
                </button>

                {activeDropdown === 'explore' && (
                  <div
                    className="
                      absolute
                      top-full
                      left-0
                      mt-2
                      w-52
                      bg-white
                      rounded-xl
                      shadow-xl
                      border
                      border-gray-100
                      py-2
                      z-[200]
                      animate-fadeIn
                    "
                  >
                    {exploreLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={closeMenus}
                        className={`
                          flex
                          items-center
                          gap-3
                          px-4
                          py-2.5
                          text-sm
                          transition-colors

                          ${
                            isActive(link.to)
                              ? 'text-orange-600 bg-orange-50 font-medium'
                              : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                          }
                        `}
                      >
                        <span className="text-orange-500 text-base">
                          {link.icon}
                        </span>

                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative dropdown-container">

                <button
                  type="button"
                  onClick={() => toggleDropdown('about')}
                  className={`
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    flex
                    items-center
                    gap-1.5
                    transition-all
                    duration-200

                    ${
                      activeDropdown === 'about' ||
                      isAnyActive(aboutLinks)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }
                  `}
                >
                  {t('navbar.about') || 'About'}

                  <FaChevronDown
                    className={`
                      text-[10px]
                      transition-transform
                      duration-200
                      ${
                        activeDropdown === 'about'
                          ? 'rotate-180'
                          : ''
                      }
                    `}
                  />
                </button>

                {activeDropdown === 'about' && (
                  <div
                    className="
                      absolute
                      top-full
                      left-0
                      mt-2
                      w-56
                      bg-white
                      rounded-xl
                      shadow-xl
                      border
                      border-gray-100
                      py-2
                      z-[200]
                      animate-fadeIn
                    "
                  >
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={closeMenus}
                        className={`
                          flex
                          items-center
                          gap-3
                          px-4
                          py-2.5
                          text-sm
                          transition-colors

                          ${
                            isActive(link.to)
                              ? 'text-orange-600 bg-orange-50 font-medium'
                              : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                          }
                        `}
                      >
                        <span className="text-orange-500 text-base">
                          {link.icon}
                        </span>

                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative dropdown-container">

                <button
                  type="button"
                  onClick={() => toggleDropdown('transport')}
                  className={`
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    flex
                    items-center
                    gap-1.5
                    transition-all
                    duration-200

                    ${
                      activeDropdown === 'transport' ||
                      isAnyActive(transportPackagesLinks)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }
                  `}
                >
                  Services

                  <FaChevronDown
                    className={`
                      text-[10px]
                      transition-transform
                      duration-200
                      ${
                        activeDropdown === 'transport'
                          ? 'rotate-180'
                          : ''
                      }
                    `}
                  />
                </button>

                {activeDropdown === 'transport' && (
                  <div
                    className="
                      absolute
                      top-full
                      left-1/2
                      -translate-x-1/2
                      mt-2
                      w-[430px]
                      bg-white
                      rounded-xl
                      shadow-xl
                      border
                      border-gray-100
                      py-3
                      z-[200]
                      animate-fadeIn
                    "
                  >

                    {/* Dropdown Header */}

                    <div className="px-5 pb-3 border-b border-gray-100">

                      <p
                        className="
                          text-[11px]
                          font-bold
                          text-orange-600
                          uppercase
                          tracking-[0.18em]
                        "
                      >
                        Travel Services
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Plan your journey with TravelBharat
                      </p>

                    </div>

                    {/* Services */}

                    <div className="grid grid-cols-2 gap-1 p-2">

                      {transportPackagesLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={closeMenus}
                          className={`
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-lg
                            text-sm
                            transition-all

                            ${
                              isActive(link.to)
                                ? 'text-orange-600 bg-orange-50 font-medium'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                            }
                          `}
                        >
                          <span
                            className="
                              w-8
                              h-8
                              rounded-lg
                              bg-orange-50
                              flex
                              items-center
                              justify-center
                              text-orange-500
                              flex-shrink-0
                            "
                          >
                            {link.icon}
                          </span>

                          <span className="truncate">
                            {link.label}
                          </span>
                        </Link>
                      ))}

                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSearch}
                className="relative ml-2"
              >
                <input
                  type="text"
                  placeholder={
                    t('navbar.search') || 'Search...'
                  }
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="
                    w-40
                    px-4
                    py-2
                    pl-9
                    border
                    border-gray-300
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-400
                    focus:border-transparent
                    text-sm
                    bg-gray-50
                    hover:bg-white
                    transition
                  "
                />

                <FaSearch
                  className="
                    absolute
                    left-3
                    top-2.5
                    text-gray-400
                    text-sm
                  "
                />
              </form>

              <button
                type="button"
                onClick={toggleLanguage}
                title={
                  currentLang === 'en'
                    ? 'Switch to Hindi'
                    : 'Switch to English'
                }
                className="
                  flex
                  items-center
                  gap-1.5
                  px-3
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-orange-600
                  hover:bg-orange-50
                  transition
                "
              >
                <FaGlobe className="text-gray-400" />

                <span>
                  {currentLang === 'en'
                    ? 'EN'
                    : 'हिंदी'}
                </span>
              </button>

              <div className="relative dropdown-container ml-1">

                <button
                  type="button"
                  onClick={() => toggleDropdown('user')}
                  className={`
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    flex
                    items-center
                    gap-1.5
                    transition-all

                    ${
                      activeDropdown === 'user'
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }
                  `}
                >
                  <FaUser />

                  <span className="hidden xl:inline">
                    {isAuthenticated
                      ? user?.username || 'Account'
                      : 'Account'}
                  </span>

                  <FaChevronDown
                    className={`
                      text-[10px]
                      transition-transform
                      ${
                        activeDropdown === 'user'
                          ? 'rotate-180'
                          : ''
                      }
                    `}
                  />
                </button>

                {activeDropdown === 'user' && (
                  <div
                    className="
                      absolute
                      top-full
                      right-0
                      mt-2
                      w-60
                      bg-white
                      rounded-xl
                      shadow-xl
                      border
                      border-gray-100
                      py-2
                      z-[200]
                      animate-fadeIn
                    "
                  >

                    {isAuthenticated ? (
                      <>
                        {/* User Info */}

                        <div
                          className="
                            px-4
                            py-3
                            border-b
                            border-gray-100
                            bg-gradient-to-r
                            from-orange-50
                            to-amber-50
                          "
                        >
                          <p className="text-sm font-semibold text-gray-800">
                            {user?.username || 'User'}
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5">
                            {user?.email || ''}
                          </p>

                          {isAdmin && (
                            <span
                              className="
                                inline-block
                                mt-2
                                text-[10px]
                                font-semibold
                                bg-orange-100
                                text-orange-700
                                px-2
                                py-1
                                rounded-full
                              "
                            >
                              👑 Admin
                            </span>
                          )}
                        </div>

                        {/* Profile */}

                        <Link
                          to="/profile"
                          onClick={closeMenus}
                          className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-2.5
                            text-sm
                            text-gray-700
                            hover:bg-orange-50
                            hover:text-orange-600
                            transition
                          "
                        >
                          <FaUser className="text-orange-500" />
                          {t('navbar.profile') || 'Profile'}
                        </Link>

                        {/* Admin */}

                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={closeMenus}
                            className="
                              flex
                              items-center
                              gap-3
                              px-4
                              py-2.5
                              text-sm
                              text-gray-700
                              hover:bg-orange-50
                              hover:text-orange-600
                              transition
                            "
                          >
                            <FaCog className="text-orange-500" />
                            {t('navbar.admin') || 'Admin'}
                          </Link>
                        )}

                        {/* Logout */}

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-2.5
                            text-sm
                            text-red-600
                            hover:bg-red-50
                            transition
                            w-full
                            text-left
                            border-t
                            border-gray-100
                            mt-1
                          "
                        >
                          <FaSignOutAlt />

                          {t('navbar.logout') || 'Logout'}
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Account Header */}

                        <div
                          className="
                            px-4
                            py-2.5
                            border-b
                            border-gray-100
                            bg-orange-50
                          "
                        >
                          <p
                            className="
                              text-[10px]
                              font-bold
                              text-orange-600
                              uppercase
                              tracking-wider
                            "
                          >
                            Access Account
                          </p>
                        </div>

                        {/* Login */}

                        <Link
                          to="/login"
                          onClick={closeMenus}
                          className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-2.5
                            text-sm
                            text-gray-700
                            hover:bg-orange-50
                            hover:text-orange-600
                            transition
                          "
                        >
                          <FaUser className="text-orange-500" />

                          {t('navbar.login') || 'Login'}
                        </Link>

                        {/* Signup */}

                        <Link
                          to="/signup"
                          onClick={closeMenus}
                          className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-2.5
                            text-sm
                            text-gray-700
                            hover:bg-orange-50
                            hover:text-orange-600
                            transition
                          "
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

            <button
              type="button"
              onClick={() => {
                setIsOpen((prev) => !prev);
                setActiveDropdown(null);
              }}
              className="
                lg:hidden
                p-2
                rounded-lg
                text-gray-700
                hover:bg-gray-100
                transition
              "
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes size={23} />
              ) : (
                <FaBars size={23} />
              )}
            </button>
          </div>
        </div>

        <div
          className={`
            lg:hidden
            overflow-hidden
            transition-all
            duration-300
            border-t
            border-gray-100
            bg-white

            ${
              isOpen
                ? 'max-h-[calc(100vh-4rem)] opacity-100'
                : 'max-h-0 opacity-0 border-t-0'
            }
          `}
        >
          <div
            className="
              px-4
              py-4
              space-y-4
              overflow-y-auto
              max-h-[calc(100vh-4rem)]
            "
          >

            <div className="flex items-center justify-between pb-3 border-b border-gray-200">

              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Language
              </span>

              <button
                type="button"
                onClick={toggleLanguage}
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  text-gray-700
                  hover:bg-orange-50
                  transition
                "
              >
                <FaGlobe className="text-gray-400" />

                {currentLang === 'en'
                  ? '🇬🇧 English'
                  : '🇮🇳 हिंदी'}
              </button>
            </div>

            <div>

              <p
                className="
                  px-3
                  pb-2
                  text-[10px]
                  font-bold
                  text-orange-600
                  uppercase
                  tracking-[0.15em]
                "
              >
                Explore
              </p>

              {exploreLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenus}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-lg
                    text-sm
                    transition

                    ${
                      isActive(link.to)
                        ? 'text-orange-600 bg-orange-50 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="text-orange-500 text-base">
                    {link.icon}
                  </span>

                  {link.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-3">

              <p
                className="
                  px-3
                  pb-2
                  text-[10px]
                  font-bold
                  text-orange-600
                  uppercase
                  tracking-[0.15em]
                "
              >
                About
              </p>

              {aboutLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenus}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-lg
                    text-sm
                    transition

                    ${
                      isActive(link.to)
                        ? 'text-orange-600 bg-orange-50 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="text-orange-500 text-base">
                    {link.icon}
                  </span>

                  {link.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-3">

              <p
                className="
                  px-3
                  pb-2
                  text-[10px]
                  font-bold
                  text-orange-600
                  uppercase
                  tracking-[0.15em]
                "
              >
                Services
              </p>

              <div className="grid grid-cols-2 gap-1">

                {transportPackagesLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenus}
                    className={`
                      flex
                      items-center
                      gap-2
                      px-3
                      py-2.5
                      rounded-lg
                      text-sm
                      transition

                      ${
                        isActive(link.to)
                          ? 'text-orange-600 bg-orange-50 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span className="text-orange-500">
                      {link.icon}
                    </span>

                    <span className="truncate">
                      {link.label}
                    </span>
                  </Link>
                ))}

              </div>
            </div>

            <div className="border-t border-gray-200 pt-3">

              <form
                onSubmit={handleSearch}
                className="relative"
              >
                <input
                  type="text"
                  placeholder={
                    t('navbar.search') ||
                    'Search destinations...'
                  }
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="
                    w-full
                    px-4
                    py-3
                    pl-10
                    border
                    border-gray-300
                    rounded-xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-400
                    bg-gray-50
                    text-sm
                  "
                />

                <FaSearch
                  className="
                    absolute
                    left-3
                    top-3.5
                    text-gray-400
                  "
                />
              </form>
            </div>

            <div className="border-t border-gray-200 pt-3">

              {isAuthenticated ? (
                <div className="space-y-2">

                  {/* User */}

                  <div
                    className="
                      px-3
                      py-3
                      rounded-lg
                      bg-gradient-to-r
                      from-orange-50
                      to-amber-50
                    "
                  >
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.username || 'User'}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {user?.email || ''}
                    </p>

                    {isAdmin && (
                      <span
                        className="
                          inline-block
                          mt-2
                          text-[10px]
                          font-semibold
                          bg-orange-100
                          text-orange-700
                          px-2
                          py-1
                          rounded-full
                        "
                      >
                        👑 Admin
                      </span>
                    )}
                  </div>

                  {/* Profile */}

                  <Link
                    to="/profile"
                    onClick={closeMenus}
                    className="
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      rounded-lg
                      text-sm
                      text-gray-700
                      hover:bg-orange-50
                      transition
                    "
                  >
                    <FaUser className="text-orange-500" />
                    {t('navbar.profile') || 'Profile'}
                  </Link>

                  {/* Admin */}

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMenus}
                      className="
                        flex
                        items-center
                        gap-3
                        px-3
                        py-2.5
                        rounded-lg
                        text-sm
                        text-gray-700
                        hover:bg-orange-50
                        transition
                      "
                    >
                      <FaCog className="text-orange-500" />
                      {t('navbar.admin') || 'Admin'}
                    </Link>
                  )}

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      rounded-lg
                      text-sm
                      text-red-600
                      hover:bg-red-50
                      transition
                      w-full
                      text-left
                    "
                  >
                    <FaSignOutAlt />

                    {t('navbar.logout') || 'Logout'}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">

                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="
                      block
                      w-full
                      px-3
                      py-2.5
                      bg-gradient-to-r
                      from-orange-500
                      to-orange-600
                      text-white
                      rounded-lg
                      text-sm
                      font-medium
                      text-center
                      hover:shadow-md
                      transition
                    "
                  >
                    {t('navbar.login') || 'Login'}
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenus}
                    className="
                      block
                      w-full
                      px-3
                      py-2.5
                      border-2
                      border-orange-500
                      text-orange-600
                      rounded-lg
                      text-sm
                      font-medium
                      text-center
                      hover:bg-orange-50
                      transition
                    "
                  >
                    {t('navbar.signup') || 'Sign Up'}
                  </Link>

                </div>
              )}
            </div>

          </div>
        </div>
      </nav>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.18s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
