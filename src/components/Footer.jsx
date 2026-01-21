import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-red-900/30 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              FITZONE
            </h3>
            <p className="text-gray-400">
              Your ultimate destination for fitness and wellness. Transform your body, transform your life.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/programs" className="text-gray-400 hover:text-red-500 transition-colors">Programs</Link></li>
              <li><Link to="/trainers" className="text-gray-400 hover:text-red-500 transition-colors">Trainers</Link></li>
              <li><Link to="/membership" className="text-gray-400 hover:text-red-500 transition-colors">Membership</Link></li>
              <li><Link to="/bmi-calculator" className="text-gray-400 hover:text-red-500 transition-colors">BMI Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>123 Fitness Street, Health City</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span>info@fitzone.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-red-900/30 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FITZONE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
