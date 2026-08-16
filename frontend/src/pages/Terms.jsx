// frontend/src/pages/Terms.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaShieldAlt, FaLock, FaUserSecret, FaCookie, FaGavel } from 'react-icons/fa';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/signup" 
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 transition"
        >
          <FaArrowLeft /> Back to Sign Up
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Terms & Conditions</h1>
            <p className="text-orange-100 mt-1">Last updated: August 2026</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to TravelBharat! By using our platform, you agree to comply with and be bound by 
                the following terms and conditions. Please read them carefully before using our services.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                TravelBharat is a tourism information platform that provides state-wise and city-wise 
                details of tourist destinations across India. Our goal is to help travelers, students, 
                and researchers easily discover places, attractions, culture, heritage sites, and 
                travel insights.
              </p>
            </section>

            {/* User Accounts */}
            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaUserSecret className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Account Registration</h3>
                    <p className="text-gray-600 text-sm">
                      To access certain features, you must create an account. You agree to provide 
                      accurate and complete information during registration.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaLock className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Account Security</h3>
                    <p className="text-gray-600 text-sm">
                      You are responsible for maintaining the confidentiality of your account credentials. 
                      Notify us immediately of any unauthorized use.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* User Obligations */}
            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Provide accurate and truthful information</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Respect intellectual property rights of the platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Do not misuse the platform for unlawful purposes</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Do not attempt to gain unauthorized access to the system</span>
                </li>
              </ul>
            </section>

            {/* Privacy Policy */}
            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Privacy Policy</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaShieldAlt className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Data Collection</h3>
                    <p className="text-gray-600 text-sm">
                      We collect information you provide during registration and usage of our platform.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCookie className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Cookies</h3>
                    <p className="text-gray-600 text-sm">
                      We use cookies to enhance your experience and analyze platform usage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaGavel className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Data Protection</h3>
                    <p className="text-gray-600 text-sm">
                      Your data is protected and will not be shared with third parties without your consent.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Content Usage */}
            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Content Usage</h2>
              <p className="text-gray-600 leading-relaxed">
                All content on TravelBharat, including text, images, and data, is for informational 
                purposes only. While we strive for accuracy, we do not guarantee the completeness or 
                reliability of the information.
              </p>
              <div className="mt-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Disclaimer:</strong> TravelBharat is an informational platform. 
                  We are not responsible for any decisions made based on the information provided. 
                  Always verify details with official sources before traveling.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to terminate or suspend your account without prior notice if 
                you violate these terms or engage in activities that harm the platform or other users.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update these terms from time to time. Continued use of the platform after 
                changes constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* Contact */}
            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> support@travelbharat.com
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Address:</strong> TravelBharat, India
                </p>
              </div>
            </section>

            {/* Acceptance */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-green-800 text-sm">
                  ✅ By creating an account with TravelBharat, you agree to all the terms and 
                  conditions stated above.
                </p>
              </div>
            </div>

            {/* Back to Sign Up */}
            <div className="flex justify-center pt-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Back to Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;