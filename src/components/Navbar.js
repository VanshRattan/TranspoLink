import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { 
  Truck, 
  Menu, 
  X, 
  User, 
  Package, 
  Phone, 
  ChevronDown,
  LogOut,
  Navigation
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userType, logout, toggleLanguage, language, t } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('home'), path: '/', icon: <Truck className="w-5 h-5" /> },
    { name: t('trucks'), path: '/trucks', icon: <Package className="w-5 h-5" /> },
    { name: t('goods'), path: '/goods', icon: <Package className="w-5 h-5" /> },
    { name: t('postGoods'), path: '/post-goods', icon: <Package className="w-5 h-5" /> },
    { name: language === 'en' ? 'Live Tracking' : 'लाइव ट्रैकिंग', path: '/tracking', icon: <Navigation className="w-5 h-5" /> },
    { name: t('contact'), path: '/contact', icon: <Phone className="w-5 h-5" /> },
  ];

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsProfileOpen(!isProfileOpen);
    } else {
      // If not logged in, show login options
      setIsProfileOpen(!isProfileOpen);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleAuth = () => {
    setIsProfileOpen(false);
    navigate('/auth');
  };

  const handleDashboard = () => {
    setIsProfileOpen(false);
    if (userType === 'driver') {
      navigate('/driver-dashboard');
    } else {
      navigate('/client-dashboard');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-green to-primary-orange rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">TranspoLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary-green bg-green-50'
                    : 'text-gray-700 hover:text-primary-green hover:bg-green-50'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Medium Screen Navigation (shows fewer items) */}
          <div className="hidden lg:flex xl:hidden items-center space-x-4">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary-green bg-green-50'
                    : 'text-gray-700 hover:text-primary-green hover:bg-green-50'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Profile Section and Language Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {userType === 'driver' ? (language === 'en' ? 'Driver' : 'ड्राइवर') : (language === 'en' ? 'Business' : 'व्यवसाय')}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">{userType}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <button
                        onClick={handleDashboard}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>{userType === 'driver' ? t('driverDashboard') : t('clientDashboard')}</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('signOut')}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAuth}
                  className="bg-primary-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm"
                >
                  {t('authCta')}
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary-green bg-green-50'
                      : 'text-gray-700 hover:text-primary-green hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 