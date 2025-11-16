import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, DollarSign, Clock, Building2, ArrowRight } from 'lucide-react';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import Accordion from '../../components/interactive/Accordion';
import GatorTooltip from '../../components/interactive/GatorTooltip';
import InteractiveQuiz from '../../components/interactive/InteractiveQuiz';

const CorporateTax = () => {
  const [businessType, setBusinessType] = useState('');

  const businessTypes = [
    { value: 'sole', label: 'Sole Proprietor', description: 'Self-employed individual', price: '$200-400' },
    { value: 'partnership', label: 'Partnership', description: '2+ owners sharing profits', price: '$300-600' },
    { value: 'corp', label: 'Corporation', description: 'Incorporated business', price: '$500-1,500' }
  ];

  const deductions = [
    {
      title: 'Operating Expenses',
      content: (
        <ul className="space-y-2">
          <li><strong>Office Rent:</strong> Full deduction for business premises</li>
          <li><strong>Utilities:</strong> Electricity, water, internet, phone</li>
          <li><strong>Office Supplies:</strong> Stationery, equipment under $500</li>
          <li><strong>Software & Subscriptions:</strong> Accounting software, business tools</li>
        </ul>
      )
    },
    {
      title: 'Vehicle & Travel',
      content: (
        <ul className="space-y-2">
          <li><strong>Business Vehicle:</strong> $0.68/km or actual expenses</li>
          <li><strong>Parking & Tolls:</strong> Business-related only</li>
          <li><strong>Travel Expenses:</strong> Flights, hotels, meals (50% rule on meals)</li>
        </ul>
      )
    },
    {
      title: 'Payroll & Benefits',
      content: (
        <ul className="space-y-2">
          <li><strong>Salaries & Wages:</strong> All employee compensation</li>
          <li><strong>CPP & EI Contributions:</strong> Employer portions</li>
          <li><strong>Benefits:</strong> Health insurance, pension contributions</li>
        </ul>
      )
    },
    {
      title: 'Capital Cost Allowance (CCA)',
      content: (
        <ul className="space-y-2">
          <li><strong>Equipment:</strong> Computers, machinery (depreciate over time)</li>
          <li><strong>Vehicles:</strong> 30% declining balance (Class 10)</li>
          <li><strong>Buildings:</strong> 4-10% depending on type</li>
        </ul>
      )
    }
  ];

  const businessQuiz = {
    title: 'Optimize Your Business Tax Strategy',
    description: 'Tell us about your business to get personalized recommendations',
    questions: [
      {
        id: 'revenue',
        question: 'What is your annual revenue?',
        options: [
          { label: 'Under $50,000', value: 'under50k' },
          { label: '$50,000 - $200,000', value: '50-200k' },
          { label: '$200,000 - $500,000', value: '200-500k' },
          { label: 'Over $500,000', value: 'over500k' }
        ]
      },
      {
        id: 'employees',
        question: 'Do you have employees?',
        options: [
          { label: 'No employees', value: 'none' },
          { label: '1-5 employees', value: '1-5' },
          { label: '6-20 employees', value: '6-20' },
          { label: '20+ employees', value: '20plus' }
        ]
      },
      {
        id: 'incorporated',
        question: 'Is your business incorporated?',
        options: [
          { label: 'Yes, incorporated', value: 'yes', description: 'Lower tax rates available!' },
          { label: 'No, sole proprietor/partnership', value: 'no', description: 'Consider incorporating?' },
          { label: 'Not sure', value: 'unsure' }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gator-green-dark to-gator-green text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp size={48} />
                  <h1 className="text-5xl font-bold">Corporate Tax Returns</h1>
                </div>
                <p className="text-xl text-white/90 mb-8">
                  Minimize your business tax burden legally. Expert T2 corporate returns and tax planning strategies.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <DollarSign className="mb-2" />
                    <div className="font-bold text-2xl">From $300</div>
                    <div className="text-sm text-white/80">Small businesses</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Clock className="mb-2" />
                    <div className="font-bold text-2xl">5-10 Days</div>
                    <div className="text-sm text-white/80">Turnaround time</div>
                  </div>
                </div>
                <a href="/sign-in" className="btn-primary bg-white text-gator-green-dark hover:bg-gray-100">
                  Get Started Now
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {[
                    'Complete T2 corporate tax return',
                    'Financial statement preparation',
                    'Deduction maximization & CCA optimization',
                    'Small business deduction (SBD) claim',
                    'CRA e-filing for fastest processing',
                    'Tax planning consultation included'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="flex-shrink-0 text-yellow-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Business Type Selector */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-navy text-center mb-4">
                What Type of Business Are You?
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Select your business structure to see estimated pricing
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {businessTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setBusinessType(type.value)}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      businessType === type.value
                        ? 'border-gator-green-dark bg-gator-green-light'
                        : 'border-gray-200 hover:border-gator-green'
                    }`}
                  >
                    <Building2 className={`mb-3 ${businessType === type.value ? 'text-gator-green-dark' : 'text-gray-400'}`} size={32} />
                    <h3 className="font-bold text-navy text-xl mb-2">{type.label}</h3>
                    <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                    <div className="text-gator-green-dark font-bold">{type.price}</div>
                  </button>
                ))}
              </div>

              {businessType && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 bg-gradient-to-br from-gator-green-light to-white p-8 rounded-lg shadow-xl text-center"
                >
                  <h3 className="text-2xl font-bold text-navy mb-4">Perfect! Let's Get Started</h3>
                  <p className="text-gray-600 mb-6">
                    {businessType === 'sole' && 'As a sole proprietor, you report business income on your personal return. We\'ll help maximize deductions!'}
                    {businessType === 'partnership' && 'Partnership returns require careful allocation of income. We handle all T5013 filings.'}
                    {businessType === 'corp' && 'Corporate tax planning can save you thousands. Let\'s optimize your salary-dividend mix!'}
                  </p>
                  <a href="/sign-in" className="btn-primary inline-block">
                    Start Your Corporate Return
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Deductions */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                Business Deductions You Can Claim
              </h2>
              <p className="text-xl text-gray-600">
                Don't leave money on the table! These are 100% deductible.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion items={deductions} allowMultiple={true} />
            </div>
          </div>
        </section>

        {/* Tax Optimization Quiz */}
        <section className="py-20 bg-gradient-to-br from-gator-green-light to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <InteractiveQuiz
                title={businessQuiz.title}
                description={businessQuiz.description}
                questions={businessQuiz.questions}
                onComplete={(answers) => console.log('Business quiz completed:', answers)}
              />
            </div>
          </div>
        </section>

        {/* Incorporation Benefits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">
              Why Incorporate? Tax Benefits Explained
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                { title: 'Lower Tax Rates', description: 'Small business rate: 12.2% vs. personal top rate of 53.5% in BC', icon: '💰' },
                { title: 'Income Splitting', description: 'Pay family members salaries or dividends to reduce overall tax burden', icon: '👨\u200d👩\u200d👧\u200d👦' },
                { title: 'Defer Personal Tax', description: 'Leave profits in corporation and pay yourself only what you need', icon: '⏳' },
                { title: 'Lifetime Capital Gains Exemption', description: 'Up to $971,190 tax-free when selling qualified small business shares', icon: '🎁' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="font-bold text-navy text-xl mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-gator-green-dark to-gator-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Minimize Your Business Taxes?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Expert corporate tax planning can save your business thousands every year
            </p>
            <a href="/sign-in" className="btn-primary bg-white text-gator-green-dark hover:bg-gray-100 inline-flex items-center gap-2">
              Get Started Now <ArrowRight />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CorporateTax;
