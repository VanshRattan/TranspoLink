import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  Package, 
  MapPin, 
  Calendar, 
  Scale, 
  Star, 
  Filter, 
  Search,
  Phone,
  Mail,
  Shield,
  ArrowUpDown,
  DollarSign,
  Navigation
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const AvailableGoods = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCargoType, setSelectedCargoType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date-earliest');
  const { t } = useUser();

  // URL search params (from another page)
  const fromLocation = searchParams.get('from') || '';
  const toLocation = searchParams.get('to') || '';
  const searchDate = searchParams.get('date') || '';

  const cargoTypes = [
    { id: 'all', name: t('allTypes') },
    { id: 'general', name: t('generalCargo') },
    { id: 'heavy', name: t('heavyMachinery') },
    { id: 'furniture', name: t('furniture') },
    { id: 'electronics', name: t('electronics') },
    { id: 'construction', name: t('constructionMaterials') },
    { id: 'agricultural', name: t('agriculturalProducts') },
    { id: 'industrial', name: t('industrialEquipment') },
    { id: 'retail', name: t('retailGoods') }
  ];

  const locations = [
    { id: 'all', name: t('allLocations') },
    { id: 'mumbai', name: t('mumbai') },
    { id: 'delhi', name: t('delhi') },
    { id: 'bangalore', name: t('bangalore') },
    { id: 'chennai', name: t('chennai') },
    { id: 'kolkata', name: t('kolkata') }
  ];

  const sortOptions = [
    { id: 'date-earliest', name: t('dateEarliestFirst'), icon: <Calendar className="w-4 h-4" /> },
    { id: 'date-latest', name: t('dateLatestFirst'), icon: <Calendar className="w-4 h-4" /> },
    { id: 'weight-low', name: t('weightLowToHigh'), icon: <Scale className="w-4 h-4" /> },
    { id: 'weight-high', name: t('weightHighToLow'), icon: <Scale className="w-4 h-4" /> },
    { id: 'price-high', name: t('priceHighToLow'), icon: <DollarSign className="w-4 h-4" /> }
  ];

  const goods = [
    {
      id: 1,
      business: "Mumbai Electronics Co.",
      contact: "Rajesh Kumar",
      cargoType: t('electronics'),
      weight: "2,500 kg",
      dimensions: "8' x 6' x 4'",
      pickupLocation: t('mumbai') + ", Maharashtra",
      deliveryLocation: t('delhi') + ", Delhi",
      pickupDate: "2025-09-15",
      deliveryDate: "2025-09-18",
      price: 18000,
      priceDisplay: "₹18,000",
      rating: 4.8,
      reviews: 45,
      verified: true,
      insurance: true,
      phone: "+91 98765 43210",
      email: "rajesh@mumbai-electronics.com",
      specialRequirements: "Temperature controlled, fragile handling",
      image: "https://images.unsplash.com/photo-1542838687-28fd8aab946d?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      business: "Bangalore Furniture Works",
      contact: "Anita Sharma",
      cargoType: t('furniture'),
      weight: "3,200 kg",
      dimensions: "12' x 8' x 6'",
      pickupLocation: t('bangalore') + ", Karnataka",
      deliveryLocation: t('chennai') + ", Tamil Nadu",
      pickupDate: "2025-09-18",
      deliveryDate: "2025-09-22",
      price: 22000,
      priceDisplay: "₹22,000",
      rating: 4.7,
      reviews: 32,
      verified: true,
      insurance: true,
      phone: "+91 87654 32109",
      email: "anita@bangalore-furniture.com",
      specialRequirements: "White glove delivery, assembly required",
      image: "https://images.unsplash.com/photo-1567016544885-451baef1d37a?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      business: "Delhi Construction Materials",
      contact: "Vikram Singh",
      cargoType: t('constructionMaterials'),
      weight: "15,000 kg",
      dimensions: "20' x 8' x 8'",
      pickupLocation: t('delhi') + ", Delhi",
      deliveryLocation: t('kolkata') + ", West Bengal",
      pickupDate: "2025-09-20",
      deliveryDate: "2025-09-25",
      price: 35000,
      priceDisplay: "₹35,000",
      rating: 4.9,
      reviews: 67,
      verified: true,
      insurance: true,
      phone: "+91 99887 66554",
      email: "vikram@delhi-construction.com",
      specialRequirements: "Heavy equipment, loading assistance needed",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      business: "Chennai AgriFresh Farms",
      contact: "Lakshmi Menon",
      cargoType: t('agriculturalProducts'),
      weight: "8,500 kg",
      dimensions: "16' x 8' x 8'",
      pickupLocation: t('chennai') + ", Tamil Nadu",
      deliveryLocation: t('mumbai') + ", Maharashtra",
      pickupDate: "2025-09-22",
      deliveryDate: "2025-09-26",
      price: 28000,
      priceDisplay: "₹28,000",
      rating: 4.6,
      reviews: 28,
      verified: true,
      insurance: true,
      phone: "+91 96543 21087",
      email: "lakshmi@agrifresh-chennai.com",
      specialRequirements: "Refrigerated transport, quick delivery",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      business: "Kolkata Industrial Machinery",
      contact: "Rohan Das",
      cargoType: t('heavyMachinery'),
      weight: "25,000 kg",
      dimensions: "40' x 10' x 12'",
      pickupLocation: t('kolkata') + ", West Bengal",
      deliveryLocation: t('bangalore') + ", Karnataka",
      pickupDate: "2025-09-25",
      deliveryDate: "2025-09-30",
      price: 52000,
      priceDisplay: "₹52,000",
      rating: 4.8,
      reviews: 89,
      verified: true,
      insurance: true,
      phone: "+91 93456 78901",
      email: "rohan@kolkata-machinery.com",
      specialRequirements: "Oversized load, escort required",
      image: "https://images.unsplash.com/photo-1581091870621-08d12a1bb536?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      business: "Delhi Retail Express",
      contact: "Sunita Rao",
      cargoType: t('retailGoods'),
      weight: "4,800 kg",
      dimensions: "14' x 8' x 6'",
      pickupLocation: t('delhi') + ", Delhi",
      deliveryLocation: t('chennai') + ", Tamil Nadu",
      pickupDate: "2025-09-28",
      deliveryDate: "2025-10-02",
      price: 32000,
      priceDisplay: "₹32,000",
      rating: 4.7,
      reviews: 56,
      verified: true,
      insurance: true,
      phone: "+91 98765 43211",
      email: "sunita@delhi-retail.com",
      specialRequirements: "Secure packaging, tracking required",
      image: "https://images.unsplash.com/photo-1528795655934-1d7d20df4cf1?w=400&h=300&fit=crop"
    }
  ];

  // Filtering logic
  const filteredGoods = goods.filter(item => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = term === '' ||
      item.business.toLowerCase().includes(term) ||
      item.contact.toLowerCase().includes(term) ||
      item.cargoType.toLowerCase().includes(term);
      
    const matchesCargoType = selectedCargoType === 'all' ||
      item.cargoType.toLowerCase().replace(/\s+/g, '-') === selectedCargoType;
      
    const matchesLocation = selectedLocation === 'all' ||
      item.pickupLocation.toLowerCase().includes(selectedLocation);
      
    const matchesFrom = !fromLocation || 
      item.pickupLocation.toLowerCase().includes(fromLocation.toLowerCase());
      
    const matchesTo = !toLocation || 
      item.deliveryLocation.toLowerCase().includes(toLocation.toLowerCase());
      
    const matchesDate = !searchDate || item.pickupDate === searchDate;
    
    return matchesSearch && matchesCargoType && matchesLocation && matchesFrom && matchesTo && matchesDate;
  });

  // Sorting logic
  const sortedGoods = [...filteredGoods].sort((a, b) => {
    switch (sortBy) {
      case 'date-earliest':
        return new Date(a.pickupDate) - new Date(b.pickupDate);
      case 'date-latest':
        return new Date(b.pickupDate) - new Date(a.pickupDate);
      case 'weight-low':
        return parseInt(a.weight.replace(/[^\d]/g, '')) - parseInt(b.weight.replace(/[^\d]/g, ''));
      case 'weight-high':
        return parseInt(b.weight.replace(/[^\d]/g, '')) - parseInt(a.weight.replace(/[^\d]/g, ''));
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const updateSearchParams = (newParams) => {
    const current = Object.fromEntries(searchParams.entries());
    const updated = { ...current, ...newParams };
    setSearchParams(updated);
  };

  const handleSearchChange = (field, value) => {
    if (field === 'searchTerm') {
      setSearchTerm(value);
    } else if (field === 'selectedCargoType') {
      setSelectedCargoType(value);
      updateSearchParams({ cargoType: value });
    } else if (field === 'selectedLocation') {
      setSelectedLocation(value);
      updateSearchParams({ location: value });
    } else if (field === 'sortBy') {
      setSortBy(value);
      updateSearchParams({ sort: value });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCargoType('all');
    setSelectedLocation('all');
    setSortBy('date-earliest');
    setSearchParams({});
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('availableGoods')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('findGoodsDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

            {/* Search Term */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t('search')}</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('searchBusinessesContacts')}
                  value={searchTerm}
                  onChange={(e) => handleSearchChange('searchTerm', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
              </div>
            </div>

            {/* Cargo Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t('cargoType')}</label>
              <select
                value={selectedCargoType}
                onChange={(e) => handleSearchChange('selectedCargoType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              >
                {cargoTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t('location')}</label>
              <select
                value={selectedLocation}
                onChange={(e) => handleSearchChange('selectedLocation', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t('sortBy')}</label>
              <select
                value={sortBy}
                onChange={(e) => handleSearchChange('sortBy', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            <div>
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                {t('clearFilters')}
              </button>
            </div>
          </div>

          {/* Show search parameters from homepage if any */}
          {(fromLocation || toLocation || searchDate) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 p-4 bg-primary-green bg-opacity-10 rounded-lg border border-primary-green"
            >
              <div className="flex items-center gap-2 text-primary-green font-medium">
                <Filter className="w-4 h-4" />
                <span>{t('searchResultsFor')}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm">
                {fromLocation && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    {t('from')}: {fromLocation}
                  </span>
                )}
                {toLocation && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    {t('to')}: {toLocation}
                  </span>
                )}
                {searchDate && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    {t('date')}: {searchDate}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              {sortedGoods.length} {t('goodsAvailable')}
            </h2>
            <div className="text-gray-600">
              {t('showingResults')
                .replace('{count}', sortedGoods.length)
                .replace('{total}', goods.length)}
            </div>
          </div>

          {/* Goods Grid */}
          {sortedGoods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedGoods.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Goods Image */}
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={item.image}
                      alt={`${item.cargoType} cargo`}
                      className="w-full h-full object-cover"
                    />
                    {item.verified && (
                      <div className="absolute top-3 right-3 bg-primary-green text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {t('verified')}
                      </div>
                    )}
                  </div>

                  {/* Goods Details */}
                  <div className="p-6">
                    {/* Business and Contact */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {item.business}
                      </h3>
                      <p className="text-gray-600">{item.contact}</p>
                    </div>

                    {/* Route Information */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-primary-green">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{t('route')}</span>
                        <span className="text-xs text-gray-500">{t('pickup')}: {item.pickupDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-900">
                        <MapPin className="w-4 h-4 text-primary-green" />
                        <span className="font-medium">{item.pickupLocation}</span>
                        <ArrowUpDown className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{item.deliveryLocation}</span>
                      </div>
                    </div>

                    {/* Cargo Specifications */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package className="w-4 h-4" />
                        <span>{item.cargoType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Scale className="w-4 h-4" />
                        <span>{item.weight} • {item.dimensions}</span>
                      </div>
                      {item.specialRequirements && (
                        <div className="text-sm text-gray-500 bg-yellow-50 p-2 rounded border-l-2 border-yellow-400">
                          <strong>{t('special')}:</strong> {item.specialRequirements}
                        </div>
                      )}
                    </div>

                    {/* Rating and Price */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {item.rating} ({item.reviews})
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-green">
                          {item.priceDisplay}
                        </div>
                        <div className="text-xs text-gray-500">{t('transportFee')}</div>
                      </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        {t('call')}
                      </button>
                      <button className="flex-1 bg-primary-orange text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        {t('email')}
                      </button>
                    </div>

                    {/* Navigation Button */}
                    <div className="mt-3">
                      <button 
                        onClick={() => {
                          const pickupLocation = encodeURIComponent(item.pickupLocation);
                          const deliveryLocation = encodeURIComponent(item.deliveryLocation);
                          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${pickupLocation}&destination=${deliveryLocation}&travelmode=driving`;
                          window.open(googleMapsUrl, '_blank');
                        }}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        {t('getDirections')}
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('noGoodsFound')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('noGoodsFoundDescription')}
              </p>
              <button
                onClick={clearFilters}
                className="bg-primary-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                {t('clearAllFilters')}
              </button>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
};

export default AvailableGoods;
