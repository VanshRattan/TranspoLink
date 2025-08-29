import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState('en');

  // Check for existing user data on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('transpolink_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    const savedLang = localStorage.getItem('transpolink_lang');
    if (savedLang === 'en' || savedLang === 'hi') {
      setLanguage(savedLang);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('transpolink_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('transpolink_user');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('transpolink_user', JSON.stringify(userData));
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('transpolink_lang', next);
      return next;
    });
  };

  const translations = {
    en: {
      home: 'Home',
      trucks: 'Available Trucks',
      goods: 'Available Goods',
      postGoods: 'Post Goods',
      contact: 'Contact',
      account: 'Account',
      signOut: 'Sign Out',
      driverDashboard: 'Driver Dashboard',
      clientDashboard: 'Client Dashboard',
      authCta: 'Sign In / Sign Up',
    },
    hi: {
      home: 'होम',
      trucks: 'उपलब्ध ट्रक',
      goods: 'उपलब्ध सामान',
      postGoods: 'सामान पोस्ट करें',
      contact: 'संपर्क',
      account: 'खाता',
      signOut: 'साइन आउट',
      driverDashboard: 'ड्राइवर डैशबोर्ड',
      clientDashboard: 'क्लाइंट डैशबोर्ड',
      authCta: 'साइन इन / साइन अप',
    }
  };

  const t = (key) => translations[language]?.[key] || key;

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
    userType: user?.userType || null,
    language,
    toggleLanguage,
    t
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

