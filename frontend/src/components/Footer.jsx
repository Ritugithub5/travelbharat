// frontend/src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaGithub, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaHeart,
  FaPaperPlane,
  FaClock,
  FaSpinner
} from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import api from '../services/api';
import toast from 'react-hot-toast';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);

  // Fetch contact info from database
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await api.get('/contact/latest');
      if (response.data && response.data.success) {
        setContactInfo(response.data.contact);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      // Fallback data
      setContactInfo({
        email: 'info@travelbharat.com',
        phone: '+91 12345 67890',
        address: '123, Travel Street, New Delhi, India',
        hours: 'Mon-Fri 9AM-6PM IST'
      });
    } finally {
      setLoadingInfo(false);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    setLoading(true);
    try {
      // Newsletter subscription API
      setSubscribed(true);
      toast.success('Subscribed successfully! 🎉');
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      toast.error('Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  if (loadingInfo) {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FaSpinner className="animate-spin text-2xl text-orange-500 mx-auto" />
        </div>
      </footer>
    );
  }

  const contactItems = [
    { icon: <FaMapMarkerAlt />, label: 'Address', value: contactInfo?.address || '123, Travel Street, New Delhi, India' },
    { icon: <FaEnvelope />, label: 'Email', value: contactInfo?.email || 'info@travelbharat.com' },
    { icon: <FaPhone />, label: 'Phone', value: contactInfo?.phone || '+91 12345 67890' },
    { icon: <FaClock />, label: 'Hours', value: contactInfo?.hours || 'Mon-Fri 9AM-6PM IST' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-500">TravelBharat</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
  Your complete guide to Indian tourist destinations, heritage sites, and cultural experiences across the country.
</p>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition duration-300">Home</Link></li>
              <li><Link to="/states" className="hover:text-orange-500 transition duration-300">States</Link></li>
              <li><Link to="/experience" className="hover:text-orange-500 transition duration-300">Experiences</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition duration-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info - NOW SHOWS STORED DATA */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Get in Touch</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {contactItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 hover:text-orange-500 transition group">
                  <span className="text-orange-500 text-lg group-hover:scale-110 transition">
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 hover:bg-gray-700 transition duration-300">
                <FaGithub className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 hover:bg-gray-700 transition duration-300">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 hover:bg-gray-700 transition duration-300">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 hover:bg-gray-700 transition duration-300">
                <FaYoutube className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="text-orange-500 font-semibold">TravelBharat</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;