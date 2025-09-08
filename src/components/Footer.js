import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const Footer = () => {
  const { t } = useUser();
  return (
    <footer className="bg-primary-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-orange rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">{t('transpoLinkBharat')}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('smartMoves')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-orange transition-colors duration-200" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-orange transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/transpolink_bharat?utm_source=qr&igsh=cXFvdW81eHBueW54" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-orange transition-colors duration-200" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-orange transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-orange transition-colors duration-200 text-sm">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/trucks" className="text-gray-300 hover:text-primary-orange transition-colors duration-200 text-sm">
                  {t('trucks')}
                </Link>
              </li>
              <li>
                <Link to="/post-goods" className="text-gray-300 hover:text-primary-orange transition-colors duration-200 text-sm">
                  {t('postGoods')}
                </Link>
              </li>
              <li>
                <Link to="/driver-dashboard" className="text-gray-300 hover:text-primary-orange transition-colors duration-200 text-sm">
                  {t('driverDashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('services')}</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">{t('expressDelivery')}</li>
              <li className="text-gray-300 text-sm">{t('bulkTransport')}</li>
              <li className="text-gray-300 text-sm">{t('refrigeratedTransport')}</li>
              <li className="text-gray-300 text-sm">{t('heavyEquipment')}</li>
              <li className="text-gray-300 text-sm">{t('crossCountryShipping')}</li>
              <li className="text-gray-300 text-sm">{t('realtimeTracking')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('contactUs')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-orange" />
                <span className="text-gray-300 text-sm">{t('address')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-orange" />
                <span className="text-gray-300 text-sm">+91 99310 82500</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-orange" />
                <a href="mailto:transpolinkbharat@gmail.com" className="text-gray-300 text-sm hover:text-primary-orange transition-colors duration-200 cursor-pointer font-medium hover:underline">
                  transpolinkbharat@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
