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
      // Navigation
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
      liveTracking: 'Live Tracking',
      
      // Auth Forms
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signInToAccount: 'Sign in to your account',
      joinTranspoLink: 'Join TranspoLink',
      createNewAccount: 'create a new account',
      alreadyHaveAccount: 'Already have an account?',
      signInHere: 'Sign in here',
      
      // Form Labels
      iAmA: 'I am a...',
      businessOwner: 'Business Owner',
      driver: 'Driver',
      needTransport: 'I need to transport goods',
      provideTransport: 'I provide transport services',
      wantProvideTransport: 'I want to provide transport services',
      firstName: 'First Name',
      lastName: 'Last Name',
      companyName: 'Company Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      
      // Form Placeholders
      enterEmail: 'Enter your email',
      enterPassword: 'Enter your password',
      createPassword: 'Create a password',
      confirmYourPassword: 'Confirm your password',
      first_name: 'First name',
      last_name: 'Last name',
      company_name: 'Company name',
      phone_placeholder: '+1 (555) 123-4567',
      
      // Buttons
      signInButton: 'Sign in',
      createAccount: 'Create Account',
      
      // Validation Messages
      emailRequired: 'Email is required',
      validEmail: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordLength: 'Password must be at least 6 characters',
      passwordLength8: 'Password must be at least 8 characters',
      passwordStrength: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      confirmPasswordRequired: 'Please confirm your password',
      passwordsDontMatch: 'Passwords do not match',
      userTypeRequired: 'Please select your user type',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      phoneRequired: 'Phone number is required',
      validPhone: 'Please enter a valid phone number',
      companyRequired: 'Company name is required for business accounts',
      acceptTerms: 'You must accept the terms and conditions',
      
      // Other
      or: 'Or',
      demoAccounts: 'Demo Accounts:',
      passwordStrengthLabel: 'Password strength:',
      veryWeak: 'Very Weak',
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
      termsPrivacy: 'I agree to the Terms of Service and Privacy Policy',
      marketingConsent: 'I would like to receive updates and marketing communications from TranspoLink',
      accountCreated: 'Account created successfully! Please check your email to verify your account.',
      
      // Navbar specific
      transpoLinkBharat: 'TranspoLink Bharat',
      signInButtonNavbar: 'Sign In',
      signUpButtonNavbar: 'Sign Up',

      // Footer specific
      smartMoves: 'Smart moves for your business — fast, reliable, nationwide transport at your fingertips',
      quickLinks: 'Quick Links',
      services: 'Services',
      expressDelivery: 'Express Delivery',
      bulkTransport: 'Bulk Transport',
      refrigeratedTransport: 'Refrigerated Transport',
      heavyEquipment: 'Heavy Equipment',
      crossCountryShipping: 'Cross-Country Shipping',
      realtimeTracking: 'Real-time Tracking',
      contactUs: 'Contact Us',
      address: 'Hostel A, Thapar University, 147004',
      
      // Available Goods Page
      availableGoods: 'Available Goods',
      findGoodsDescription: 'Find goods that need transportation along your route. Connect with businesses and earn money.',
      searchBusinessesContacts: 'Search businesses, contacts...',
      // Available Goods Page
      availableGoods: 'Available Goods',
      findGoodsDescription: 'Find goods that need transportation along your route. Connect with businesses and earn money.',
      searchBusinessesContacts: 'Search businesses, contacts...',
      cargoType: 'Cargo Type',
      allTypes: 'All Types',
      generalCargo: 'General Cargo',
      heavyMachinery: 'Heavy Machinery',
      furniture: 'Furniture',
      electronics: 'Electronics',
      constructionMaterials: 'Construction Materials',
      agriculturalProducts: 'Agricultural Products',
      industrialEquipment: 'Industrial Equipment',
      retailGoods: 'Retail Goods',
      location: 'Location',
      allLocations: 'All Locations',
      mumbai: 'Mumbai',
      delhi: 'Delhi',
      bangalore: 'Bangalore',
      chennai: 'Chennai',
      kolkata: 'Kolkata',
      sortBy: 'Sort By',
      dateEarliestFirst: 'Date: Earliest First',
      dateLatestFirst: 'Date: Latest First',
      weightLowToHigh: 'Weight: Low to High',
      weightHighToLow: 'Weight: High to Low',
      priceHighToLow: 'Price: High to Low',
      clearFilters: 'Clear Filters',
      searchResultsFor: 'Search Results for:',
      from: 'From',
      to: 'To',
      date: 'Date',
      goodsAvailable: 'Goods Available',
      showingResults: 'Showing {count} of {total} results',
      verified: 'Verified',
      route: 'Route',
      pickup: 'Pickup',
      special: 'Special',
      transportFee: 'Transport Fee',
      call: 'Call',
      email: 'Email',
      getDirections: 'Get Directions',
      noGoodsFound: 'No goods found',
      noGoodsFoundDescription: 'Try adjusting your search criteria or check back later for new listings.',
      clearAllFilters: 'Clear All Filters',

      // Available Trucks Page
      availableTrucks: 'Available Trucks',
      findTrucksDescription: 'Find the perfect truck for your cargo. All drivers are verified and insured.',
      truckType: 'Truck Type',
      boxTruck: 'Box Truck',
      flatbed: 'Flatbed',
      refrigerated: 'Refrigerated',
      tanker: 'Tanker',
      container: 'Container',
      hyderabad: 'Hyderabad',
      priceLowToHigh: 'Price: Low to High',
      highestRating: 'Highest Rating',
      searchDriversCompanies: 'Search drivers, companies...',
      trucksAvailable: 'Trucks Available',
      available: 'Available',
      totalPrice: 'Total Price',
      noTrucksFound: 'No trucks found',
      noTrucksFoundDescription: 'Try adjusting your search criteria or check back later for new listings.',

      // Common UI
      search: 'Search',
      weight: 'Weight',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      loading: 'Loading...',
      noData: 'No data available',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information'
    },
    hi: {
      // Navigation
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
      liveTracking: 'लाइव ट्रैकिंग',
      
      // Auth Forms
      signIn: 'साइन इन',
      signUp: 'साइन अप',
      signInToAccount: 'अपने खाते में साइन इन करें',
      joinTranspoLink: 'TranspoLink में शामिल हों',
      createNewAccount: 'नया खाता बनाएं',
      alreadyHaveAccount: 'क्या आपका पहले से खाता है?',
      signInHere: 'यहां साइन इन करें',
      
      // Form Labels
      iAmA: 'मैं हूं...',
      businessOwner: 'व्यवसाय मालिक',
      driver: 'ड्राइवर',
      needTransport: 'मुझे सामान परिवहन की आवश्यकता है',
      provideTransport: 'मैं परिवहन सेवाएं प्रदान करता हूं',
      wantProvideTransport: 'मैं परिवहन सेवाएं प्रदान करना चाहता हूं',
      firstName: 'पहला नाम',
      lastName: 'अंतिम नाम',
      companyName: 'कंपनी का नाम',
      emailAddress: 'ईमेल पता',
      phoneNumber: 'फोन नंबर',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      rememberMe: 'मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      
      // Form Placeholders
      enterEmail: 'अपना ईमेल दर्ज करें',
      enterPassword: 'अपना पासवर्ड दर्ज करें',
      createPassword: 'पासवर्ड बनाएं',
      confirmYourPassword: 'अपना पासवर्ड पुष्टि करें',
      first_name: 'पहला नाम',
      last_name: 'अंतिम नाम',
      company_name: 'कंपनी का नाम',
      phone_placeholder: '+91 (987) 654-3210',
      
      // Buttons
      signInButton: 'साइन इन करें',
      createAccount: 'खाता बनाएं',
      
      // Validation Messages
      emailRequired: 'ईमेल आवश्यक है',
      validEmail: 'कृपया एक वैध ईमेल पता दर्ज करें',
      passwordRequired: 'पासवर्ड आवश्यक है',
      passwordLength: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
      passwordLength8: 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए',
      passwordStrength: 'पासवर्ड में कम से कम एक बड़ा अक्षर, एक छोटा अक्षर और एक संख्या होनी चाहिए',
      confirmPasswordRequired: 'कृपया अपना पासवर्ड पुष्टि करें',
      passwordsDontMatch: 'पासवर्ड मेल नहीं खाते',
      userTypeRequired: 'कृपया अपना उपयोगकर्ता प्रकार चुनें',
      firstNameRequired: 'पहला नाम आवश्यक है',
      lastNameRequired: 'अंतिम नाम आवश्यक है',
      phoneRequired: 'फोन नंबर आवश्यक है',
      validPhone: 'कृपया एक वैध फोन नंबर दर्ज करें',
      companyRequired: 'व्यवसाय खातों के लिए कंपनी का नाम आवश्यक है',
      acceptTerms: 'आपको नियम और शर्तें स्वीकार करनी होंगी',
      
      // Other
      or: 'या',
      demoAccounts: 'डेमो खाते:',
      passwordStrengthLabel: 'पासवर्ड की ताकत:',
      veryWeak: 'बहुत कमजोर',
      weak: 'कमजोर',
      fair: 'सामान्य',
      good: 'अच्छा',
      strong: 'मजबूत',
      termsPrivacy: 'मैं सेवा की शर्तें और गोपनीयता नीति से सहमत हूं',
      marketingConsent: 'मैं TranspoLink से अपडेट और मार्केटिंग संचार प्राप्त करना चाहता हूं',
      accountCreated: 'खाता सफलतापूर्वक बनाया गया! कृपया अपना खाता सत्यापित करने के लिए अपना ईमेल जांचें।',
      
      // Navbar specific
      transpoLinkBharat: 'ट्रांसपोलिंक भारत',
      signInButtonNavbar: 'साइन इन करें',
      signUpButtonNavbar: 'साइन अप करें',

      // Footer specific
      smartMoves: 'आपके व्यवसाय के लिए स्मार्ट चालें — आपकी उंगलियों पर तेज़, विश्वसनीय, राष्ट्रव्यापी परिवहन',
      quickLinks: 'त्वरित लिंक',
      services: 'सेवाएं',
      expressDelivery: 'एक्सप्रेस डिलीवरी',
      bulkTransport: 'बल्क ट्रांसपोर्ट',
      refrigeratedTransport: 'रेफ्रिजेरेटेड ट्रांसपोर्ट',
      heavyEquipment: 'भारी उपकरण',
      crossCountryShipping: 'क्रॉस-कंट्री शिपिंग',
      realtimeTracking: 'रीयल-टाइम ट्रैकिंग',
      contactUs: 'हमसे संपर्क करें',
      address: 'छात्रावास ए, थापर विश्वविद्यालय, 147004',

      // Available Goods Page
      availableGoods: 'उपलब्ध सामान',
      findGoodsDescription: 'अपनी मार्ग पर परिवहन की आवश्यकता वाले सामान खोजें। व्यवसायों से जुड़ें और पैसे कमाएं।',
      searchBusinessesContacts: 'व्यवसायों, संपर्कों को खोजें...',
      cargoType: 'माल का प्रकार',
      allTypes: 'सभी प्रकार',
      generalCargo: 'सामान्य माल',
      heavyMachinery: 'भारी मशीनरी',
      furniture: 'फर्नीचर',
      electronics: 'इलेक्ट्रॉनिक्स',
      constructionMaterials: 'निर्माण सामग्री',
      agriculturalProducts: 'कृषि उत्पाद',
      industrialEquipment: 'औद्योगिक उपकरण',
      retailGoods: 'खुदरा सामान',
      location: 'स्थान',
      allLocations: 'सभी स्थान',
      mumbai: 'मुंबई',
      delhi: 'दिल्ली',
      bangalore: 'बेंगलुरु',
      chennai: 'चेन्नई',
      kolkata: 'कोलकाता',
      sortBy: 'इसके द्वारा क्रमबद्ध करें',
      dateEarliestFirst: 'दिनांक: सबसे पहले',
      dateLatestFirst: 'दिनांक: सबसे नया पहले',
      weightLowToHigh: 'वजन: कम से ज्यादा',
      weightHighToLow: 'वजन: ज्यादा से कम',
      priceHighToLow: 'मूल्य: ज्यादा से कम',
      clearFilters: 'फ़िल्टर साफ़ करें',
      searchResultsFor: 'इसके लिए खोज परिणाम:',
      from: 'से',
      to: 'तक',
      date: 'तारीख',
      goodsAvailable: 'सामान उपलब्ध',
      showingResults: '{total} में से {count} परिणाम दिखा रहा है',
      verified: 'सत्यापित',
      route: 'मार्ग',
      pickup: 'पिकअप',
      special: 'विशेष',
      transportFee: 'परिवहन शुल्क',
      call: 'कॉल करें',
      email: 'ईमेल करें',
      getDirections: 'दिशा-निर्देश प्राप्त करें',
      noGoodsFound: 'कोई सामान नहीं मिला',
      noGoodsFoundDescription: 'अपनी खोज मानदंड समायोजित करने का प्रयास करें या नई लिस्टिंग के लिए बाद में जांचें।',
      clearAllFilters: 'सभी फ़िल्टर साफ़ करें',

      // Available Trucks Page
      availableTrucks: 'उपलब्ध ट्रक',
      findTrucksDescription: 'अपने माल के लिए सही ट्रक खोजें। सभी ड्राइवर सत्यापित और बीमाकृत हैं।',
      truckType: 'ट्रक का प्रकार',
      boxTruck: 'बॉक्स ट्रक',
      flatbed: 'फ्लैटबेड',
      refrigerated: 'रेफ्रिजेरेटेड',
      tanker: 'टैंकर',
      container: 'कंटेनर',
      hyderabad: 'हैदराबाद',
      priceLowToHigh: 'मूल्य: कम से ज्यादा',
      highestRating: 'उच्चतम रेटिंग',
      searchDriversCompanies: 'ड्राइवरों, कंपनियों को खोजें...',
      trucksAvailable: 'ट्रक उपलब्ध',
      available: 'उपलब्ध',
      totalPrice: 'कुल मूल्य',
      noTrucksFound: 'कोई ट्रक नहीं मिला',
      noTrucksFoundDescription: 'अपनी खोज मानदंड समायोजित करने का प्रयास करें या नई लिस्टिंग के लिए बाद में जांचें।',

      // Common UI
      search: 'खोजें',
      weight: 'वजन',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      view: 'देखें',
      loading: 'लोड हो रहा है...',
      noData: 'कोई डेटा उपलब्ध नहीं है',
      error: 'त्रुटि',
      success: 'सफलता',
      warning: 'चेतावनी',
      info: 'जानकारी',
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
