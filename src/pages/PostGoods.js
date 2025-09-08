import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  MapPin, 
  DollarSign, 
  FileText, 
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const PostGoods = () => {
  const { t } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: '',
    description: '',
    category: '',
    weight: '',
    dimensions: '',
    
    // Step 2: Location & Timing
    pickupLocation: '',
    deliveryLocation: '',
    pickupDate: '',
    deliveryDate: '',
    isUrgent: false,
    
    // Step 3: Requirements & Budget
    truckType: '',
    specialRequirements: '',
    budget: '',
    paymentTerms: '',
    
    // Step 4: Contact Information
    contactName: '',
    company: '',
    email: '',
    phone: '',
    additionalNotes: ''
  });

  const categories = [
    t('electronics'),
    t('furniture'),
    t('heavyMachinery'),
    t('foodBeverages'),
    t('constructionMaterials'),
    t('automotiveParts'),
    t('textiles'),
    t('chemicals'),
    t('other')
  ];

  const truckTypes = [
    t('boxTruck'),
    t('flatbed'),
    t('refrigerated'),
    t('tanker'),
    t('container'),
    t('anyType')
  ];

  const paymentTerms = [
    t('immediatePayment'),
    t('net30'),
    t('net60'),
    t('uponDelivery'),
    t('negotiable')
  ];

  const steps = [
    { number: 1, title: t('goodsInformation'), icon: <Package className="w-5 h-5" /> },
    { number: 2, title: t('locationTiming'), icon: <MapPin className="w-5 h-5" /> },
    { number: 3, title: t('requirementsBudget'), icon: <DollarSign className="w-5 h-5" /> },
    { number: 4, title: t('contactDetails'), icon: <FileText className="w-5 h-5" /> }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with backend to post the data
    console.log('Form submitted:', formData);
    alert(t('postRequestSuccess'));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('requestTitle')} *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder={t('requestTitlePlaceholder')}
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('description')} *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder={t('descriptionPlaceholder')}
          rows={4}
          className="input-field"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('category')} *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="input-field"
            required
          >
            <option value="">{t('selectCategory')}</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('weightKg')} *
          </label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder={t('weightPlaceholder')}
            className="input-field"
            required
            min={1}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('dimensionsFeet')}
        </label>
        <input
          type="text"
          value={formData.dimensions}
          onChange={(e) => handleInputChange('dimensions', e.target.value)}
          placeholder={t('dimensionsPlaceholder')}
          className="input-field"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('pickupLocation')} *
          </label>
          <input
            type="text"
            value={formData.pickupLocation}
            onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
            placeholder={t('pickupLocationPlaceholder')}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('deliveryLocation')} *
          </label>
          <input
            type="text"
            value={formData.deliveryLocation}
            onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
            placeholder={t('deliveryLocationPlaceholder')}
            className="input-field"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('pickupDate')} *
          </label>
          <input
            type="date"
            value={formData.pickupDate}
            onChange={(e) => handleInputChange('pickupDate', e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('deliveryDate')}
          </label>
          <input
            type="date"
            value={formData.deliveryDate}
            onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
            className="input-field"
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
          {t('urgentDeliveryRequired')}
        </label>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('preferredTruckType')}
        </label>
        <select
          value={formData.truckType}
          onChange={(e) => handleInputChange('truckType', e.target.value)}
          className="input-field"
        >
          <option value="">{t('selectTruckType')}</option>
          {truckTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('specialRequirements')}
        </label>
        <textarea
          value={formData.specialRequirements}
          onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
          placeholder={t('specialRequirementsPlaceholder')}
          rows={3}
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('budgetRange')}
          </label>
          <input
            type="text"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            placeholder={t('budgetPlaceholder')}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('paymentTerms')}
          </label>
          <select
            value={formData.paymentTerms}
            onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
            className="input-field"
          >
            <option value="">{t('selectPaymentTerms')}</option>
            {paymentTerms.map(term => (
              <option key={term} value={term}>{term}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contactName')} *
          </label>
          <input
            type="text"
            value={formData.contactName}
            onChange={(e) => handleInputChange('contactName', e.target.value)}
            placeholder={t('yourFullName')}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('companyName')}
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder={t('yourCompanyName')}
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('emailAddress')} *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={t('yourEmailExample')}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('phoneNumber')} *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder={t('phonePlaceholder')}
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('additionalNotes')}
        </label>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
          placeholder={t('additionalNotesPlaceholder')}
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
              {t('postYourGoods')}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t('postGoodsDescription')}
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
                  <span>{t('previous')}</span>
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <span>{t('next')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <span>{t('postRequest')}</span>
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
                  {t('tipsForBetterResponses')}
                </h3>
                <ul className="text-blue-800 space-y-1 text-sm list-disc list-inside">
                  <li>{t('tip1')}</li>
                  <li>{t('tip2')}</li>
                  <li>{t('tip3')}</li>
                  <li>{t('tip4')}</li>
                  <li>{t('tip5')}</li>
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
