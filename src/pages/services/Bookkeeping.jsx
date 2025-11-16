import { motion } from 'framer-motion';
import { Shield, CheckCircle, DollarSign, Clock, ArrowRight, BarChart3, FileSpreadsheet, TrendingUp } from 'lucide-react';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import Accordion from '../../components/interactive/Accordion';

const Bookkeeping = () => {
  const packages = [
    {
      name: 'Basic',
      price: '$200/month',
      description: 'Perfect for startups and small businesses',
      features: [
        'Monthly bank reconciliation',
        'Income & expense tracking',
        'Financial statements (P&L, Balance Sheet)',
        'GST/HST preparation',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: '$400/month',
      description: 'For growing businesses',
      features: [
        'Everything in Basic',
        'Accounts payable & receivable',
        'Payroll processing',
        'Quarterly financial reports',
        'Phone & email support',
        'Tax planning consultation'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For established businesses',
      features: [
        'Everything in Professional',
        'Dedicated bookkeeper',
        'Weekly financial reports',
        'Budget & forecast planning',
        'Priority support',
        'CFO-level insights'
      ]
    }
  ];

  const faqItems = [
    {
      title: 'What bookkeeping software do you use?',
      content: 'We work with QuickBooks Online, FreshBooks, Wave, and Xero. Already using something else? We can work with that too!'
    },
    {
      title: 'How often will I receive financial reports?',
      content: 'Monthly reports are standard. Professional and Enterprise packages include quarterly or weekly reports depending on your needs.'
    },
    {
      title: 'Can you help clean up messy books?',
      content: 'Absolutely! We offer catch-up bookkeeping services. We\'ll reconcile everything from the past year (or longer) and get you back on track.'
    },
    {
      title: 'Do you handle payroll too?',
      content: 'Yes! Our Professional and Enterprise packages include full payroll processing. See our Payroll Services page for more details.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-br from-gator-green-dark to-gator-green text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={48} />
                  <h1 className="text-5xl font-bold">Bookkeeping & Accounting</h1>
                </div>
                <p className="text-xl text-white/90 mb-8">
                  Professional bookkeeping so you can focus on growing your business. Accurate, timely financial reports every month.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <DollarSign className="mb-2" />
                    <div className="font-bold text-2xl">From $200</div>
                    <div className="text-sm text-white/80">Per month</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Clock className="mb-2" />
                    <div className="font-bold text-2xl">Monthly</div>
                    <div className="text-sm text-white/80">Reports delivered</div>
                  </div>
                </div>
                <a href="/sign-in" className="btn-primary bg-white text-gator-green-dark hover:bg-gray-100">
                  Get Started Now
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">What You Get</h3>
                <ul className="space-y-3">
                  {['Accurate financial records', 'Monthly reconciliation', 'Profit & Loss statements', 'Balance sheets', 'Cash flow analysis', 'Year-round support'].map((item, index) => (
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

        {/* Packages */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">Choose Your Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`card ${pkg.popular ? 'ring-4 ring-gator-green-dark' : ''} relative`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gator-green-dark text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-navy mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gator-green-dark mb-2">{pkg.price}</div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={18} className="text-gator-green-dark flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
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

        {/* Why Bookkeeping Matters */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">Why Professional Bookkeeping Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: BarChart3, title: 'Make Better Decisions', description: 'Know your cash flow, profit margins, and where your money goes' },
                { icon: FileSpreadsheet, title: 'Save at Tax Time', description: 'Organized books mean maximum deductions and faster filing' },
                { icon: TrendingUp, title: 'Grow Confidently', description: 'Track performance, identify trends, plan for growth' }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="text-center">
                    <Icon className="mx-auto mb-4 text-gator-green-dark" size={64} />
                    <h3 className="font-bold text-navy text-xl mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">Common Questions</h2>
            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-gator-green-dark to-gator-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Stress-Free Bookkeeping?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let us handle the books while you focus on what you do best
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

export default Bookkeeping;
