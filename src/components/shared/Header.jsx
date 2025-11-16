import { useState } from 'react';
import { Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GATOR_IMAGES } from '../../config/constants';
import LanguageToggle from './LanguageToggle';
import { useAuth } from '../../hooks/useAuth.jsx';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { isAuthenticated, signOut, user } = useAuth();
  const navigate = useNavigate();

  const handlePortalClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/portal');
    } else {
      navigate('/sign-in');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src={GATOR_IMAGES.LOGO}
              alt="Gator Bookkeeping Logo"
              className="h-14 w-14 object-contain"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold text-navy leading-tight">Gator Bookkeeping</h1>
              <p className="text-xs text-gray-600 leading-tight">& Payroll Services</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-gator-green-dark transition-colors font-medium">
                Services <ChevronDown size={16} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-white shadow-xl rounded-lg border border-gray-200 py-2 min-w-[240px]">
                    <a href="/services" className="block px-4 py-2 text-gray-700 hover:bg-gator-green/10 hover:text-gator-green-dark transition-colors">
                      <span className="font-semibold">All Services</span>
                    </a>
                  <div className="border-t border-gray-200 my-2"></div>
                  <a href="/services/individual" className="block px-4 py-2 text-gray-700 hover:bg-gator-green/10 hover:text-gator-green-dark transition-colors">
                    Individual Tax Returns
                  </a>
                  <a href="/services/corporate" className="block px-4 py-2 text-gray-700 hover:bg-gator-green/10 hover:text-gator-green-dark transition-colors">
                    Corporate Tax (T2)
                  </a>
                  <a href="/services/bookkeeping" className="block px-4 py-2 text-gray-700 hover:bg-gator-green/10 hover:text-gator-green-dark transition-colors">
                    Bookkeeping & Accounting
                  </a>
                  <a href="/services/payroll" className="block px-4 py-2 text-gray-700 hover:bg-gator-green/10 hover:text-gator-green-dark transition-colors">
                    Payroll Services
                  </a>
                  <a href="/services/audit" className="block px-4 py-2 text-gray-700 hover:bg-gator-green/10 hover:text-gator-green-dark transition-colors">
                    CRA Audit Assistance
                  </a>
                  <a href="/services/lmia" className="block px-4 py-2 text-gray-700 hover:bg-gator-green/10 hover:text-gator-green-dark transition-colors">
                    LMIA & Immigration Support
                  </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/pricing" className="text-gray-700 hover:text-gator-green-dark transition-colors font-medium">
              Pricing
            </a>
            <a href="/learn" className="text-gray-700 hover:text-gator-green-dark transition-colors font-medium">
              Knowledge Hub
            </a>
            <a href="/about" className="text-gray-700 hover:text-gator-green-dark transition-colors font-medium">
              About Us
            </a>
            <LanguageToggle />
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">
                  Hi, {user?.firstName || 'there'}!
                </span>
                <button onClick={handlePortalClick} className="btn-primary">
                  My Portal
                </button>
                <button onClick={handleSignOut} className="btn-secondary flex items-center">
                  <LogOut size={18} className="mr-1" />
                  Sign Out
                </button>
              </>
            ) : (
              <button onClick={handlePortalClick} className="btn-primary">
                Client Portal
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-navy"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {/* Services - Expandable */}
              <div>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-gator-green-dark transition-colors font-medium"
                >
                  Services <ChevronDown size={16} className={`transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesDropdownOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <a href="/services" className="block text-sm text-gray-600 hover:text-gator-green-dark">
                      All Services
                    </a>
                    <a href="/services/individual" className="block text-sm text-gray-600 hover:text-gator-green-dark">
                      Individual Tax
                    </a>
                    <a href="/services/corporate" className="block text-sm text-gray-600 hover:text-gator-green-dark">
                      Corporate Tax
                    </a>
                    <a href="/services/bookkeeping" className="block text-sm text-gray-600 hover:text-gator-green-dark">
                      Bookkeeping
                    </a>
                    <a href="/services/payroll" className="block text-sm text-gray-600 hover:text-gator-green-dark">
                      Payroll
                    </a>
                    <a href="/services/audit" className="block text-sm text-gray-600 hover:text-gator-green-dark">
                      CRA Audit
                    </a>
                    <a href="/services/lmia" className="block text-sm text-gray-600 hover:text-gator-green-dark">
                      LMIA & Immigration
                    </a>
                  </div>
                )}
              </div>

              <a href="/pricing" className="text-gray-700 hover:text-gator-green-dark transition-colors font-medium">
                Pricing
              </a>
              <a href="/learn" className="text-gray-700 hover:text-gator-green-dark transition-colors font-medium">
                Knowledge Hub
              </a>
              <a href="/about" className="text-gray-700 hover:text-gator-green-dark transition-colors font-medium">
                About Us
              </a>
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">
                    Hi, {user?.firstName || 'there'}!
                  </span>
                  <button onClick={handlePortalClick} className="btn-primary text-center">
                    My Portal
                  </button>
                  <button onClick={handleSignOut} className="btn-secondary text-center flex items-center justify-center">
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button onClick={handlePortalClick} className="btn-primary text-center">
                  Client Portal
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
