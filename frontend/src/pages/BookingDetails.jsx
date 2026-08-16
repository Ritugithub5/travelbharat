import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaCreditCard, 
  FaGooglePay, FaApplePay, FaAmazonPay, FaPaypal, FaLock,
  FaCalendar, FaClock, FaPlane, FaMapMarkerAlt, FaRupeeSign,
  FaCheckCircle, FaWallet, FaUniversity, FaMobile
} from 'react-icons/fa';

const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [bookingComplete, setBookingComplete] = useState(false);

  // Flight data from location state or default
  const flightData = location.state?.flight || {
    airline: 'SpiceJet',
    from: 'DEL',
    to: 'BOM',
    depart: '22:30',
    arrive: '00:50',
    duration: '02h 20m',
    price: '₹5,920',
    date: '02 Aug 2026'
  };

  // Passenger Form State
  const [passenger, setPassenger] = useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male'
  });

  // Card Details State
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const handlePassengerChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    setBookingComplete(true);
    setTimeout(() => {
      navigate('/booking-confirmation', { state: { flight: flightData, passenger, paymentMethod } });
    }, 2000);
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ====== BOOKING COMPLETE VIEW ======
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-600 text-6xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed! 🎉</h2>
          <p className="text-gray-500">Your flight has been booked successfully.</p>
          <p className="text-sm text-gray-400 mt-2">Redirecting to confirmation...</p>
          <div className="mt-6 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-blue-600 transition">
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
          <span className="text-sm text-gray-400 ml-auto">Step {step} of 3</span>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                s === step ? 'bg-blue-600 text-white' : 
                s < step ? 'bg-green-500 text-white' : 
                'bg-gray-200 text-gray-400'
              }`}>
                {s < step ? '✓' : s}
              </div>
              {s < 3 && <div className={`w-12 h-1 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Passenger Details */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaUser className="text-blue-600" /> Passenger Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Title</label>
                    <select name="title" value={passenger.title} onChange={handlePassengerChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition">
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                      <option>Dr</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Gender</label>
                    <select name="gender" value={passenger.gender} onChange={handlePassengerChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">First Name *</label>
                    <input type="text" name="firstName" value={passenger.firstName} onChange={handlePassengerChange} placeholder="John" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Last Name *</label>
                    <input type="text" name="lastName" value={passenger.lastName} onChange={handlePassengerChange} placeholder="Doe" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Email *</label>
                    <input type="email" name="email" value={passenger.email} onChange={handlePassengerChange} placeholder="john@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Phone *</label>
                    <input type="tel" name="phone" value={passenger.phone} onChange={handlePassengerChange} placeholder="+91 98765 43210" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" required />
                  </div>
                </div>

                <button onClick={nextStep} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-lg transition shadow-lg shadow-blue-200">
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaCreditCard className="text-blue-600" /> Payment Method
                </h2>

                {/* Payment Options */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    { id: 'card', icon: <FaCreditCard />, label: 'Card' },
                    { id: 'google', icon: <FaGooglePay />, label: 'Google Pay' },
                    { id: 'phonepe', icon: <FaMobile />, label: 'PhonePe' },
                    { id: 'paypal', icon: <FaPaypal />, label: 'PayPal' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-2 justify-center p-3 rounded-xl border-2 transition ${
                        paymentMethod === method.id 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {method.icon} {method.label}
                    </button>
                  ))}
                </div>

                {/* Card Details Form */}
                {(paymentMethod === 'card' || paymentMethod === 'upi') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Card Number *</label>
                      <input type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardChange} placeholder="1234 5678 9012 3456" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Name on Card *</label>
                      <input type="text" name="cardName" value={cardDetails.cardName} onChange={handleCardChange} placeholder="John Doe" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Expiry *</label>
                        <input type="text" name="expiry" value={cardDetails.expiry} onChange={handleCardChange} placeholder="MM/YY" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">CVV *</label>
                        <input type="password" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} placeholder="***" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'google' && (
                  <div className="text-center py-8">
                    <FaGooglePay className="text-6xl text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Click continue to pay with Google Pay</p>
                  </div>
                )}

                {paymentMethod === 'phonepe' && (
                  <div className="text-center py-8">
                    <FaMobile className="text-6xl text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Enter your PhonePe number to continue</p>
                    <input type="tel" placeholder="+91 98765 43210" className="mt-4 w-full max-w-sm border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 transition" />
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <FaPaypal className="text-6xl text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">You'll be redirected to PayPal</p>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button onClick={prevStep} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl text-lg hover:bg-gray-50 transition">
                    Back
                  </button>
                  <button onClick={nextStep} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-lg transition shadow-lg shadow-blue-200">
                    Review Booking
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> Review & Confirm
                </h2>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Passenger Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-gray-500">Name</span>
                      <span className="font-medium">{passenger.title} {passenger.firstName} {passenger.lastName}</span>
                      <span className="text-gray-500">Email</span>
                      <span className="font-medium">{passenger.email}</span>
                      <span className="text-gray-500">Phone</span>
                      <span className="font-medium">{passenger.phone}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Flight Details</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="font-bold text-lg">{flightData.from}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400">{flightData.duration}</p>
                        <div className="flex items-center gap-2">
                          <span className="w-16 h-px bg-gray-300"></span>
                          <span className="text-xs">✈️</span>
                          <span className="w-16 h-px bg-gray-300"></span>
                        </div>
                        <p className="text-xs text-blue-600 font-semibold">Direct</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">To</p>
                        <p className="font-bold text-lg">{flightData.to}</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>Depart: {flightData.depart}</span>
                      <span>Arrive: {flightData.arrive}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Payment</h3>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Method</span>
                      <span className="font-medium capitalize">{paymentMethod}</span>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="flex justify-between mt-1 text-sm">
                        <span className="text-gray-500">Card</span>
                        <span className="font-medium">•••• {cardDetails.cardNumber.slice(-4) || '1234'}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button onClick={prevStep} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl text-lg hover:bg-gray-50 transition">
                    Back
                  </button>
                  <button onClick={handlePayment} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl text-lg transition shadow-lg shadow-green-200">
                    Confirm & Pay
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Booking Summary</h3>
              
              <div className="space-y-3 border-b border-gray-100 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Flight</span>
                  <span className="font-medium">{flightData.airline}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Route</span>
                  <span className="font-medium">{flightData.from} → {flightData.to}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{flightData.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Passenger</span>
                  <span className="font-medium">{passenger.firstName || '1'}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Base Fare</span>
                  <span>{flightData.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxes & Fees</span>
                  <span>₹850</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Convenience Fee</span>
                  <span>₹200</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">{flightData.price.replace('₹', '') ? `₹${parseInt(flightData.price.replace(/[₹,]/g, '')) + 1050}` : '₹6,970'}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-center gap-2 text-xs text-blue-600">
                <FaLock className="text-sm" /> Secure checkout with SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;