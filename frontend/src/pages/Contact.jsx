// frontend/src/pages/Contact.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaClock, FaSpinner } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contactInfo, setContactInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);

  // Fetch contact info from database
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      // Try to get contact info from database
      const response = await api.get('/contact/latest');
      if (response.data && response.data.success) {
        setContactInfo(response.data.contact);
      }
    } catch (error) {
      // If no data in DB, use fallback
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/contact', formData);
      
      if (response.data.success) {
        setSubmitted(true);
        toast.success('Message sent successfully! 🎉');
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          address: '', 
          subject: '', 
          message: '' 
        });
        // Refresh contact info
        fetchContactInfo();
      } else {
        setError(response.data.message || 'Failed to send message');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    { 
      icon: <FaEnvelope />, 
      label: 'Email', 
      value: contactInfo?.email || 'info@travelbharat.com',
      color: 'border-orange-500'
    },
    { 
      icon: <FaPhone />, 
      label: 'Phone', 
      value: contactInfo?.phone || '+91 12345 67890',
      color: 'border-blue-500'
    },
    { 
      icon: <FaMapMarkerAlt />, 
      label: 'Address', 
      value: contactInfo?.address || '123, Travel Street, New Delhi, India',
      color: 'border-green-500'
    },
    { 
      icon: <FaClock />, 
      label: 'Hours', 
      value: contactInfo?.hours || 'Mon-Fri 9AM-6PM IST',
      color: 'border-purple-500'
    },
  ];

  if (loadingInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-orange-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading contact information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900">Contact Us</h1>
          <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-4"></div>
          <p className="text-gray-500 mt-4">We'd love to hear from you</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactItems.map((info, index) => (
              <div key={index} className={`border-l-4 ${info.color} pl-4 hover:pl-6 transition-all duration-300 cursor-pointer group`}>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 group-hover:text-orange-500 transition-colors">
                    {info.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{info.label}</h3>
                    <p className="text-gray-600 text-sm">{info.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-gray-50 rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-3xl mx-auto mb-4">
                  <FaCheck />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Message Sent! 🎉</h3>
                <p className="text-gray-500 text-sm mt-2">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-orange-500 hover:text-orange-600 font-medium transition"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 12345 67890"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Your Address"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us everything..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50 shadow-lg shadow-orange-200"
                >
                  <FaPaperPlane />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;