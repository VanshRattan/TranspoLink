import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { 
  Truck, 
  Package, 
  MapPin, 
  Calendar, 
  Search,
  Shield, 
  Star, 
  ArrowRight,
  CheckCircle,
  Globe,
  Box,
  Navigation
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { userType, isAuthenticated } = useUser();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    cargoType: '',
    weight: ''
  });

  const handleSearchChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Navigate based on user role
    if (isAuthenticated && userType === 'driver') {
      // Driver searches for goods
      const searchParams = new URLSearchParams();
      if (searchData.from) searchParams.append('from', searchData.from);
      if (searchData.to) searchParams.append('to', searchData.to);
      if (searchData.date) searchParams.append('date', searchData.date);
      if (searchData.cargoType) searchParams.append('cargoType', searchData.cargoType);
      
      navigate(`/goods?${searchParams.toString()}`);
    } else {
      // Business owner or guest searches for trucks
      const searchParams = new URLSearchParams();
      if (searchData.from) searchParams.append('from', searchData.from);
      if (searchData.to) searchParams.append('to', searchData.to);
      if (searchData.date) searchParams.append('date', searchData.date);
      if (searchData.cargoType) searchParams.append('cargoType', searchData.cargoType);
      
      navigate(`/trucks?${searchParams.toString()}`);
    }
  };

  // Dynamic content based on user role
  const getHeroTitle = () => {
    if (isAuthenticated && userType === 'driver') {
      return (
        <>
          Find goods going
          <span className="block text-primary-orange">your way</span>
        </>
      );
    } else {
      return (
        <>
          Find trucks going
          <span className="block text-primary-orange">your way</span>
        </>
      );
    }
  };

  const getHeroDescription = () => {
    if (isAuthenticated && userType === 'driver') {
      return "Businesses post their goods, you find available cargo along your route. No more empty return trips - connect with businesses and earn money.";
    } else {
      return "Drivers post their routes, you book available space. No more empty return trips - connect with trucks traveling from your city to your destination.";
    }
  };

  const getSearchButtonText = () => {
    if (isAuthenticated && userType === 'driver') {
      return "Find Goods";
    } else {
      return "Find Trucks";
    }
  };

  const getSearchPlaceholder = () => {
    if (isAuthenticated && userType === 'driver') {
      return "Enter pickup city";
    } else {
      return "Enter pickup city";
    }
  };

  const getDestinationPlaceholder = () => {
    if (isAuthenticated && userType === 'driver') {
      return "Enter delivery city";
    } else {
      return "Enter delivery city";
    }
  };

  const getFeatures = () => {
    if (isAuthenticated && userType === 'driver') {
      return [
        {
          icon: <Navigation className="w-12 h-12" />,
          title: "Find goods on your route",
          description: "See which businesses need goods transported along your planned route. Pick up cargo and earn money on your return trips."
        },
        {
          icon: <Shield className="w-12 h-12" />,
          title: "Trust verified businesses",
          description: "All businesses are verified with insurance, payment guarantees, and customer reviews. Your earnings are secure."
        },
        {
          icon: <Search className="w-12 h-12" />,
          title: "Search, book and earn!",
          description: "Find available goods on your route in minutes. No more empty return trips - everyone wins!"
        }
      ];
    } else {
      return [
        {
          icon: <Navigation className="w-12 h-12" />,
          title: "Find trucks going your way",
          description: "See which trucks are traveling from your city to your destination. Book available space and save on transport costs."
        },
        {
          icon: <Shield className="w-12 h-12" />,
          title: "Trust verified drivers",
          description: "All drivers are verified with insurance, safety records, and customer reviews. Your goods are in safe hands."
        },
        {
          icon: <Search className="w-12 h-12" />,
          title: "Search, book and ship!",
          description: "Find available trucks on your route in minutes. No more empty return trips - everyone wins!"
        }
      ];
    }
  };

  const features = getFeatures();

  const stats = [
    { number: "10,000+", label: "Verified Drivers", icon: <Truck className="w-6 h-6" /> },
    { number: "50,000+", label: "Successful Deliveries", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "4.8", label: "Average Rating", icon: <Star className="w-6 h-6" /> },
    { number: "25+", label: "Cities Covered", icon: <Globe className="w-6 h-6" /> }
  ];

  const cargoTypes = [
    "General Cargo",
    "Heavy Machinery", 
    "Furniture",
    "Electronics",
    "Construction Materials",
    "Agricultural Products",
    "Industrial Equipment",
    "Retail Goods"
  ];



  return (
    <div className="pt-16">
      {/* Hero Section with Search Form */}
      <section className="relative min-h-screen flex items-center">
        {/* Background with transport illustration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-green via-green-600 to-primary-orange">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          
          {/* Transport illustration elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          
          {/* Road/bridge illustration */}
          <div className="absolute bottom-1/3 left-0 right-0 h-2 bg-white/30 transform -skew-y-12"></div>
          
          {/* Truck and cargo illustrations */}
          <div className="absolute bottom-1/3 left-1/4 w-16 h-8 bg-white/80 rounded-lg transform -skew-y-12 flex items-center justify-center">
            <Truck className="w-8 h-6 text-primary-green" />
          </div>
          <div className="absolute bottom-1/3 left-1/2 w-16 h-8 bg-white/80 rounded-lg transform -skew-y-12 flex items-center justify-center">
            <Box className="w-8 h-6 text-primary-green" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-8 bg-white/80 rounded-lg transform -skew-y-12 flex items-center justify-center">
            <Package className="w-8 h-6 text-primary-green" />
          </div>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                {getHeroTitle()}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                {getHeroDescription()}
              </p>
            </motion.div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  {/* From */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary-green" />
                      {isAuthenticated && userType === 'driver' ? 'Starting Point' : 'Pickup Point'}
                    </label>
                    <input
                      type="text"
                      placeholder={getSearchPlaceholder()}
                      value={searchData.from}
                      onChange={(e) => handleSearchChange('from', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-200"
                    />
                  </div>

                  {/* To */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary-green" />
                      {isAuthenticated && userType === 'driver' ? 'Destination' : 'Destination'}
                    </label>
                    <input
                      type="text"
                      placeholder={getDestinationPlaceholder()}
                      value={searchData.to}
                      onChange={(e) => handleSearchChange('to', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-200"
                    />
                  </div>

                  {/* Cargo Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Package className="w-4 h-4 mr-2 text-primary-green" />
                      Cargo Type
                    </label>
                    <select
                      value={searchData.cargoType}
                      onChange={(e) => handleSearchChange('cargoType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Select cargo type</option>
                      {cargoTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary-green" />
                      {isAuthenticated && userType === 'driver' ? 'Pickup Date' : 'Loading Date'}
                    </label>
                    <input
                      type="date"
                      value={searchData.date}
                      onChange={(e) => handleSearchChange('date', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-200"
                    />
                  </div>

                  {/* Search Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary-green hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      {getSearchButtonText()}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-green mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {isAuthenticated && userType === 'driver' 
                ? 'Ready to find your next cargo?' 
                : 'Ready to ship your goods?'}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {isAuthenticated && userType === 'driver'
                ? 'Join thousands of drivers who are already earning money by transporting goods along their routes.'
                : 'Join thousands of businesses who are already saving money on transportation costs.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/signup"
                    className="bg-primary-green text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white text-primary-green border-2 border-primary-green px-8 py-4 rounded-lg hover:bg-primary-green hover:text-white transition-all duration-200 font-semibold text-lg"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to={userType === 'driver' ? '/driver-dashboard' : '/client-dashboard'}
                  className="bg-primary-green text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg flex items-center justify-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 