import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Package, 
  MapPin, 
  FileText, 
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Globe,
  Map,
  Home,
  Hash
} from 'lucide-react';
import indianStatesAndDistricts from '../data/indianStatesAndDistricts.json';

const PostGoods = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: '',
    description: '',
    category: '',
    weight: '',
    dimensions: '',
    
    // Step 2: Location & Timing
    pickupLocation: {
      state: '',
      district: '',
      city: '',
      pincode: ''
    },
    deliveryLocation: {
      state: '',
      district: '',
      city: '',
      pincode: ''
    },
    pickupDate: '',
    isUrgent: false,
    
    // Step 3: Requirements & Budget
    truckType: '',
    specialRequirements: '',
    
    // Step 4: Contact Information
    contactName: '',
    company: '',
    email: '',
    phone: '',
    additionalNotes: ''
  });

  const categories = [
    'Electronics',
    'Furniture',
    'Machinery',
    'Food & Beverages',
    'Construction Materials',
    'Automotive Parts',
    'Textiles',
    'Chemicals',
    'Other'
  ];

  const truckTypes = [
    'Tempo/Van (Tata Ace, Mahindra Jeeto)',
    'Mini Truck (Tata 407, Eicher Pro 1049)',
    'Light Commercial Vehicle (LCV)',
    'Medium Commercial Vehicle (MCV)',
    'Heavy Commercial Vehicle (HCV)',
    'Multi-Axle Truck',
    'Trailer (Flatbed, Semi-Low Bed, Low Bed)',
    'Container Truck',
    'Tipper Truck',
    'Tanker Truck',
    'Refrigerated Truck',
    'Open Truck',
    'Any Type'
  ];


  const steps = [
    { number: 1, title: 'Goods Information', icon: <Package className="w-5 h-5" /> },
    { number: 2, title: 'Location & Timing', icon: <MapPin className="w-5 h-5" /> },
    { number: 3, title: 'Requirements', icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: 'Contact Details', icon: <FileText className="w-5 h-5" /> }
  ];

  const handleInputChange = (field, value, locationType = null) => {
    if (locationType) {
      setFormData(prev => ({
        ...prev,
        [locationType]: {
          ...prev[locationType],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const res = await axios.post('/api/goods', {
        ...formData,
        pickupLocation: `${formData.pickupLocation.city}, ${formData.pickupLocation.district}, ${formData.pickupLocation.state} - ${formData.pickupLocation.pincode}`,
        deliveryLocation: `${formData.deliveryLocation.city}, ${formData.deliveryLocation.district}, ${formData.deliveryLocation.state} - ${formData.deliveryLocation.pincode}`,
      }, config);
      console.log('Goods posted successfully:', res.data);
      alert('Your transport request has been posted successfully! A confirmation email has been sent.');
      navigate('/client-dashboard'); // Redirect to client dashboard after successful post
    } catch (err) {
      console.error('Error posting goods:', err);
      setError(err.response?.data?.errors?.[0]?.msg || 'Failed to post goods. Please try again.');
      alert('Failed to post goods. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Request Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., Electronics shipment from Mumbai to Delhi"
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your goods in detail..."
          rows={4}
          className="input-field"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg) *
          </label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder="e.g., 5000"
            className="input-field"
            required
            min={1}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dimensions (L x W x H) (in feet)
        </label>
        <input
          type="text"
          value={formData.dimensions}
          onChange={(e) => handleInputChange('dimensions', e.target.value)}
          placeholder="e.g., 20' x 8' x 8'"
          className="input-field"
        />
      </div>
    </div>
  );

  const renderStep2 = () => {
    const states = indianStatesAndDistricts.map(item => item.state);
    const pickupDistricts = formData.pickupLocation.state
      ? indianStatesAndDistricts.find(item => item.state === formData.pickupLocation.state)?.districts || []
      : [];
    const deliveryDistricts = formData.deliveryLocation.state
      ? indianStatesAndDistricts.find(item => item.state === formData.deliveryLocation.state)?.districts || []
      : [];

    const handlePincodeLookup = async (pincode, locationType) => {
      if (pincode.length === 6) {
        // This is a simplified lookup. In a real app, you'd call an external API.
        // For now, we'll try to find a matching state/district from our local data.
        let foundState = '';
        let foundDistrict = '';
        // This is a very basic lookup and won't be accurate for all pincodes.
        // A real implementation would use a pincode API.
        for (const stateData of indianStatesAndDistricts) {
          if (stateData.districts.some(d => d.toLowerCase().includes(pincode.substring(0,2)))) { // Very crude example
            foundState = stateData.state;
            // Just pick the first district for simplicity in this demo
            foundDistrict = stateData.districts[0]; 
            break;
          }
        }

        setFormData(prev => ({
          ...prev,
          [locationType]: {
            ...prev[locationType],
            state: foundState,
            district: foundDistrict,
            city: '', // City cannot be reliably determined from local data
            pincode: pincode
          }
        }));
      }
    };

    return (
      <div className="space-y-6">
        {/* Pickup Location */}
        <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary-green" />
            <span>Pickup Location *</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                value={formData.pickupLocation.state}
                onChange={(e) => handleInputChange('state', e.target.value, 'pickupLocation')}
                className="input-field"
                required
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <select
                value={formData.pickupLocation.district}
                onChange={(e) => handleInputChange('district', e.target.value, 'pickupLocation')}
                className="input-field"
                required
                disabled={!formData.pickupLocation.state}
              >
                <option value="">Select District</option>
                {pickupDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.pickupLocation.city}
                onChange={(e) => handleInputChange('city', e.target.value, 'pickupLocation')}
                placeholder="e.g., Mumbai"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                value={formData.pickupLocation.pincode}
                onChange={(e) => {
                  handleInputChange('pincode', e.target.value, 'pickupLocation');
                  handlePincodeLookup(e.target.value, 'pickupLocation');
                }}
                placeholder="e.g., 400001"
                className="input-field"
                maxLength={6}
                required
              />
            </div>
          </div>
        </div>

        {/* Delivery Location */}
        <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary-green" />
            <span>Delivery Location *</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                value={formData.deliveryLocation.state}
                onChange={(e) => handleInputChange('state', e.target.value, 'deliveryLocation')}
                className="input-field"
                required
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <select
                value={formData.deliveryLocation.district}
                onChange={(e) => handleInputChange('district', e.target.value, 'deliveryLocation')}
                className="input-field"
                required
                disabled={!formData.deliveryLocation.state}
              >
                <option value="">Select District</option>
                {deliveryDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.deliveryLocation.city}
                onChange={(e) => handleInputChange('city', e.target.value, 'deliveryLocation')}
                placeholder="e.g., Delhi"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                value={formData.deliveryLocation.pincode}
                onChange={(e) => {
                  handleInputChange('pincode', e.target.value, 'deliveryLocation');
                  handlePincodeLookup(e.target.value, 'deliveryLocation');
                }}
                placeholder="e.g., 110001"
                className="input-field"
                maxLength={6}
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Date *
            </label>
            <input
              type="date"
              value={formData.pickupDate}
              onChange={(e) => handleInputChange('pickupDate', e.target.value)}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isUrgent"
            checked={formData.isUrgent}
            onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
            className="w-4 h-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
          />
          <label htmlFor="isUrgent" className="text-sm font-medium text-gray-700">
            Urgent delivery required
          </label>
        </div>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Indian Truck Type
        </label>
        <select
          value={formData.truckType}
          onChange={(e) => handleInputChange('truckType', e.target.value)}
          className="input-field"
        >
          <option value="">Select Truck Type</option>
          {truckTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Requirements
        </label>
        <textarea
          value={formData.specialRequirements}
          onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
          placeholder="e.g., Temperature control, fragile handling, etc."
          rows={3}
          className="input-field"
        />
      </div>

    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Name *
          </label>
          <input
            type="text"
            value={formData.contactName}
            onChange={(e) => handleInputChange('contactName', e.target.value)}
            placeholder="Your full name"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="Your company name"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
          placeholder="Any additional information or special instructions..."
          rows={3}
          className="input-field"
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="gradient-bg text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Post Your Goods
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Connect with reliable drivers by posting your transport request. 
              Get competitive quotes and choose the best option for your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card bg-white p-8 rounded-lg shadow"
          >
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.number
                        ? 'bg-primary-green border-primary-green text-white'
                        : 'border-gray-300 text-gray-500'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div className="ml-3">
                      <div className={`text-sm font-medium ${
                        currentStep >= step.number ? 'text-primary-green' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.number ? 'bg-primary-green' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    currentStep === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-primary-green'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <span>Post Request</span>
                    <Upload className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Tips Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 card bg-blue-50 border-blue-200 p-6 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Tips for Better Responses
                </h3>
                <ul className="text-blue-800 space-y-1 text-sm list-disc list-inside">
                  <li>Provide detailed descriptions of your goods</li>
                  <li>Include accurate weight and dimensions (in kg and feet)</li>
                  <li>Be specific about pickup and delivery locations</li>
                  <li>Respond promptly to driver inquiries</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PostGoods;
