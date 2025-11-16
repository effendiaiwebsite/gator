import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Shield, Clock, TrendingUp, Users, MapPin } from 'lucide-react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import Calculator from '../components/home/Calculator';
import LeadForm from '../components/home/LeadForm';
import CountUpStat from '../components/interactive/CountUpStat';
import ComparisonSlider from '../components/interactive/ComparisonSlider';
import TaxCalendar from '../components/interactive/TaxCalendar';
import Accordion from '../components/interactive/Accordion';
import InteractiveQuiz from '../components/interactive/InteractiveQuiz';
import GatorTooltip from '../components/interactive/GatorTooltip';
import { GATOR_IMAGES } from '../config/constants';

const Home = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [calculatorData, setCalculatorData] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const calculatorRef = useRef(null);

  const handleStartCalculator = () => {
    setShowCalculator(true);
    setTimeout(() => {
      calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleCalculatorComplete = (selections, result) => {
    setCalculatorData({ selections, result });
    setShowLeadForm(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleQuizComplete = (answers) => {
    setQuizResults(answers);
    handleStartCalculator();
  };

  const services = [
    {
      icon: FileText,
      title: 'Individual Taxes',
      description: 'Personal tax returns with maximum refunds',
      link: '/services/individual'
    },
    {
      icon: TrendingUp,
      title: 'Corporate Taxes',
      description: 'Business tax optimization & filing',
      link: '/services/corporate'
    },
    {
      icon: Shield,
      title: 'Bookkeeping',
      description: 'Professional bookkeeping & accounting',
      link: '/services/bookkeeping'
    },
    {
      icon: Users,
      title: 'Payroll Services',
      description: 'Streamlined payroll processing',
      link: '/services/payroll'
    },
    {
      icon: FileText,
      title: 'CRA Audit Help',
      description: 'Expert audit assistance & representation',
      link: '/services/audit'
    },
    {
      icon: FileText,
      title: 'LMIA Support',
      description: 'Immigration document assistance',
      link: '/services/lmia'
    }
  ];

  const faqItems = [
    {
      title: 'How much does tax filing cost?',
      content: (
        <div>
          <p>Our pricing is transparent and based on complexity:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Simple returns</strong> (1-2 T4s): Starting at $80</li>
            <li><strong>Moderate returns</strong> (Self-employed, rental income): $150-$300</li>
            <li><strong>Complex returns</strong> (Multiple income sources, investments): $300+</li>
          </ul>
          <p className="mt-2">Use our calculator above to get your personalized estimate!</p>
        </div>
      )
    },
    {
      title: 'What documents do I need for filing?',
      content: (
        <div>
          <p>Common documents include:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><GatorTooltip term="T4" explanation="Employment income slip from your employer showing salary and deductions" /> (Employment income)</li>
            <li><GatorTooltip term="T5" explanation="Investment income slip showing interest, dividends, and capital gains" /> (Investment income)</li>
            <li><GatorTooltip term="RRSP" explanation="Registered Retirement Savings Plan - tax-deferred savings for retirement" /> contribution receipts</li>
            <li>Medical expenses, donation receipts</li>
            <li>Rental income/expense records (if applicable)</li>
            <li>Business income/expenses (if self-employed)</li>
          </ul>
        </div>
      )
    },
    {
      title: 'How long does it take to get my refund?',
      content: (
        <div>
          <p>Typical timelines:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>E-filed returns:</strong> 2-4 weeks from CRA</li>
            <li><strong>Paper returns:</strong> 6-8 weeks from CRA</li>
            <li><strong>Our processing time:</strong> 2-5 business days to prepare and file</li>
          </ul>
          <p className="mt-2 text-green-700 font-semibold">💚 We always e-file for fastest refunds!</p>
        </div>
      )
    },
    {
      title: 'What makes Gator Bookkeeping different?',
      content: (
        <div>
          <p>Here's what sets us apart:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Secure online portal:</strong> Upload docs anytime, track progress 24/7</li>
            <li><strong>Military-grade encryption:</strong> Your documents are AES-256 encrypted</li>
            <li><strong>15+ years experience:</strong> We've filed 1,500+ returns</li>
            <li><strong>Two locations:</strong> Victoria, BC & Surrey, BC</li>
            <li><strong>Transparent pricing:</strong> No hidden fees, ever</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Can you help if I\'m being audited by CRA?',
      content: (
        <div>
          <p>Absolutely! Our CRA audit assistance includes:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Reviewing CRA letters and explaining what they mean</li>
            <li>Preparing required documentation</li>
            <li>Representing you in communications with CRA</li>
            <li>Negotiating payment plans if needed</li>
          </ul>
          <p className="mt-2">Don't panic - we're here to help! <a href="/services/audit" className="text-gator-green-dark underline">Learn more about audit assistance</a></p>
        </div>
      )
    },
    {
      title: 'Do you help with LMIA applications?',
      content: (
        <div>
          <p>Yes! We provide comprehensive LMIA document support:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Document preparation and review</li>
            <li>Employment verification</li>
            <li>Application guidance and checklist</li>
            <li>We've helped hundreds of families immigrate to Canada</li>
          </ul>
          <p className="mt-2"><a href="/services/lmia" className="text-gator-green-dark underline">See LMIA services</a></p>
        </div>
      )
    }
  ];

  const deductionQuiz = {
    title: 'Find Deductions You Might Be Missing',
    description: 'Answer a few quick questions to discover potential tax savings',
    questions: [
      {
        id: 'homeOffice',
        question: 'Do you work from home?',
        options: [
          { label: 'Yes, full-time', value: 'fullTime', description: 'Could save $400-$2,000' },
          { label: 'Yes, part-time', value: 'partTime', description: 'Could save $200-$1,000' },
          { label: 'No', value: 'no', description: '' }
        ]
      },
      {
        id: 'vehicle',
        question: 'Do you use your vehicle for work?',
        options: [
          { label: 'Yes, regularly', value: 'regular', description: 'Deduct $0.68 per km!' },
          { label: 'Occasionally', value: 'occasional', description: 'Still deductible!' },
          { label: 'No', value: 'no', description: '' }
        ]
      },
      {
        id: 'donations',
        question: 'Did you make charitable donations?',
        options: [
          { label: 'Yes, over $200', value: 'high', description: 'Get up to 33% back' },
          { label: 'Yes, under $200', value: 'low', description: 'Get up to 20% back' },
          { label: 'No', value: 'no', description: '' }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section with Animated Gator */}
        <section className="relative bg-gradient-to-br from-gator-green-dark via-gator-green to-gator-green-light text-white py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Save Thousands on Your Taxes
                  <span className="block text-yellow-300">Guaranteed.</span>
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Professional tax filing & bookkeeping with secure online portal. File from anywhere, anytime.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleStartCalculator}
                    className="bg-white text-gator-green-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
                  >
                    Calculate My Savings <ArrowRight />
                  </button>
                  <a
                    href="/sign-in"
                    className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
                  >
                    Client Portal Login
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex items-center justify-center"
              >
                {/* Business Suited Gator */}
                <img
                  src={GATOR_IMAGES.BUSINESS_SUIT}
                  alt="Gator in Business Suit"
                  className="w-80 h-80 object-contain drop-shadow-2xl"
                />

                {/* Floating Text Bubbles */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                  className="absolute -top-10 -left-10 bg-white text-gator-green-dark px-4 py-2 rounded-full shadow-xl font-bold text-sm whitespace-nowrap"
                >
                  💰 Max Refunds!
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 2.5 }}
                  className="absolute top-5 -right-16 bg-yellow-300 text-navy px-4 py-2 rounded-full shadow-xl font-bold text-sm whitespace-nowrap"
                >
                  ⚡ Fast Filing
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                  className="absolute bottom-10 -left-16 bg-white text-gator-green-dark px-4 py-2 rounded-full shadow-xl font-bold text-sm whitespace-nowrap"
                >
                  🔒 100% Secure
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 3.5 }}
                  className="absolute -bottom-5 right-10 bg-yellow-300 text-navy px-4 py-2 rounded-full shadow-xl font-bold text-sm whitespace-nowrap"
                >
                  ✅ CRA Approved
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 4 }}
                  className="absolute top-32 left-5 bg-white text-gator-green-dark px-3 py-1 rounded-full shadow-xl font-bold text-xs"
                >
                  15+ Years
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4, repeat: Infinity, repeatType: "reverse", repeatDelay: 4.5 }}
                  className="absolute bottom-32 right-0 bg-yellow-300 text-navy px-3 py-1 rounded-full shadow-xl font-bold text-xs"
                >
                  Expert Team
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <CountUpStat end={1547} suffix="+" label="Returns Filed" />
              <CountUpStat end={2.3} suffix="M" prefix="$" label="Total Saved" />
              <CountUpStat end={15} suffix="+" label="Years Experience" />
              <CountUpStat end={2} label="Office Locations" />
            </div>
          </div>
        </section>

        {/* Services Section with Hover Cards */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-navy mb-4">
                Full-Service Tax & Accounting
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From individual returns to corporate tax planning, we've got you covered
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.a
                    key={index}
                    href={service.link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="card group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gator-green-light rounded-lg group-hover:bg-gator-green transition-colors">
                        <Icon className="text-gator-green-dark group-hover:text-white transition-colors" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-gator-green-dark transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <a href="/services" className="btn-primary inline-flex items-center gap-2">
                View All Services <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* How It Works Timeline */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-16">
              How Gator Bookkeeping Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gator-green-light" />

              {[
                { step: 1, icon: '📱', title: 'Sign Up', description: 'Create your free account in 60 seconds' },
                { step: 2, icon: '📄', title: 'Upload Docs', description: 'Securely upload your tax documents (AES-256 encrypted)' },
                { step: 3, icon: '🔍', title: 'We Review', description: 'Our experts prepare and optimize your return' },
                { step: 4, icon: '💰', title: 'Save Money', description: 'Get your refund fast with e-filing' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative text-center"
                >
                  <div className="bg-white border-4 border-gator-green-light rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg z-10 relative">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-navy text-xl mb-2">
                    {item.step}. {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deduction Quiz Section */}
        {!showCalculator && (
          <section className="py-20 bg-gradient-to-br from-gator-green-light to-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <InteractiveQuiz
                  title={deductionQuiz.title}
                  description={deductionQuiz.description}
                  questions={deductionQuiz.questions}
                  onComplete={handleQuizComplete}
                />
              </div>
            </div>
          </section>
        )}

        {/* Calculator Section */}
        {showCalculator && (
          <section ref={calculatorRef} id="calculator" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <Calculator onComplete={handleCalculatorComplete} />
            </div>
          </section>
        )}

        {/* Lead Form Section */}
        {showLeadForm && (
          <section id="lead-form" className="py-20 bg-gradient-to-br from-gator-green-light to-white">
            <div className="container mx-auto px-4">
              <LeadForm calculatorData={calculatorData} />
            </div>
          </section>
        )}

        {/* Before/After Comparison */}
        {!showCalculator && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-navy text-center mb-4">
                Real Savings, Real Clients
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Drag the slider to see the difference Gator Bookkeeping makes
              </p>

              <div className="max-w-4xl mx-auto">
                <ComparisonSlider
                  beforeLabel="Without Gator"
                  afterLabel="With Gator"
                  beforeImage={
                    <div className="text-center">
                      <div className="text-5xl font-bold text-red-700 mb-2">$8,500</div>
                      <p className="text-red-600 font-semibold">Taxes Paid</p>
                      <p className="text-sm text-red-500 mt-2">Missed deductions • No optimization</p>
                    </div>
                  }
                  afterImage={
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gator-green-dark mb-2">$5,200</div>
                      <p className="text-green-700 font-semibold">Taxes Paid</p>
                      <p className="text-sm text-green-600 mt-2">Saved $3,300! 💰</p>
                    </div>
                  }
                />
              </div>
            </div>
          </section>
        )}

        {/* Tax Calendar */}
        {!showCalculator && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-navy mb-4">
                  Important Tax Dates
                </h2>
                <p className="text-xl text-gray-600">
                  Never miss a deadline with our interactive tax calendar
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <TaxCalendar />
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {!showCalculator && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-navy mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600">
                  Got questions? Gator has answers! 🐊
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Accordion items={faqItems} defaultOpen={0} />
              </div>
            </div>
          </section>
        )}

        {/* Locations */}
        {!showCalculator && (
          <section className="py-20 bg-gradient-to-br from-gator-green-dark to-gator-green text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Visit Us</h2>
                <p className="text-xl text-white/90">
                  Two convenient locations serving BC
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center"
                >
                  <MapPin className="mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold mb-2">Victoria, BC</h3>
                  <p className="text-white/80 mb-4">Reliable Tax Services</p>
                  <p className="text-white/90">📞 +1 (250) 383-7359</p>
                  <p className="text-white/90">📧 info@rtsreliabletaxes.com</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center"
                >
                  <MapPin className="mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold mb-2">Surrey, BC</h3>
                  <p className="text-white/80 mb-4">Walia Tax Services</p>
                  <p className="text-white/90">📞 Coming Soon</p>
                  <p className="text-white/90">📧 info@waliatax.com</p>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        {!showCalculator && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                  Ready to Start Saving?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join 1,547+ Canadians who trust Gator Bookkeeping with their taxes
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleStartCalculator}
                    className="btn-primary text-lg px-8 py-4"
                  >
                    Calculate My Savings Now
                  </button>
                  <a
                    href="/services"
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Explore Services
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
