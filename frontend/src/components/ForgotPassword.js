import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Smartphone } from 'lucide-react';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';

const ForgotPassword = ({ isOpen, onClose, language }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!email.trim() && !phone.trim()) {
      newErrors.general = language === 'hi' 
        ? 'कृपया ईमेल या मोबाइल नंबर दर्ज करें' 
        : 'Please enter email or mobile number';
    } else if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = language === 'hi' 
        ? 'कृपया एक वैध ईमेल पता दर्ज करें' 
        : 'Please enter a valid email address';
    } else if (phone && !/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = language === 'hi' 
        ? 'कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें' 
        : 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (!otp) {
      setErrors({
        otp: language === 'hi' 
          ? 'कृपया OTP दर्ज करें' 
          : 'Please enter OTP'
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!newPassword) {
      newErrors.newPassword = language === 'hi' 
        ? 'नया पासवर्ड आवश्यक है' 
        : 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = language === 'hi' 
        ? 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए' 
        : 'Password must be at least 6 characters';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = language === 'hi' 
        ? 'पासवर्ड मेल नहीं खाते' 
        : 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateStep1()) return;
    
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email: email || undefined, phone: phone || undefined });
      setOtpSent(true);
      toast.success(language === 'hi' 
        ? 'OTP सफलतापूर्वक भेजा गया' 
        : 'OTP sent successfully');
      setStep(2);
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(error.message || (language === 'hi' 
        ? 'OTP भेजने में त्रुटि' 
        : 'Error sending OTP'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!validateStep2()) return;
    
    setLoading(true);
    try {
      await authAPI.verifyOtp({ 
        email: email || undefined, 
        phone: phone || undefined, 
        otp 
      });
      setOtpVerified(true);
      toast.success(language === 'hi' 
        ? 'OTP सत्यापित किया गया' 
        : 'OTP verified successfully');
      setStep(3);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error(error.message || (language === 'hi' 
        ? 'OTP सत्यापन विफल' 
        : 'OTP verification failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validateStep3()) return;
    
    setLoading(true);
    try {
      await authAPI.resetPassword({ 
        email: email || undefined, 
        phone: phone || undefined, 
        otp,
        newPassword 
      });
      
      toast.success(language === 'hi' 
        ? 'पासवर्ड सफलतापूर्वक रीसेट किया गया' 
        : 'Password reset successfully');
      
      // Reset form and close modal
      setEmail('');
      setPhone('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setStep(1);
      setOtpSent(false);
      setOtpVerified(false);
      onClose();
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error(error.message || (language === 'hi' 
        ? 'पासवर्ड रीसेट करने में त्रुटि' 
        : 'Error resetting password'));
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {language === 'hi' ? 'पासवर्ड रीसेट करें' : 'Reset Password'}
      </h2>
      
      <p className="text-gray-600 mb-6">
        {language === 'hi' 
          ? 'पासवर्ड रीसेट करने के लिए कृपया अपना ईमेल या मोबाइल नंबर दर्ज करें।' 
          : 'Please enter your email or mobile number to reset your password.'}
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {language === 'hi' ? 'ईमेल' : 'Email'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder={language === 'hi' ? 'आपका ईमेल' : 'your.email@example.com'}
              disabled={loading || phone}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          
          <div className="my-4 text-center text-sm text-gray-500">
            {language === 'hi' ? 'या' : 'OR'}
          </div>
          
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Smartphone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
              className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder={language === 'hi' ? 'आपका मोबाइल नंबर' : 'Your 10-digit mobile number'}
              disabled={loading || email}
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        
        {errors.general && (
          <div className="text-sm text-red-600 bg-red-50 py-2 px-3 rounded-md">
            {errors.general}
          </div>
        )}
        
        <div className="mt-6">
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading || (!email && !phone)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : language === 'hi' ? (
              'OTP भेजें'
            ) : (
              'Send OTP'
            )}
          </button>
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {language === 'hi' ? 'OTP सत्यापित करें' : 'Verify OTP'}
      </h2>
      
      <p className="text-gray-600 mb-6">
        {language === 'hi' 
          ? `हमने आपके ${email ? 'ईमेल' : 'मोबाइल नंबर'} पर एक OTP भेजा है। कृपया इसे नीचे दर्ज करें।` 
          : `We've sent an OTP to your ${email ? 'email' : 'mobile number'}. Please enter it below.`}
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
            OTP
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
              errors.otp ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter 6-digit OTP"
            disabled={loading}
          />
          {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {language === 'hi' ? 'पीछे जाएं' : 'Go Back'}
          </button>
          
          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={loading || !otp}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : language === 'hi' ? (
              'सत्यापित करें'
            ) : (
              'Verify'
            )}
          </button>
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {language === 'hi' ? 'नया पासवर्ड सेट करें' : 'Set New Password'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            {language === 'hi' ? 'नया पासवर्ड' : 'New Password'}
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
              errors.newPassword ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={language === 'hi' ? 'नया पासवर्ड दर्ज करें' : 'Enter new password'}
            disabled={loading}
          />
          {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            {language === 'hi' ? 'पासवर्ड की पुष्टि करें' : 'Confirm Password'}
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
              errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={language === 'hi' ? 'पासवर्ड की पुष्टि करें' : 'Confirm your password'}
            disabled={loading}
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>
        
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {language === 'hi' ? 'पीछे जाएं' : 'Go Back'}
          </button>
          
          <button
            type="button"
            onClick={handleResetPassword}
            disabled={loading || !newPassword || !confirmPassword}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : language === 'hi' ? (
              'पासवर्ड रीसेट करें'
            ) : (
              'Reset Password'
            )}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </motion.div>

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {/* Close button */}
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Modal content */}
              <div className="mt-6">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ForgotPassword;
