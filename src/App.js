import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AvailableTrucks from './pages/AvailableTrucks';
import AvailableGoods from './pages/AvailableGoods';
import PostGoods from './pages/PostGoods';
import DriverDashboard from './pages/DriverDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LiveTracking from './pages/LiveTracking';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trucks" element={<AvailableTrucks />} />
              <Route path="/goods" element={<AvailableGoods />} />
              <Route path="/post-goods" element={<PostGoods />} />
              <Route path="/driver-dashboard" element={<DriverDashboard />} />
              <Route path="/client-dashboard" element={<ClientDashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/tracking" element={<LiveTracking />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App; 