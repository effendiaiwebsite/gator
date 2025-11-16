import { Mail, Phone, MapPin } from 'lucide-react';
import { GATOR_IMAGES } from '../../config/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={GATOR_IMAGES.LOGO}
                alt="Gator Logo"
                className="h-10 w-auto"
              />
              <h3 className="text-xl font-bold">Gator Bookkeeping</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional bookkeeping and payroll services helping Canadian businesses save thousands on taxes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-gray-400 hover:text-white transition-colors">
                  Tax Calculator
                </a>
              </li>
              <li>
                <a href="/portal" className="text-gray-400 hover:text-white transition-colors">
                  Client Portal
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Tax Preparation</li>
              <li>Bookkeeping</li>
              <li>Payroll Management</li>
              <li>Tax Planning</li>
              <li>Business Consulting</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail size={18} className="text-gator-green-light mt-0.5" />
                <a href="mailto:hello@gatorbookkeeping.ca" className="text-gray-400 hover:text-white transition-colors">
                  hello@gatorbookkeeping.ca
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone size={18} className="text-gator-green-light mt-0.5" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="text-gator-green-light mt-0.5" />
                <span className="text-gray-400">
                  Toronto, ON, Canada
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} Gator Bookkeeping & Payroll Services. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
