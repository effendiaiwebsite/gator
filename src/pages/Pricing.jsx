import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CheckCircle, X, ArrowRight, HelpCircle, Clock } from 'lucide-react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import GatorTooltip from '../components/interactive/GatorTooltip';

const Pricing = () => {
  const [serviceType, setServiceType] = useState('personal');

  const pricing = {
    personal: [
      {
        name: 'Simple Return',
        price: '$80',
        description: '1-2 T4 slips, basic deductions',
        features: [
          { name: 'T4/T5 income processing', included: true },
          { name: 'Standard deductions', included: true },
          { name: 'RRSP contribution optimization', included: true },
          { name: 'CRA e-filing', included: true },
          { name: 'Email support', included: true },
          { name: 'Self-employment income', included: false },
          { name: 'Rental property', included: false },
          { name: 'Investment income (multiple sources)', included: false }
        ],
        turnaround: '2-3 business days',
        popular: false
      },
      {
        name: 'Standard Return',
        price: '$150',
        description: 'Self-employed, rental income, or moderate complexity',
        features: [
          { name: 'T4/T5 income processing', included: true },
          { name: 'Standard deductions', included: true },
          { name: 'RRSP contribution optimization', included: true },
          { name: 'CRA e-filing', included: true },
          { name: 'Email support', included: true },
          { name: 'Self-employment income', included: true },
          { name: 'Rental property (1)', included: true },
          { name: 'Investment income (multiple sources)', included: true }
        ],
        turnaround: '3-5 business days',
        popular: true
      },
      {
        name: 'Complex Return',
        price: '$250+',
        description: 'Multiple income sources, complex investments',
        features: [
          { name: 'T4/T5 income processing', included: true },
          { name: 'Standard deductions', included: true },
          { name: 'RRSP contribution optimization', included: true },
          { name: 'CRA e-filing', included: true },
          { name: 'Email support', included: true },
          { name: 'Self-employment income', included: true },
          { name: 'Multiple rental properties', included: true },
          { name: 'Capital gains/losses', included: true },
          { name: 'Foreign income', included: true },
          { name: 'Stock options', included: true },
          { name: 'Tax planning consultation', included: true }
        ],
        turnaround: '5-7 business days',
        popular: false
      }
    ],
    business: [
      {
        name: 'Sole Proprietor',
        price: '$200-400',
        description: 'Self-employed, report on personal return',
        features: [
          { name: 'T2125 (Business income) preparation', included: true },
          { name: 'Expense categorization', included: true },
          { name: 'Home office deduction', included: true },
          { name: 'Vehicle expense calculation', included: true },
          { name: 'CCA (depreciation) calculation', included: true },
          { name: 'GST/HST filing', included: true },
          { name: 'CRA e-filing', included: true }
        ],
        turnaround: '5-7 business days',
        popular: false
      },
      {
        name: 'Corporation (T2)',
        price: '$500-1,500',
        description: 'Incorporated business, T2 corporate return',
        features: [
          { name: 'T2 corporate tax return', included: true },
          { name: 'Financial statement preparation', included: true },
          { name: 'Small business deduction (SBD)', included: true },
          { name: 'Salary vs dividend optimization', included: true },
          { name: 'CCA schedule', included: true },
          { name: 'GST/HST filing', included: true },
          { name: 'T4/T5 preparation', included: true },
          { name: 'Tax planning consultation', included: true },
          { name: 'CRA e-filing', included: true }
        ],
        turnaround: '7-10 business days',
        popular: true
      }
    ],
    ongoing: [
      {
        name: 'Bookkeeping Basic',
        price: '$200/month',
        description: 'Small businesses, simple transactions',
        features: [
          { name: 'Monthly bank reconciliation', included: true },
          { name: 'Income & expense tracking', included: true },
          { name: 'Financial statements (P&L, Balance Sheet)', included: true },
          { name: 'GST/HST preparation', included: true },
          { name: 'Email support', included: true },
          { name: 'Accounts payable/receivable', included: false },
          { name: 'Payroll processing', included: false }
        ],
        turnaround: 'Monthly reports',
        popular: false
      },
      {
        name: 'Bookkeeping Professional',
        price: '$400/month',
        description: 'Growing businesses, more complex needs',
        features: [
          { name: 'Everything in Basic', included: true },
          { name: 'Accounts payable/receivable', included: true },
          { name: 'Payroll processing', included: true },
          { name: 'Quarterly financial reports', included: true },
          { name: 'Phone & email support', included: true },
          { name: 'Tax planning consultation', included: true }
        ],
        turnaround: 'Monthly + quarterly reports',
        popular: true
      },
      {
        name: 'Payroll Service',
        price: '$50-250/month',
        description: 'Based on employee count',
        features: [
          { name: 'Unlimited pay runs', included: true },
          { name: 'CPP/EI/Tax calculations', included: true },
          { name: 'Direct deposit or cheques', included: true },
          { name: 'T4 preparation', included: true },
          { name: 'ROE (Record of Employment)', included: true },
          { name: 'CRA remittance tracking', included: true },
          { name: 'Year-round support', included: true }
        ],
        turnaround: 'Weekly/bi-weekly/monthly',
        popular: false
      }
    ],
    support: [
      {
        name: 'CRA Audit Help',
        price: '$500+',
        description: 'One-time fee based on complexity',
        features: [
          { name: 'CRA letter review & explanation', included: true },
          { name: 'Document gathering & organization', included: true },
          { name: 'Communication with CRA', included: true },
          { name: 'Written responses', included: true },
          { name: 'Negotiation with auditors', included: true },
          { name: 'Objection filing (if needed)', included: true }
        ],
        turnaround: 'As needed (urgent)',
        popular: false
      },
      {
        name: 'LMIA Support',
        price: '$400-800',
        description: 'Document preparation for LMIA',
        features: [
          { name: 'Job posting compliance', included: true },
          { name: 'Recruitment documentation', included: true },
          { name: 'Business document review', included: true },
          { name: 'Application package preparation', included: true },
          { name: 'Transition plan', included: true },
          { name: 'Government fee guidance', included: true }
        ],
        turnaround: '1-2 weeks prep',
        popular: false
      },
      {
        name: 'PR Document Prep',
        price: '$600+',
        description: 'Permanent residency application support',
        features: [
          { name: 'Document checklist', included: true },
          { name: 'Employment reference letters', included: true },
          { name: 'Financial document organization', included: true },
          { name: 'Form completion assistance', included: true },
          { name: 'Translation coordination', included: true },
          { name: 'ECA guidance', included: true }
        ],
        turnaround: '2-3 weeks prep',
        popular: false
      }
    ]
  };

  const addOns = [
    { name: 'Prior year return (1 year back)', price: '+$50-150' },
    { name: 'Additional rental property', price: '+$75 each' },
    { name: 'Trust return (T3)', price: '+$300' },
    { name: 'Estate return', price: '+$400' },
    { name: 'Rush service (24-48 hours)', price: '+50%' },
    { name: 'CRA phone representation', price: '+$150/hour' }
  ];

  const categories = [
    { id: 'personal', label: 'Personal Tax' },
    { id: 'business', label: 'Business Tax' },
    { id: 'ongoing', label: 'Ongoing Services' },
    { id: 'support', label: 'Support Services' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gator-green-dark to-gator-green text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                No surprises, no hidden fees. Get a quote before we start, pay after you're satisfied.
              </p>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <p className="text-2xl font-bold">💯 100% Satisfaction Guarantee</p>
                <p className="text-white/90 mt-2">Not happy? We'll make it right or refund you.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-2 py-4 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setServiceType(category.id)}
                  className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    serviceType === category.id
                      ? 'bg-gator-green-dark text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricing[serviceType].map((package_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`card ${package_.popular ? 'ring-4 ring-gator-green-dark' : ''} relative flex flex-col`}
                >
                  {package_.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gator-green-dark text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-navy mb-2">{package_.name}</h3>
                  <div className="text-4xl font-bold text-gator-green-dark mb-2">{package_.price}</div>
                  <p className="text-gray-600 mb-4">{package_.description}</p>
                  <div className="text-sm text-gray-500 mb-6">
                    <Clock size={16} className="inline mr-1" />
                    {package_.turnaround}
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {package_.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {feature.included ? (
                          <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a href="/sign-in" className="btn-primary w-full text-center">
                    Get Started
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-Ons */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-navy text-center mb-4">Add-On Services</h2>
              <p className="text-center text-gray-600 mb-12">Need something extra? We've got you covered.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addOns.map((addon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-navy">{addon.name}</span>
                    <span className="font-bold text-gator-green-dark">{addon.price}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How Pricing Works */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-navy text-center mb-12">How Pricing Works</h2>

              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Get a Quote',
                    description: 'Tell us about your tax situation. We provide an upfront estimate before starting any work.'
                  },
                  {
                    step: 2,
                    title: 'We Prepare Your Return',
                    description: 'Upload documents through our secure portal. We prepare everything and answer questions.'
                  },
                  {
                    step: 3,
                    title: 'Review & Approve',
                    description: 'We send you the completed return to review. Make sure you\'re 100% satisfied.'
                  },
                  {
                    step: 4,
                    title: 'Pay & File',
                    description: 'Once approved, pay via credit card, e-transfer, or cheque. We file immediately with CRA.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-gator-green-dark text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-gator-green-dark to-gator-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Sign up for your free account and get a personalized quote in minutes
            </p>
            <a href="/sign-in" className="btn-primary bg-white text-gator-green-dark hover:bg-gray-100 inline-flex items-center gap-2">
              Get Your Free Quote <ArrowRight />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
