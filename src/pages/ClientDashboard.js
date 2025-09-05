import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Package, 
  Truck, 
  Calendar, 
  DollarSign, 
  Star, 
  TrendingUp,
  FileText,
  MessageSquare,
  MapPin,
  Weight,
  Truck as TruckIcon // Renamed to avoid conflict with existing Truck import
} from 'lucide-react';


const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [postedGoods, setPostedGoods] = useState([]);
  const [loadingGoods, setLoadingGoods] = useState(false);
  const [goodsError, setGoodsError] = useState(null);

  useEffect(() => {
    if (activeTab === 'shipments') {
      fetchPostedGoods();
    }
  }, [activeTab]);

  const fetchPostedGoods = async () => {
    setLoadingGoods(true);
    setGoodsError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const res = await axios.get('/api/goods/my-shipments', config);
      setPostedGoods(res.data);
    } catch (err) {
      console.error('Error fetching posted goods:', err);
      setGoodsError(err.response?.data?.msg || 'Failed to fetch shipments.');
    } finally {
      setLoadingGoods(false);
    }
  };

  const stats = [
    { 
      title: "Total Shipments", 
      value: "24", 
      change: "+12%", 
      icon: <Package className="w-6 h-6" />,
      color: "text-blue-600"
    },
    { 
      title: "Active Bookings", 
      value: "3", 
      change: "+1", 
      icon: <Truck className="w-6 h-6" />,
      color: "text-green-600"
    },
    { 
      title: "Total Spent", 
      value: "₹6,80,450", 
      change: "+8%", 
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-purple-600"
    },
    { 
      title: "Average Rating", 
      value: "4.7", 
      change: "+0.1", 
      icon: <Star className="w-6 h-6" />,
      color: "text-yellow-600"
    }
  ];

  const recentShipments = [
    {
      id: 1,
      from: "Mumbai, MH",
      to: "Delhi, DL",
      status: "Delivered",
      date: "2025-01-15",
      amount: "₹1,80,000",
      driver: "Rajesh Sharma",
      rating: 5,
      cargo: "Textiles"
    },
    {
      id: 2,
      from: "Bengaluru, KA",
      to: "Chennai, TN",
      status: "In Transit",
      date: "2025-01-18",
      amount: "₹95,000",
      driver: "Priya Nair",
      rating: 4,
      cargo: "Electronics"
    },
    {
      id: 3,
      from: "Hyderabad, TS",
      to: "Pune, MH",
      status: "Scheduled",
      date: "2025-01-25",
      amount: "₹1,20,500",
      driver: "Amit Verma",
      rating: 5,
      cargo: "Pharmaceuticals"
    }
  ];

  const upcomingBookings = [
    {
      id: 1,
      from: "Ahmedabad, GJ",
      to: "Surat, GJ",
      date: "2025-02-01",
      driver: "Neha Patel",
      amount: "₹75,000",
      cargo: "Garments"
    },
    {
      id: 2,
      from: "Kolkata, WB",
      to: "Patna, BR",
      date: "2025-02-05",
      driver: "Anil Kumar",
      amount: "₹1,40,000",
      cargo: "Spices & Dry Goods"
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'shipments', name: 'My Shipments', icon: <Package className="w-4 h-4" /> },
    { id: 'bookings', name: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
    { id: 'invoices', name: 'Invoices', icon: <FileText className="w-4 h-4" /> },
    { id: 'support', name: 'Support', icon: <MessageSquare className="w-4 h-4" /> }
  ];


  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'In Transit': return 'text-blue-600 bg-blue-100';
      case 'Scheduled': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* ---------- Header ---------- */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your shipments and bookings</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">Business Owner</p>
                <p className="text-sm text-gray-500">Premium Client</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- Tabs ---------- */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-green text-primary-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ---------- Dynamic Content (Overview, Shipments, Bookings, etc.) ---------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* ✅ Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ✅ Recent Shipments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Shipments</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentShipments.map((shipment, index) => (
                  <motion.div
                    key={shipment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">
                              {shipment.from} → {shipment.to}
                            </p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                              {shipment.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{shipment.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Package className="w-4 h-4" />
                              <span>{shipment.cargo}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{shipment.rating}/5</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{shipment.amount}</p>
                        <p className="text-sm text-gray-500">{shipment.driver}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ✅ Upcoming Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.from} → {booking.to}
                          </p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{booking.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Package className="w-4 h-4" />
                              <span>{booking.cargo}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{booking.amount}</p>
                        <p className="text-sm text-gray-500">{booking.driver}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* My Shipments Tab */}
        {activeTab === 'shipments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Shipments</h3>
            {loadingGoods && <p className="text-gray-600">Loading your shipments...</p>}
            {goodsError && <p className="text-red-500">Error: {goodsError}</p>}
            {!loadingGoods && postedGoods.length === 0 && !goodsError && (
              <p className="text-gray-500">You haven't posted any goods yet. Post a new request to see it here!</p>
            )}
            {!loadingGoods && postedGoods.length > 0 && (
              <div className="divide-y divide-gray-200">
                {postedGoods.map((good, index) => (
                  <motion.div
                    key={good._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">
                              {good.pickupLocation} → {good.deliveryLocation}
                            </p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor('Scheduled')}`}>
                              Scheduled
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(good.pickupDate).toLocaleDateString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Weight className="w-4 h-4" />
                              <span>{good.weight} kg</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <TruckIcon className="w-4 h-4" />
                              <span>{good.truckType || 'Any Type'}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{good.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{good.category}</p>
                        <p className="text-sm text-gray-500">Posted: {new Date(good.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Bookings</h3>
            <p className="text-gray-500">Current and past bookings in Indian routes will be displayed here.</p>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoices</h3>
            <p className="text-gray-500">GST-compliant billing and invoice information will be displayed here.</p>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            <p className="text-gray-500">Customer support for Indian clients will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
