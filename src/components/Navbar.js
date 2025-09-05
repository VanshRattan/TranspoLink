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
  const { isAuthenticated, user, logout, toggleLanguage, language, t } = useUser();
  const userType = user?.role; // Access role from user object

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseNavItems = [
    { name: t('home'), path: '/', icon: <Truck className="w-5 h-5" /> },
    { name: t('contact'), path: '/contact', icon: <Phone className="w-5 h-5" /> },
  ];

  let dynamicNavItems = [];
  if (isAuthenticated) {
    if (userType === 'client') {
      dynamicNavItems = [
        { name: t('trucks'), path: '/available-trucks', icon: <Truck className="w-5 h-5" /> },
        { name: 'My Shipments', path: '/client-dashboard?tab=shipments', icon: <Package className="w-5 h-5" /> },
        { name: t('postGoods'), path: '/post-goods', icon: <Package className="w-5 h-5" /> },
      ];
    } else if (userType === 'driver') {
      dynamicNavItems = [
        { name: t('goods'), path: '/available-goods', icon: <Package className="w-5 h-5" /> },
        // Add driver specific items here if needed
      ];
    }
  }

  const navItems = [...baseNavItems, ...dynamicNavItems];

  const handleProfileClick = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md'
          : 'bg-white'
      } border-b border-gray-200`
      }
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-green-600 to-orange-400 rounded-md flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">
              TranspoLink <span className="text-primary-green font-semibold">Bharat</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-3">
            {navItems.map((item) => {
              const isActive = item.path.includes('dashboard') 
                ? location.pathname.startsWith('/client-dashboard') && location.search.includes('tab=shipments')
                : location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={
                    `flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-base transition-colors duration-150
                    ${isActive
                      ? 'text-primary-green border-b-2 border-primary-green bg-green-50'
                      : 'text-gray-600 hover:text-primary-green hover:bg-green-50'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Medium Navigation */}
          <div className="hidden lg:flex xl:hidden items-center space-x-2">
            {navItems.slice(0, 4).map((item) => {
              const isActive = item.path.includes('dashboard') 
                ? location.pathname.startsWith('/client-dashboard') && location.search.includes('tab=shipments')
                : location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-semibold transition duration-150
                    ${isActive
                      ? 'text-primary-green border-b-2 border-primary-green bg-green-50'
                      : 'text-gray-600 hover:text-primary-green hover:bg-green-50'
                    }`
                  }
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Profile and Language */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded border border-gray-200 text-sm font-medium hover:bg-gray-50"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  >
                    {isAuthenticated ? (
                      <>
                        <button
                          onClick={handleDashboard}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 flex items-center space-x-2"
                        >
                          <User className="w-4 h-4" />
                          <span>{userType === 'driver' ? t('driverDashboard') : t('clientDashboard')}</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t('signOut')}</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate('/login');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 flex items-center space-x-2 border-b border-gray-100"
                        >
                          <User className="w-4 h-4 text-green-600" />
                          <span className="font-medium">Sign In</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate('/signup');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2"
                        >
                          <User className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Sign Up</span>
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Hamburger for mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100"
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

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-white border-t border-gray-200 shadow"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = item.path.includes('dashboard') 
                  ? location.pathname.startsWith('/client-dashboard') && location.search.includes('tab=shipments')
                  : location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-primary-green border-b-2 border-primary-green bg-green-50'
                        : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
