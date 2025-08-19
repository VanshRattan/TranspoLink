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

const AvailableGoods = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCargoType, setSelectedCargoType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date-earliest');
  
  // Get search parameters from URL (from homepage search)
  const fromLocation = searchParams.get('from') || '';
  const toLocation = searchParams.get('to') || '';
  const searchDate = searchParams.get('date') || '';

  const cargoTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'general', name: 'General Cargo' },
    { id: 'heavy', name: 'Heavy Machinery' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'construction', name: 'Construction Materials' },
    { id: 'agricultural', name: 'Agricultural Products' },
    { id: 'industrial', name: 'Industrial Equipment' },
    { id: 'retail', name: 'Retail Goods' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'new-york', name: 'New York' },
    { id: 'los-angeles', name: 'Los Angeles' },
    { id: 'chicago', name: 'Chicago' },
    { id: 'houston', name: 'Houston' },
    { id: 'phoenix', name: 'Phoenix' }
  ];

  const sortOptions = [
    { id: 'date-earliest', name: 'Date: Earliest First', icon: <Calendar className="w-4 h-4" /> },
    { id: 'date-latest', name: 'Date: Latest First', icon: <Calendar className="w-4 h-4" /> },
    { id: 'weight-low', name: 'Weight: Low to High', icon: <Scale className="w-4 h-4" /> },
    { id: 'weight-high', name: 'Weight: High to Low', icon: <Scale className="w-4 h-4" /> },
    { id: 'price-high', name: 'Price: High to Low', icon: <DollarSign className="w-4 h-4" /> }
  ];

  const goods = [
    {
      id: 1,
      business: "TechCorp Solutions",
      contact: "Sarah Johnson",
      cargoType: "Electronics",
      weight: "2,500 lbs",
      dimensions: "8' x 6' x 4'",
      pickupLocation: "New York, NY",
      deliveryLocation: "Los Angeles, CA",
      pickupDate: "2024-01-15",
      deliveryDate: "2024-01-18",
      price: 1800,
      priceDisplay: "$1,800",
      rating: 4.8,
      reviews: 45,
      verified: true,
      insurance: true,
      phone: "+1 (555) 123-4567",
      email: "sarah@techcorp.com",
      specialRequirements: "Temperature controlled, fragile handling",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      business: "Furniture World",
      contact: "Mike Chen",
      cargoType: "Furniture",
      weight: "3,200 lbs",
      dimensions: "12' x 8' x 6'",
      pickupLocation: "Los Angeles, CA",
      deliveryLocation: "Chicago, IL",
      pickupDate: "2024-01-18",
      deliveryDate: "2024-01-22",
      price: 2200,
      priceDisplay: "$2,200",
      rating: 4.7,
      reviews: 32,
      verified: true,
      insurance: true,
      phone: "+1 (555) 234-5678",
      email: "mike@furnitureworld.com",
      specialRequirements: "White glove delivery, assembly required",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      business: "Construction Supply Co.",
      contact: "David Wilson",
      cargoType: "Construction Materials",
      weight: "15,000 lbs",
      dimensions: "20' x 8' x 8'",
      pickupLocation: "Chicago, IL",
      deliveryLocation: "Houston, TX",
      pickupDate: "2024-01-20",
      deliveryDate: "2024-01-25",
      price: 3500,
      priceDisplay: "$3,500",
      rating: 4.9,
      reviews: 67,
      verified: true,
      insurance: true,
      phone: "+1 (555) 345-6789",
      email: "david@constructionsupply.com",
      specialRequirements: "Heavy equipment, loading assistance needed",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      business: "AgriFresh Farms",
      contact: "Lisa Rodriguez",
      cargoType: "Agricultural Products",
      weight: "8,500 lbs",
      dimensions: "16' x 8' x 8'",
      pickupLocation: "Houston, TX",
      deliveryLocation: "Phoenix, AZ",
      pickupDate: "2024-01-22",
      deliveryDate: "2024-01-26",
      price: 2800,
      priceDisplay: "$2,800",
      rating: 4.6,
      reviews: 28,
      verified: true,
      insurance: true,
      phone: "+1 (555) 456-7890",
      email: "lisa@agrifresh.com",
      specialRequirements: "Refrigerated transport, quick delivery",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      business: "Industrial Machinery Inc.",
      contact: "Robert Brown",
      cargoType: "Heavy Machinery",
      weight: "25,000 lbs",
      dimensions: "40' x 10' x 12'",
      pickupLocation: "Phoenix, AZ",
      deliveryLocation: "Denver, CO",
      pickupDate: "2024-01-25",
      deliveryDate: "2024-01-30",
      price: 5200,
      priceDisplay: "$5,200",
      rating: 4.8,
      reviews: 89,
      verified: true,
      insurance: true,
      phone: "+1 (555) 567-8901",
      email: "robert@industrialmachinery.com",
      specialRequirements: "Oversized load, escort required",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      business: "Retail Express",
      contact: "Jennifer Lee",
      cargoType: "Retail Goods",
      weight: "4,800 lbs",
      dimensions: "14' x 8' x 6'",
      pickupLocation: "Denver, CO",
      deliveryLocation: "Seattle, WA",
      pickupDate: "2024-01-28",
      deliveryDate: "2024-02-02",
      price: 3200,
      priceDisplay: "$3,200",
      rating: 4.7,
      reviews: 56,
      verified: true,
      insurance: true,
      phone: "+1 (555) 678-9012",
      email: "jennifer@retailexpress.com",
      specialRequirements: "Secure packaging, tracking required",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop"
    }
  ];

  // Filter goods based on search parameters and filters
  const filteredGoods = goods.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cargoType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCargoType = selectedCargoType === 'all' || item.cargoType.toLowerCase().includes(selectedCargoType);
    const matchesLocation = selectedLocation === 'all' || item.pickupLocation.toLowerCase().includes(selectedLocation);
    
    // Filter by homepage search parameters
    const matchesFrom = !fromLocation || item.pickupLocation.toLowerCase().includes(fromLocation.toLowerCase());
    const matchesTo = !toLocation || item.deliveryLocation.toLowerCase().includes(toLocation.toLowerCase());
    const matchesDate = !searchDate || item.pickupDate === searchDate;
    
    return matchesSearch && matchesCargoType && matchesLocation && matchesFrom && matchesTo && matchesDate;
  });

  // Sort goods based on selected sort option
  const sortedGoods = [...filteredGoods].sort((a, b) => {
    switch (sortBy) {
      case 'date-earliest':
        return new Date(a.pickupDate) - new Date(b.pickupDate);
      case 'date-latest':
        return new Date(b.pickupDate) - new Date(a.pickupDate);
      case 'weight-low':
        return parseInt(a.weight.replace(/,/g, '')) - parseInt(b.weight.replace(/,/g, ''));
      case 'weight-high':
        return parseInt(b.weight.replace(/,/g, '')) - parseInt(a.weight.replace(/,/g, ''));
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Update search parameters when filters change
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

  // Clear all filters
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
              Available Goods
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find goods that need transportation along your route. Connect with businesses and earn money.
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
              <label className="text-sm font-medium text-gray-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search businesses, contacts..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange('searchTerm', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
              </div>
            </div>

            {/* Cargo Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Cargo Type</label>
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
              <label className="text-sm font-medium text-gray-700">Location</label>
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
              <label className="text-sm font-medium text-gray-700">Sort By</label>
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
                Clear Filters
              </button>
            </div>
          </div>

          {/* Show search parameters from homepage */}
          {(fromLocation || toLocation || searchDate) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 p-4 bg-primary-green bg-opacity-10 rounded-lg border border-primary-green"
            >
              <div className="flex items-center gap-2 text-primary-green font-medium">
                <Filter className="w-4 h-4" />
                <span>Search Results for:</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm">
                {fromLocation && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    From: {fromLocation}
                  </span>
                )}
                {toLocation && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    To: {toLocation}
                  </span>
                )}
                {searchDate && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    Date: {searchDate}
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
              {sortedGoods.length} Good{sortedGoods.length !== 1 ? 's' : ''} Available
            </h2>
            <div className="text-gray-600">
              Showing {sortedGoods.length} of {goods.length} results
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
                        Verified
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

                    {/* Route Information - Prominently Displayed */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-primary-green">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Route</span>
                        <span className="text-xs text-gray-500">Pickup: {item.pickupDate}</span>
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
                          <strong>Special:</strong> {item.specialRequirements}
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
                        <div className="text-xs text-gray-500">Transport Fee</div>
                      </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Call
                      </button>
                      <button className="flex-1 bg-primary-orange text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
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
                        Get Directions
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
                No goods found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or check back later for new listings.
              </p>
              <button
                onClick={clearFilters}
                className="bg-primary-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AvailableGoods;

