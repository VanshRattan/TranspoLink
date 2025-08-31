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
  Navigation,
  Mail,
  Phone
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { userType, isAuthenticated, language } = useUser();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    cargoType: '',
    weight: ''
  });
  
  // All India major cities list for autocomplete
  const indianCities = [
    // North India
    'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Pune',
    'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
    'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
    'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi',
    'Srinagar', 'Aurangabad', 'Navi Mumbai', 'Solapur', 'Surat', 'Jabalpur', 'Gwalior',
    'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati',
    'Chandigarh', 'Mangalore', 'Bhubaneswar', 'Amritsar', 'Jalandhar', 'Patiala',
    'Bathinda', 'Mohali', 'Hoshiarpur', 'Firozpur', 'Faridkot', 'Moga', 'Sangrur',
    'Barnala', 'Mansa', 'Kapurthala', 'Tarn Taran', 'Gurdaspur', 'Pathankot',
    'Rupnagar', 'Fatehgarh Sahib', 'Nawanshahr', 'Khanna', 'Phagwara', 'Rajpura',
    'Zirakpur', 'Batala', 'Abohar', 'Sunam', 'Gobindgarh', 'Malerkotla', 'Nabha',
    'Samana', 'Sirhind', 'Kharar',
    // South India
    'Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Kollam', 'Thrissur', 'Palakkad',
    'Malappuram', 'Kannur', 'Kottayam', 'Alappuzha', 'Mysore', 'Hubli-Dharwad',
    'Belgaum', 'Bellary', 'Tumkur', 'Davangere', 'Bijapur', 'Gulbarga', 'Shimoga',
    'Tiruchirappalli', 'Salem', 'Erode', 'Tiruppur', 'Vellore', 'Thoothukkudi',
    'Dindigul', 'Thanjavur', 'Ranipet', 'Sivakasi', 'Karur', 'Udhagamandalam',
    'Kumbakonam', 'Nagercoil', 'Kanchipuram', 'Kumbakonam', 'Tirunelveli',
    // East India
    'Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur', 'Puri',
    'Jamshedpur', 'Dhanbad', 'Ranchi', 'Bokaro Steel City', 'Deoghar', 'Hazaribagh',
    'Giridih', 'Dumka', 'Phagwara', 'Siliguri', 'Darjeeling', 'Asansol', 'Durgapur',
    'Bardhaman', 'Malda', 'Baharampur', 'Howrah', 'Kolkata', 'Kharagpur',
    // West India
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar',
    'Junagadh', 'Anand', 'Bharuch', 'Mehsana', 'Morbi', 'Surendranagar', 'Gandhidham',
    'Veraval', 'Porbandar', 'Bhuj', 'Palanpur', 'Godhra', 'Dahod', 'Navsari',
    // Central India
    'Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna',
    'Ratlam', 'Rewa', 'Murwara', 'Singrauli', 'Burhanpur', 'Khandwa', 'Chhindwara',
    'Sehore', 'Vidisha', 'Raisen', 'Hoshangabad', 'Harda', 'Betul', 'Chhatarpur',
    'Tikamgarh', 'Damoh', 'Panna', 'Sidhi', 'Shahdol', 'Anuppur', 'Dindori',
    // North East India
    'Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tinsukia', 'Tezpur', 'Nagaon',
    'Bongaigaon', 'Goalpara', 'Barpeta', 'Dhubri', 'Kokrajhar', 'Baksa', 'Chirang',
    'Udalguri', 'Darrang', 'Sonitpur', 'Lakhimpur', 'Dhemaji', 'Tinsukia', 'Dibrugarh',
    'Sivasagar', 'Jorhat', 'Golaghat', 'Karbi Anglong', 'Dima Hasao', 'Karbi Anglong',
    'Dima Hasao', 'Karbi Anglong', 'Dima Hasao', 'Karbi Anglong', 'Dima Hasao'
  ];

  const getCitySuggestions = (query) => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return indianCities.filter(c => c.toLowerCase().includes(q)).slice(0, 8);
  };

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
          {language === 'en' ? 'Find goods going your way' : 'अपने दिशा में वस्तुओं का खोजें'}
          <span className="block text-primary-orange">{language === 'en' ? 'your way' : 'अपने दिशा में'}</span>
        </>
      );
    } else {
      return (
        <>
          {language === 'en' ? 'Find trucks going your way' : 'अपने दिशा में ट्रकों का खोजें'}
          <span className="block text-primary-orange">{language === 'en' ? 'your way' : 'अपने दिशा में'}</span>
        </>
      );
    }
  };

  const getHeroDescription = () => {
    if (isAuthenticated && userType === 'driver') {
      return language === 'en' ? 'Post your goods and find drivers to transport them.' : 'अपनी वस्तुओं को पोस्ट करें और उन्हें वाहनों से भेजने वाले व्यापारी को खोजें।';
    } else {
      return language === 'en' ? 'Post your truck and find goods to transport.' : 'अपने ट्रक को पोस्ट करें और उन्हें वाहनों से वस्तुओं को भेजने वाले व्यापारी को खोजें।';
    }
  };

  const getSearchButtonText = () => {
    if (isAuthenticated && userType === 'driver') {
      return language === 'en' ? 'Find Goods' : 'वस्तुओं का खोजें';
    } else {
      return language === 'en' ? 'Find Trucks' : 'ट्रकों का खोजें';
    }
  };

  const getSearchPlaceholder = () => {
    if (isAuthenticated && userType === 'driver') {
      return language === 'en' ? 'Enter pickup city' : 'उठाने का शहर दर्ज करें';
    } else {
      return language === 'en' ? 'Enter pickup city' : 'उठाने का शहर दर्ज करें';
    }
  };

  const getDestinationPlaceholder = () => {
    if (isAuthenticated && userType === 'driver') {
      return language === 'en' ? 'Enter delivery city' : 'विधान का शहर दर्ज करें';
    } else {
      return language === 'en' ? 'Enter delivery city' : 'विधान का शहर दर्ज करें';
    }
  };

  const getFeatures = () => {
    if (isAuthenticated && userType === 'driver') {
      return [
        {
          icon: <Navigation className="w-12 h-12" />,
          title: language === 'en' ? 'Find goods on route' : 'अपने दिशा में वस्तुओं का देखें',
          description: language === 'en' ? 'See which businesses need goods' : 'देखें कि कौन से व्यापारी वस्तुओं की जरूरत है'
        },
        {
          icon: <Shield className="w-12 h-12" />,
          title: language === 'en' ? 'Trust verified businesses' : 'विश्वसनीय व्यापारी',
          description: language === 'en' ? 'All businesses verified' : 'सभी व्यापारी सत्यापित हैं'
        },
        {
          icon: <Search className="w-12 h-12" />,
          title: language === 'en' ? 'Search, book & earn' : 'खोजें, बुक करें और कमाएं',
          description: language === 'en' ? 'Find available goods in minutes' : 'मिनटों में उपलब्ध वस्तुओं का खोजें'
        }
      ];
    } else {
      return [
        {
          icon: <Navigation className="w-12 h-12" />,
          title: language === 'en' ? 'Find trucks going your way' : 'अपने दिशा में ट्रकों का देखें',
          description: language === 'en' ? 'See which trucks traveling' : 'देखें कि कौन से ट्रक यात्रा कर रहे हैं'
        },
        {
          icon: <Shield className="w-12 h-12" />,
          title: language === 'en' ? 'Trust verified drivers' : 'विश्वसनीय वाहन चालक',
          description: language === 'en' ? 'All drivers verified' : 'सभी वाहन चालक सत्यापित हैं'
        },
        {
          icon: <Search className="w-12 h-12" />,
          title: language === 'en' ? 'Search, book & ship' : 'खोजें, बुक करें और भेजें',
          description: language === 'en' ? 'Find available trucks in minutes' : 'मिनटों में उपलब्ध ट्रकों का खोजें'
        }
      ];
    }
  };

  const features = getFeatures();

  const stats = [
    { number: "0+", label: language === 'en' ? 'verified drivers' : 'सत्यापित वाहन चालक', icon: <Truck className="w-6 h-6" /> },
    { number: "0+", label: language === 'en' ? 'successful deliveries' : 'सफल विधान', icon: <CheckCircle className="w-6 h-6" /> },
    { number: "0", label: language === 'en' ? 'average rating' : 'औसत रेटिंग', icon: <Star className="w-6 h-6" /> },
    { number: "0+", label: language === 'en' ? 'cities covered' : 'शहरों का कवर', icon: <Globe className="w-6 h-6" /> }
  ];

  const cargoTypes = [
    language === 'en' ? 'general cargo' : 'सामान्य वस्तु',
    language === 'en' ? 'heavy machinery' : 'भारी मशीनरी', 
    language === 'en' ? 'furniture' : 'फर्नीचर',
    language === 'en' ? 'electronics' : 'इलेक्ट्रॉनिक्स',
    language === 'en' ? 'construction materials' : 'निर्माण सामग्री',
    language === 'en' ? 'agricultural products' : 'कृषि उत्पाद',
    language === 'en' ? 'industrial equipment' : 'औद्योगिक उपकरण',
    language === 'en' ? 'retail goods' : 'व्यापारिक वस्तु'
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
                      {language === 'en' ? 'Pickup Location' : 'उठाने का स्थान'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={getSearchPlaceholder()}
                        value={searchData.from}
                        onChange={(e) => handleSearchChange('from', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-200"
                      />
                      {getCitySuggestions(searchData.from).length > 0 && (
                        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-auto">
                          {getCitySuggestions(searchData.from).map((city) => (
                            <div
                              key={`from-${city}`}
                              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onMouseDown={() => handleSearchChange('from', city)}
                            >
                              {city}, India
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* To */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary-green" />
                      {language === 'en' ? 'Drop Location' : 'विधान का स्थान'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={getDestinationPlaceholder()}
                        value={searchData.to}
                        onChange={(e) => handleSearchChange('to', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-200"
                      />
                      {getCitySuggestions(searchData.to).length > 0 && (
                        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-auto">
                          {getCitySuggestions(searchData.to).map((city) => (
                            <div
                              key={`to-${city}`}
                              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onMouseDown={() => handleSearchChange('to', city)}
                            >
                              {city}, India
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cargo Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Package className="w-4 h-4 mr-2 text-primary-green" />
                      {language === 'en' ? 'Cargo Type' : 'वस्तु का प्रकार'}
                    </label>
                    <select
                      value={searchData.cargoType}
                      onChange={(e) => handleSearchChange('cargoType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">{language === 'en' ? 'Select Cargo Type' : 'वस्तु का प्रकार चुनें'}</option>
                      {cargoTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary-green" />
                      {isAuthenticated && userType === 'driver' ? (language === 'en' ? 'Pickup Date' : 'उठाने का तारीख') : (language === 'en' ? 'Loading Date' : 'तारीख लोडिंग हो रही है')}
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
                ? (language === 'en' ? 'Ready to find next cargo?' : 'अगली वस्तु खोजने के लिए तैयार?')
                : (language === 'en' ? 'Ready to ship goods?' : 'वस्तुओं को भेजने के लिए तैयार?')}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {isAuthenticated && userType === 'driver'
                ? (language === 'en' ? 'Join thousands of drivers earning' : 'हजारों वाहन चालकों को कमाने के लिए जुड़ें')
                : (language === 'en' ? 'Join thousands of businesses saving' : 'हजारों व्यापारी बचाने के लिए जुड़ें')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/auth"
                    className="bg-primary-green text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    {language === 'en' ? 'Get Started' : 'शुरू करें'}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/auth"
                    className="bg-white text-primary-green border-2 border-primary-green px-8 py-4 rounded-lg hover:bg-primary-green hover:text-white transition-all duration-200 font-semibold text-lg"
                  >
                    {language === 'en' ? 'Sign In' : 'साइन इन करें'}
                  </Link>
                  <Link
                    to="/tracking?id=DEMO123"
                    className="bg-primary-orange text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold text-lg"
                  >
                    {language === 'en' ? 'View Tracking' : 'ट्रैकिंग देखें'}
                  </Link>
                </>
              ) : (
                <Link
                  to={userType === 'driver' ? '/driver-dashboard' : '/client-dashboard'}
                  className="bg-primary-green text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg flex items-center justify-center gap-2"
                >
                  {language === 'en' ? 'Go to Dashboard' : 'डैशबोर्ड पर जाएं'}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Need Help?' : 'मदद चाहिए?'}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {language === 'en' ? 'Our team is here to assist you with any questions or concerns.' : 'हमारी टीम आपकी किसी भी प्रश्न या चिंता में मदद करने के लिए यहां है।'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-primary-green" />
                <a 
                  href="mailto:transpolinkbharat@gmail.com" 
                  className="text-lg font-medium text-primary-green hover:text-primary-orange hover:underline transition-all duration-200 cursor-pointer"
                >
                  transpolinkbharat@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-primary-green" />
                <a 
                  href="tel:+919931082500" 
                  className="text-lg font-medium text-primary-green hover:text-primary-orange hover:underline transition-all duration-200 cursor-pointer"
                >
                  +91 99310 82500
                </a>
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/contact"
                className="bg-primary-green text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg"
              >
                {language === 'en' ? 'Contact Us' : 'संपर्क करें'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 