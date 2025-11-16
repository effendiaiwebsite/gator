import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Shield, Users, AlertTriangle, Globe, Search, Filter } from 'lucide-react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import ServiceComparison from '../components/interactive/ServiceComparison';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      id: 'individual',
      icon: FileText,
      name: 'Individual Tax Returns',
      category: 'personal',
      description: 'Personal tax preparation with maximum refunds and deductions',
      price: 'From $80',
      turnaround: '2-5 business days',
      link: '/services/individual',
      bestFor: 'Employees, retirees, students',
      features: [
        { name: 'T4/T5 Processing', included: true },
        { name: 'RRSP Optimization', included: true },
        { name: 'Deduction Maximization', included: true },
        { name: 'CRA E-Filing', included: true },
        { name: 'Audit Support', included: false }
      ]
    },
    {
      id: 'corporate',
      icon: TrendingUp,
      name: 'Corporate Tax Returns',
      category: 'business',
      description: 'Business tax optimization and corporate filing services',
      price: 'From $300',
      turnaround: '5-10 business days',
      link: '/services/corporate',
      bestFor: 'Small businesses, corporations',
      features: [
        { name: 'T4/T5 Processing', included: true },
        { name: 'RRSP Optimization', included: false },
        { name: 'Deduction Maximization', included: true },
        { name: 'CRA E-Filing', included: true },
        { name: 'Audit Support', included: true }
      ]
    },
    {
      id: 'bookkeeping',
      icon: Shield,
      name: 'Bookkeeping & Accounting',
      category: 'business',
      description: 'Professional bookkeeping and financial reporting',
      price: 'From $200/month',
      turnaround: 'Ongoing monthly',
      link: '/services/bookkeeping',
      bestFor: 'All business types',
      features: [
        { name: 'T4/T5 Processing', included: false },
        { name: 'RRSP Optimization', included: false },
        { name: 'Deduction Maximization', included: true },
        { name: 'CRA E-Filing', included: false },
        { name: 'Audit Support', included: true }
      ]
    },
    {
      id: 'payroll',
      icon: Users,
      name: 'Payroll Services',
      category: 'business',
      description: 'Streamlined payroll processing and CPP/EI optimization',
      price: 'From $50/month',
      turnaround: 'Weekly/Bi-weekly',
      link: '/services/payroll',
      bestFor: 'Businesses with employees',
      features: [
        { name: 'T4/T5 Processing', included: true },
        { name: 'RRSP Optimization', included: false },
        { name: 'Deduction Maximization', included: true },
        { name: 'CRA E-Filing', included: true },
        { name: 'Audit Support', included: false }
      ]
    },
    {
      id: 'audit',
      icon: AlertTriangle,
      name: 'CRA Audit Assistance',
      category: 'support',
      description: 'Expert audit representation and CRA communication',
      price: 'From $500',
      turnaround: 'As needed',
      link: '/services/audit',
      bestFor: 'Anyone facing CRA audit',
      features: [
        { name: 'T4/T5 Processing', included: false },
        { name: 'RRSP Optimization', included: false },
        { name: 'Deduction Maximization', included: false },
        { name: 'CRA E-Filing', included: false },
        { name: 'Audit Support', included: true }
      ]
    },
    {
      id: 'lmia',
      icon: Globe,
      name: 'LMIA Document Support',
      category: 'support',
      description: 'Immigration documentation and LMIA application assistance',
      price: 'From $400',
      turnaround: '1-2 weeks',
      link: '/services/lmia',
      bestFor: 'Immigrants, employers',
      features: [
        { name: 'T4/T5 Processing', included: false },
        { name: 'RRSP Optimization', included: false },
        { name: 'Deduction Maximization', included: false },
        { name: 'CRA E-Filing', included: false },
        { name: 'Audit Support', included: false }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services', icon: null },
    { id: 'personal', label: 'Personal', icon: FileText },
    { id: 'business', label: 'Business', icon: TrendingUp },
    { id: 'support', label: 'Support', icon: Shield }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gator-green-dark to-gator-green text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Our Services
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Comprehensive tax and accounting solutions for individuals and businesses across Canada
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 py-4 overflow-x-auto">
              <Filter className="text-gray-500 flex-shrink-0" size={20} />
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-gator-green-dark text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {Icon && <Icon size={18} />}
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.a
                    key={service.id}
                    href={service.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="card group cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-4 bg-gator-green-light rounded-lg group-hover:bg-gator-green transition-colors">
                        <Icon className="text-gator-green-dark group-hover:text-white transition-colors" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-gator-green-dark transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gator-green-dark font-semibold">{service.price}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Turnaround:</span>
                        <span className="font-semibold text-gray-700">{service.turnaround}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Best for:</span>
                        <span className="font-semibold text-gray-700">{service.bestFor}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <span className="text-gator-green-dark font-semibold group-hover:underline">
                        Learn More →
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No services found matching your criteria</p>
              </div>
            )}
          </div>
        </section>

        {/* Service Comparison */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                Compare Services
              </h2>
              <p className="text-xl text-gray-600">
                Not sure which service you need? Compare them side-by-side
              </p>
            </div>

            <ServiceComparison services={services} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gator-green-dark to-gator-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Calculate your potential savings or sign up for our secure client portal
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/#calculator" className="bg-white text-gator-green-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all">
                Calculate Savings
              </a>
              <a href="/sign-in" className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all">
                Sign In
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
