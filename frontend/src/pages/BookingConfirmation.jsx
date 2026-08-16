import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaPrint, FaShare, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};
  const ticketRef = useRef(null);

  // Generate random booking reference
  const bookingRef = `#TB${Math.floor(100000 + Math.random() * 900000)}`;

  // ✅ DOWNLOAD TICKET FUNCTION
  const handleDownloadTicket = () => {
    const ticketContent = `
      ========================================
            TRAVELBHARAT - FLIGHT TICKET
      ========================================
      
      Booking Reference: ${bookingRef}
      Date: ${new Date().toLocaleDateString()}
      
      ----------------------------------------
      FLIGHT DETAILS
      ----------------------------------------
      Airline: ${data.flight?.airline || 'SpiceJet'}
      Flight: ${Math.floor(1000 + Math.random() * 9000)}
      From: ${data.flight?.from || 'DEL'}
      To: ${data.flight?.to || 'BOM'}
      Depart: ${data.flight?.depart || '22:30'}
      Arrive: ${data.flight?.arrive || '00:50'}
      Duration: ${data.flight?.duration || '02h 20m'}
      Stops: Direct
      Date: ${data.flight?.date || '02 Aug 2026'}
      
      ----------------------------------------
      PASSENGER DETAILS
      ----------------------------------------
      Name: ${data.passenger?.firstName || 'John'} ${data.passenger?.lastName || 'Doe'}
      Email: ${data.passenger?.email || 'john@example.com'}
      Phone: ${data.passenger?.phone || '+91 98765 43210'}
      
      ----------------------------------------
      PAYMENT SUMMARY
      ----------------------------------------
      Base Fare: ${data.flight?.price || '₹5,920'}
      Taxes & Fees: ₹850
      Convenience Fee: ₹200
      Total: ₹6,970
      
      ========================================
      Thank you for choosing TravelBharat!
      ========================================
    `;

    // Create download
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TravelBharat_Ticket_${bookingRef.replace('#', '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // ✅ SHARE ON WHATSAPP
  const handleWhatsAppShare = () => {
    const message = `
      🎉 Booking Confirmed with TravelBharat!
      
      Booking Reference: ${bookingRef}
      Airline: ${data.flight?.airline || 'SpiceJet'}
      Route: ${data.flight?.from || 'DEL'} → ${data.flight?.to || 'BOM'}
      Depart: ${data.flight?.depart || '22:30'} | Arrive: ${data.flight?.arrive || '00:50'}
      Date: ${data.flight?.date || '02 Aug 2026'}
      
      Total: ${data.flight?.price || '₹5,920'}
      
      Safe travels! ✈️
    `;
    
    const encodedMessage = encodeURIComponent(message.trim());
    const phoneNumber = data.passenger?.phone?.replace(/[^0-9]/g, '') || '';
    const whatsappUrl = phoneNumber 
      ? `https://wa.me/91${phoneNumber}?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // ✅ EMAIL TICKET
  const handleEmailTicket = () => {
    const subject = `TravelBharat - Booking Confirmation ${bookingRef}`;
    const body = `
      🎉 Your booking with TravelBharat is confirmed!
      
      Booking Reference: ${bookingRef}
      Airline: ${data.flight?.airline || 'SpiceJet'}
      Route: ${data.flight?.from || 'DEL'} → ${data.flight?.to || 'BOM'}
      Depart: ${data.flight?.depart || '22:30'}
      Arrive: ${data.flight?.arrive || '00:50'}
      Date: ${data.flight?.date || '02 Aug 2026'}
      Total: ${data.flight?.price || '₹5,920'}
      
      Thank you for choosing TravelBharat!
      Safe travels! ✈️
    `;
    
    window.location.href = `mailto:${data.passenger?.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // ✅ PRINT TICKET
  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" ref={ticketRef}>
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-600 text-6xl" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-gray-500 mb-6">Your flight has been booked successfully</p>

          {/* Booking ID */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 inline-block">
            <p className="text-sm text-gray-500">Booking Reference</p>
            <p className="text-xl font-bold text-blue-600">{bookingRef}</p>
          </div>

          {/* Flight Details */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-gray-900">{data.flight?.airline || 'SpiceJet'}</span>
              <span className="text-sm text-gray-500">Flight {Math.floor(1000 + Math.random() * 9000)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{data.flight?.from || 'DEL'}</p>
                <p className="text-2xl font-bold">{data.flight?.depart || '22:30'}</p>
                <p className="text-xs text-gray-400">{data.flight?.date || '02 Aug 2026'}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">{data.flight?.duration || '02h 20m'}</p>
                <div className="flex items-center gap-2">
                  <span className="w-12 h-px bg-gray-300"></span>
                  <span className="text-xs">✈️</span>
                  <span className="w-12 h-px bg-gray-300"></span>
                </div>
                <p className="text-xs text-green-600 font-semibold">Direct</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{data.flight?.to || 'BOM'}</p>
                <p className="text-2xl font-bold">{data.flight?.arrive || '00:50'}</p>
                <p className="text-xs text-gray-400">03 Aug 2026</p>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Passenger Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{data.passenger?.firstName || 'John'} {data.passenger?.lastName || 'Doe'}</span>
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{data.passenger?.email || 'john@example.com'}</span>
              <span className="text-gray-500">Phone</span>
              <span className="font-medium">{data.passenger?.phone || '+91 98765 43210'}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={handleDownloadTicket}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
            >
              <FaDownload /> Download Ticket
            </button>
            <button 
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
            >
              <FaWhatsapp /> Share on WhatsApp
            </button>
            <button 
              onClick={handleEmailTicket}
              className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
            >
              <FaEnvelope /> Email Ticket
            </button>
            <button 
              onClick={handlePrintTicket}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
            >
              <FaPrint /> Print Ticket
            </button>
          </div>

          <button onClick={() => navigate('/')} className="mt-6 text-blue-600 hover:text-blue-700 font-medium transition">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;