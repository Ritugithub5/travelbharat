// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext'; // Make sure this is imported
import Home from './pages/Home';
import States from './pages/States';
import StateDetail from './pages/StateDetail';
import Search from './pages/Search';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Experience from './pages/Experience'; 
import Birds from './pages/Birds';
import Wildlife from './pages/Wildlife';
import EcoTourismPage from './pages/EcoTourismPage'; 
import ArtGallery from './pages/ArtGallery';
import WaterMountainSection from './pages/WaterMountainSection';
import Spiritual from './pages/Spiritual';
import Wellness from './pages/Wellness';
import LuxuryTravel from './pages/LuxuryTravel';
import Culinary from './pages/Culinary';
import Cultural from './pages/Cultural';
import Flights from './pages/Flights';
import Trains from './pages/Trains';
import Buses from './pages/Buses';
import Cabs from './pages/Cabs';
import Accommodations from './pages/Accommodations';
import TourPackages from './pages/TourPackages';
import BookingDetails from './pages/BookingDetails';
import BookingConfirmation from './pages/BookingConfirmation';
import ProtectedRoute from './components/common/ProtectedRoute';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Terms from './pages/Terms';
import TamilNadu from './pages/TamilNadu';
import Kashmir from './pages/Kashmir';
import Telangana from './pages/Telangana';
import HimachalPradesh from './pages/HimachalPradesh';
import Ladakh from './pages/Ladakh';
import WestBengal from './pages/WestBengal';
import Odisha from './pages/Odisha';
import Meghalaya from './pages/Meghalaya';
import MadhyaPradesh from './pages/MadhyaPradesh';
import Maharashtra from './pages/Maharashtra';
import Gujarat from './pages/Gujarat';
import './App.css';

function App() {
  return (
    // IMPORTANT: Wrap everything with AuthProvider and AppProvider
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/states" element={<States />} />
                <Route path="/state/:stateId" element={<StateDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/birds" element={<Birds />} />
                <Route path="/wildlife" element={<Wildlife />} />
                <Route path="/EcoTourismPage" element={<EcoTourismPage />} /> 
                <Route path="/ArtGallery" element={<ArtGallery />} />
                <Route path="/WaterMountainSection" element={<WaterMountainSection />} />
                <Route path="/Spiritual" element={<Spiritual />} />
                <Route path="/Wellness" element={<Wellness />} />
                <Route path="/LuxuryTravel" element={<LuxuryTravel />} />
                <Route path="/Culinary" element={<Culinary />} />
                <Route path="/Cultural" element={<Cultural />}/>
                <Route path="/flights" element={<Flights />} />
                <Route path="/trains" element={<Trains />} />
                <Route path="/buses" element={<Buses />} />
                <Route path="/cabs" element={<Cabs />} />
                <Route path="/accommodations" element={<Accommodations />} />
                <Route path="/tourpackages" element={<TourPackages />} />
                <Route path="/booking-details" element={<BookingDetails />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/TamilNadu" element={<TamilNadu />} />
                <Route path="/Kashmir" element={<Kashmir />} />
                <Route path ="/Telangana" element={<Telangana />} />
                <Route path="/HimachalPradesh" element={<HimachalPradesh />}/>
                <Route path="/Ladakh" element={<Ladakh />}/>
                <Route path="/WestBengal" element={<WestBengal />}/>
                <Route path="/Odisha" element={<Odisha />}/>
                <Route path="/Meghalaya" element={<Meghalaya />}/>
                <Route path="/MadhyaPradesh" element={<MadhyaPradesh />}/>
                <Route path="/Maharashtra" element={<Maharashtra />}/>
                <Route path="/Gujarat" element={<Gujarat />}/>
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
