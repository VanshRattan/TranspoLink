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

const Footer = () => {
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
              <span className="text-xl font-bold">TranspoLink</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Smart moves for your business — fast, reliable, nationwide transport at your fingertips
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-300 hover:text-primary-orange transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-gray-300 hover:text-primary-orange transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="text-gray-300 hover:text-primary-orange transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="text-gray-300 hover:text-primary-orange transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-orange transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/trucks" className="text-gray-300 hover:text-primary-orange transition-colors duration-200 text-sm">
                  Available Trucks
                </Link>
              </li>
              <li>
                <Link to="/post-goods" className="text-gray-300 hover:text-primary-orange transition-colors duration-200 text-sm">
                  Post Goods
                </Link>
              </li>
              <li>
                <Link to="/driver-dashboard" className="text-gray-300 hover:text-primary-orange transition-colors duration-200 text-sm">
                  Driver Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-orange transition-colors duration-200 text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Express Delivery</li>
              <li className="text-gray-300 text-sm">Bulk Transport</li>
              <li className="text-gray-300 text-sm">Refrigerated Transport</li>
              <li className="text-gray-300 text-sm">Heavy Equipment</li>
              <li className="text-gray-300 text-sm">Cross-Country Shipping</li>
              <li className="text-gray-300 text-sm">Real-time Tracking</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-orange" />
                <span className="text-gray-300 text-sm">Hostel A, Thapar University, 147004</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-orange" />
                <span className="text-gray-300 text-sm">+91 99310 82500</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-orange" />
                <span className="text-gray-300 text-sm">vanshrattan2006@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
