import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  Truck,
  MapPin,
  Calendar,
  Package,
  Star,
  Filter,
  Search,
  Phone,
  Mail,
  Shield,
  ArrowUpDown,
  DollarSign,
  Navigation,
} from "lucide-react";
import { useUser } from '../context/UserContext';

const AvailableTrucks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const { t } = useUser();

  // Get search parameters from URL (from homepage search)
  const fromLocation = searchParams.get("from") || "";
  const toLocation = searchParams.get("to") || "";
  const searchDate = searchParams.get("date") || "";
  const searchCargoType = searchParams.get("cargoType") || "";

  const truckTypes = [
    { id: "all", name: t('allTypes') },
    { id: "box", name: t('boxTruck') },
    { id: "flatbed", name: t('flatbed') },
    { id: "refrigerated", name: t('refrigerated') },
    { id: "tanker", name: t('tanker') },
    { id: "container", name: t('container') },
  ];
  const locations = [
    { id: "all", name: t('allLocations') },
    { id: "mumbai", name: t('mumbai') },
    { id: "delhi", name: t('delhi') },
    { id: "chennai", name: t('chennai') },
    { id: "bangalore", name: t('bangalore') },
    { id: "hyderabad", name: t('hyderabad') },
  ];
  const sortOptions = [
    {
      id: "price-low",
      name: t('priceLowToHigh'),
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      id: "price-high",
      name: t('priceHighToLow'),
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      id: "date-earliest",
      name: t('dateEarliestFirst'),
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "date-latest",
      name: t('dateLatestFirst'),
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "rating",
      name: t('highestRating'),
      icon: <Star className="w-4 h-4" />,
    },
  ];

  const trucks = [
    {
      id: 1,
      driver: "Ravi Kumar",
      company: "Kumar Transport Pvt. Ltd.",
      type: t('boxTruck'),
      capacity: "10,000 kgs",
      dimensions: "24' x 8' x 8'",
      location: t('mumbai') + ", Maharashtra",
      destination: t('delhi') + ", Delhi",
      availableDate: "2024-01-15",
      price: 45000,
      priceDisplay: "₹45,000",
      rating: 4.8,
      reviews: 127,
      verified: true,
      insurance: true,
      phone: "+91 98765 43210",
      email: "ravi.kumar@kumartransport.in",
      image:
        "https://images.unsplash.com/photo-1618238571957-035cbf8aaebe?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      driver: "Anita Singh",
      company: "Singh Refrigerated Logistics",
      type: t('refrigerated'),
      capacity: "15,000 kgs",
      dimensions: "26' x 8' x 8'",
      location: t('chennai') + ", Tamil Nadu",
      destination: t('bangalore') + ", Karnataka",
      availableDate: "2024-01-18",
      price: 51000,
      priceDisplay: "₹51,000",
      rating: 4.9,
      reviews: 89,
      verified: true,
      insurance: true,
      phone: "+91 99887 66554",
      email: "anita.singh@singhrefrigerated.in",
      image:
        "https://images.unsplash.com/photo-1618249271669-3539c5e591f4?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      driver: "Sunil Patel",
      company: "Patel Hauling Services",
      type: t('flatbed'),
      capacity: "20,000 kgs",
      dimensions: "48' x 8.5'",
      location: "Ahmedabad, Gujarat",
      destination: "Pune, Maharashtra",
      availableDate: "2024-01-20",
      price: 47000,
      priceDisplay: "₹47,000",
      rating: 4.7,
      reviews: 156,
      verified: true,
      insurance: true,
      phone: "+91 97654 32109",
      email: "sunil.patel@patelhauling.in",
      image:
        "https://images.unsplash.com/photo-1656016232251-bc49e0e7de72?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      driver: "Priya Sharma",
      company: "Sharma Container Freight",
      type: t('container'),
      capacity: "25,000 kgs",
      dimensions: "40' x 8' x 8.5'",
      location: t('kolkata') + ", West Bengal",
      destination: t('hyderabad') + ", Telangana",
      availableDate: "2024-01-22",
      price: 53000,
      priceDisplay: "₹53,000",
      rating: 4.6,
      reviews: 203,
      verified: true,
      insurance: true,
      phone: "+91 98712 34567",
      email: "priya.sharma@sharmacontainer.in",
      image:
        "https://images.unsplash.com/photo-1642522539288-39cf41a059f7?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      driver: "Rohit Verma",
      company: "Verma Tanker Services",
      type: t('tanker'),
      capacity: "30,000 kgs",
      dimensions: "32' x 8' x 8'",
      location: "Jaipur, Rajasthan",
      destination: "Surat, Gujarat",
      availableDate: "2024-01-25",
      price: 60000,
      priceDisplay: "₹60,000",
      rating: 4.8,
      reviews: 178,
      verified: true,
      insurance: true,
      phone: "+91 95432 19876",
      email: "rohit.verma@vermatanker.in",
      image:
        "https://images.unsplash.com/photo-1657932338664-824cc0aec19e?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      driver: "Neha Desai",
      company: "Desai Transport Services",
      type: t('boxTruck'),
      capacity: "12,000 kgs",
      dimensions: "26' x 8' x 8'",
      location: "Lucknow, Uttar Pradesh",
      destination: "Indore, Madhya Pradesh",
      availableDate: "2024-01-28",
      price: 48000,
      priceDisplay: "₹48,000",
      rating: 4.9,
      reviews: 145,
      verified: true,
      insurance: true,
      phone: "+91 99823 45678",
      email: "neha.desai@desaitransport.in",
      image:
        "https://images.unsplash.com/photo-1603787104975-6e2ff8b3241d?w=400&h=300&fit=crop",
    },
  ];

  // Filter trucks based on search parameters and filters
  const filteredTrucks = trucks.filter((truck) => {
    const matchesSearch =
      searchTerm === "" ||
      truck.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "all" || truck.type.toLowerCase().includes(selectedType);
    const matchesLocation =
      selectedLocation === "all" ||
      truck.location.toLowerCase().includes(selectedLocation);

    const matchesFrom =
      !fromLocation ||
      truck.location.toLowerCase().includes(fromLocation.toLowerCase());
    const matchesTo =
      !toLocation ||
      truck.destination.toLowerCase().includes(toLocation.toLowerCase());
    const matchesDate = !searchDate || truck.availableDate === searchDate;

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesFrom &&
      matchesTo &&
      matchesDate
    );
  });

  // Sort trucks based on selected sort option
  const sortedTrucks = [...filteredTrucks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "date-earliest":
        return new Date(a.availableDate) - new Date(b.availableDate);
      case "date-latest":
        return new Date(b.availableDate) - new Date(a.availableDate);
      case "rating":
        return b.rating - a.rating;
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
    if (field === "searchTerm") {
      setSearchTerm(value);
    } else if (field === "selectedType") {
      setSelectedType(value);
      updateSearchParams({ type: value });
    } else if (field === "selectedLocation") {
      setSelectedLocation(value);
      updateSearchParams({ location: value });
    } else if (field === "sortBy") {
      setSortBy(value);
      updateSearchParams({ sort: value });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedLocation("all");
    setSortBy("price-low");
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
              {t('availableTrucks')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('findTrucksDescription')}
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
              <label className="text-sm font-medium text-gray-700">
                {t('search')}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('searchDriversCompanies')}
                  value={searchTerm}
                  onChange={(e) =>
                    handleSearchChange("searchTerm", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
              </div>
            </div>
            {/* Truck Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t('truckType')}
              </label>
              <select
                value={selectedType}
                onChange={(e) =>
                  handleSearchChange("selectedType", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              >
                {truckTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t('location')}
              </label>
              <select
                value={selectedLocation}
                onChange={(e) =>
                  handleSearchChange("selectedLocation", e.target.value)
                }
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
              <label className="text-sm font-medium text-gray-700">
                {t('sortBy')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleSearchChange("sortBy", e.target.value)}
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
          {(fromLocation || toLocation || searchDate || searchCargoType) && (
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
                {searchCargoType && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    {t('cargoType')}: {searchCargoType}
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
              {sortedTrucks.length} {t('trucksAvailable')}
            </h2>
            <div className="text-gray-600">
              {t('showingResults')
                .replace('{count}', sortedTrucks.length)
                .replace('{total}', trucks.length)}
            </div>
          </div>
          {/* Trucks Grid */}
          {sortedTrucks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTrucks.map((truck, index) => (
                <motion.div
                  key={truck.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Truck Image */}
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={truck.image}
                      alt={`${truck.type} truck`}
                      className="w-full h-full object-cover"
                    />
                    {truck.verified && (
                      <div className="absolute top-3 right-3 bg-primary-green text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {t('verified')}
                      </div>
                    )}
                  </div>
                  {/* Truck Details */}
                  <div className="p-6">
                    {/* Driver and Company */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {truck.driver}
                      </h3>
                      <p className="text-gray-600">{truck.company}</p>
                    </div>
                    {/* Route Information */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-primary-green">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {t('route')}
                        </span>
                        <span className="text-xs text-gray-500">
                          {t('available')}: {truck.availableDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-900">
                        <MapPin className="w-4 h-4 text-primary-green" />
                        <span className="font-medium">{truck.location}</span>
                        <ArrowUpDown className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{truck.destination}</span>
                      </div>
                    </div>
                    {/* Truck Specifications */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="w-4 h-4" />
                        <span>{truck.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package className="w-4 h-4" />
                        <span>
                          {truck.capacity} • {truck.dimensions}
                        </span>
                      </div>
                    </div>
                    {/* Rating and Price */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(truck.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {truck.rating} ({truck.reviews})
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-green">
                          {truck.priceDisplay}
                        </div>
                        <div className="text-xs text-gray-500">{t('totalPrice')}</div>
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
                          const pickupLocation = encodeURIComponent(
                            truck.location
                          );
                          const destination = encodeURIComponent(
                            truck.destination
                          );
                          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${pickupLocation}&destination=${destination}&travelmode=driving`;
                          window.open(googleMapsUrl, "_blank");
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
              <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('noTrucksFound')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('noTrucksFoundDescription')}
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

export default AvailableTrucks;
