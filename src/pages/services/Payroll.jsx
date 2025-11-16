import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, DollarSign, Clock, ArrowRight, Calculator, AlertTriangle, FileCheck, TrendingUp } from 'lucide-react';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import Accordion from '../../components/interactive/Accordion';
import GatorTooltip from '../../components/interactive/GatorTooltip';
import InteractiveQuiz from '../../components/interactive/InteractiveQuiz';
import CountUpStat from '../../components/interactive/CountUpStat';

const Payroll = () => {
  const [employeeCount, setEmployeeCount] = useState(1);
  const [payFrequency, setPayFrequency] = useState('biweekly');
  const [estimatedCost, setEstimatedCost] = useState(null);

  const calculatePayrollCost = (count, frequency) => {
    let baseCost = 50;
    if (count > 5) baseCost = 100;
    if (count > 10) baseCost = 150;
    if (count > 20) baseCost = 250;

    // Frequency multiplier
    const multiplier = frequency === 'weekly' ? 1.2 : frequency === 'monthly' ? 0.9 : 1;

    return Math.round(baseCost * multiplier);
  };

  const handleCalculate = () => {
    const cost = calculatePayrollCost(employeeCount, payFrequency);
    setEstimatedCost(cost);
  };

  const payrollServices = [
    {
      title: 'Payroll Processing',
      description: 'Complete payroll calculations including gross pay, deductions, and net pay',
      features: [
        'Hourly, salary, and commission calculations',
        'Overtime and holiday pay',
        'Vacation pay accrual',
        'Bonus and tip processing'
      ]
    },
    {
      title: 'Tax Deductions & Remittances',
      description: 'Accurate calculation and timely remittance of all payroll taxes',
      features: [
        'Federal and provincial income tax',
        'CPP (Canada Pension Plan) contributions',
        'EI (Employment Insurance) premiums',
        'Monthly/quarterly CRA remittances'
      ]
    },
    {
      title: 'Year-End Processing',
      description: 'Complete year-end compliance and documentation',
      features: [
        'T4 and T4A slip preparation',
        'T4 Summary filing with CRA',
        'ROE (Record of Employment)',
        'WCB (Workers Compensation) reporting'
      ]
    },
    {
      title: 'Employee Management',
      description: 'Track employee information and payment history',
      features: [
        'New employee onboarding (TD1 forms)',
        'Employee pay stubs (print or email)',
        'Direct deposit setup',
        'Vacation and sick time tracking'
      ]
    }
  ];

  const commonMistakes = [
    {
      title: 'Incorrect CPP/EI Calculations',
      problem: 'Manual calculations often result in over or underpayment',
      solution: 'Our automated system uses CRA tables for 100% accuracy',
      cost: 'Penalties: $100-$500 per mistake'
    },
    {
      title: 'Late Remittances',
      problem: 'Missing CRA payment deadlines triggers automatic penalties',
      solution: 'We remit on time, every time, with automated tracking',
      cost: 'Penalties: 3-10% of amount owing + interest'
    },
    {
      title: 'Incorrect T4 Information',
      problem: 'Errors on T4 slips delay employee refunds and trigger audits',
      solution: 'Double-checked T4s prepared from accurate year-round records',
      cost: 'CRA penalties + employee complaints'
    },
    {
      title: 'Missing Year-End Deadlines',
      problem: 'T4s due February 28 - late filing incurs penalties',
      solution: 'We start year-end processing in January, file early',
      cost: 'Penalties: $25-$100 per T4 slip'
    }
  ];

  const payrollQuiz = {
    title: 'Payroll Compliance Check',
    description: 'Answer these questions to see if your payroll is compliant',
    questions: [
      {
        id: 'remittance',
        question: 'How often do you remit source deductions to CRA?',
        options: [
          { label: 'Monthly (on time)', value: 'monthly', description: 'Good! Most businesses remit monthly' },
          { label: 'Quarterly', value: 'quarterly', description: 'Only allowed for small remitters' },
          { label: 'Annually', value: 'annually', description: '⚠️ This is not compliant!' },
          { label: 'I\'m not sure', value: 'unsure', description: 'Let us help you get compliant' }
        ]
      },
      {
        id: 't4s',
        question: 'Do you file T4 slips by February 28?',
        options: [
          { label: 'Yes, always on time', value: 'yes' },
          { label: 'Sometimes late', value: 'sometimes', description: 'Late penalties add up!' },
          { label: 'I don\'t file T4s', value: 'no', description: '⚠️ This is required by law!' }
        ]
      },
      {
        id: 'cpp',
        question: 'Do you calculate CPP contributions correctly?',
        options: [
          { label: 'Yes, using CRA tables', value: 'yes' },
          { label: 'I estimate them', value: 'estimate', description: 'Estimates often lead to errors' },
          { label: 'Not sure', value: 'unsure' }
        ]
      }
    ]
  };

  const deductionsExplained = [
    {
      title: 'Federal & Provincial Income Tax',
      content: (
        <div>
          <p className="mb-3">Based on employee's TD1 forms and CRA tax tables:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Basic Personal Amount (2024):</strong> $15,705 federal</li>
            <li><strong>Progressive Rates:</strong> 15% to 33% federally, 5.06% to 20.5% in BC</li>
            <li><strong>Pay Period Deductions:</strong> Calculated using CRA formulas</li>
            <li><strong>TD1 Forms:</strong> Claim additional amounts (spouse, dependents, disability)</li>
          </ul>
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-gator-green-dark">
            <p className="text-sm"><strong>Gator Tip:</strong> We ensure TD1 forms are up-to-date every January and when life changes occur (marriage, children, etc.)</p>
          </div>
        </div>
      )
    },
    {
      title: 'CPP (Canada Pension Plan)',
      content: (
        <div>
          <p className="mb-3">Both employer and employee contribute:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>2024 Rate:</strong> 5.95% each (employer + employee)</li>
            <li><strong>Maximum Contribution:</strong> $3,867.50 per person</li>
            <li><strong>Yearly Maximum Pensionable Earnings:</strong> $68,500</li>
            <li><strong>Basic Exemption:</strong> First $3,500 is exempt</li>
          </ul>
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500">
            <p className="text-sm"><strong>⚠️ Common Mistake:</strong> Forgetting to stop CPP deductions after maximum is reached. We track this automatically!</p>
          </div>
        </div>
      )
    },
    {
      title: 'EI (Employment Insurance)',
      content: (
        <div>
          <p className="mb-3">Employee premiums and employer contributions:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>2024 Employee Rate:</strong> 1.66% of insurable earnings</li>
            <li><strong>Employer Rate:</strong> 2.324% (1.4 times employee rate)</li>
            <li><strong>Maximum Insurable Earnings:</strong> $63,200</li>
            <li><strong>Maximum Employee Premium:</strong> $1,049.12</li>
            <li><strong>Maximum Employer Premium:</strong> $1,468.77</li>
          </ul>
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500">
            <p className="text-sm"><strong>Did You Know?</strong> Some employees are EI-exempt (incorporated owners with 40%+ shares). We handle these exceptions correctly.</p>
          </div>
        </div>
      )
    },
    {
      title: 'WSIB / WCB (Workers Compensation)',
      content: (
        <div>
          <p className="mb-3">Employer-paid insurance for workplace injuries:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Rate Varies by Industry:</strong> Construction: ~$2-6 per $100, Office: ~$0.30-1.50 per $100</li>
            <li><strong>Based on Gross Payroll:</strong> Calculated on total wages</li>
            <li><strong>Annual Reconciliation:</strong> File by March 31</li>
            <li><strong>Penalties for Non-Compliance:</strong> Can be severe</li>
          </ul>
          <p className="mt-3">We can help estimate and track WCB premiums, though direct payment is to WCB/WSIB.</p>
        </div>
      )
    }
  ];

  const payrollTimeline = [
    {
      date: 'Pay Day',
      event: 'Employee Paycheques Issued',
      description: 'Employees receive pay via direct deposit or cheque',
      icon: '💰'
    },
    {
      date: '15th of Following Month',
      event: 'Remittance Deadline',
      description: 'CRA remittance for previous month\'s deductions due',
      icon: '📅',
      important: true
    },
    {
      date: 'February 28',
      event: 'T4 Deadline',
      description: 'T4 slips must be distributed to employees and filed with CRA',
      icon: '📄',
      important: true
    },
    {
      date: 'Throughout Year',
      event: 'ROE Processing',
      description: 'Record of Employment issued within 5 days of separation',
      icon: '📋'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      employees: '1-5',
      price: '$50',
      features: [
        'Unlimited pay runs',
        'CPP/EI/Tax calculations',
        'Direct deposit setup',
        'Employee pay stubs',
        'Monthly remittances',
        'T4 preparation'
      ]
    },
    {
      name: 'Growth',
      employees: '6-10',
      price: '$100',
      features: [
        'Everything in Starter',
        'Vacation tracking',
        'ROE preparation',
        'New hire onboarding',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Business',
      employees: '11-20',
      price: '$150',
      features: [
        'Everything in Growth',
        'Multiple pay rates',
        'Commission tracking',
        'Benefit deductions',
        'Dedicated support'
      ]
    },
    {
      name: 'Enterprise',
      employees: '20+',
      price: 'Custom',
      features: [
        'Everything in Business',
        'Multiple locations',
        'Custom reporting',
        'WCB tracking',
        'CFO-level insights'
      ]
    }
  ];

  const faqItems = [
    {
      title: 'What information do you need from me each pay period?',
      content: (
        <div>
          <p className="mb-2">Just send us:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Employee hours worked (hourly employees)</li>
            <li>Any bonuses, commissions, or adjustments</li>
            <li>New hire information (TD1, void cheque for direct deposit)</li>
            <li>Terminations (for ROE)</li>
          </ul>
          <p className="mt-3">Email, text, or upload through the portal - whatever works for you!</p>
        </div>
      )
    },
    {
      title: 'Can you handle different pay frequencies?',
      content: 'Absolutely! We process weekly, bi-weekly (every 2 weeks), semi-monthly (twice per month), and monthly payroll. You can even have different frequencies for different employees.'
    },
    {
      title: 'What about vacation pay?',
      content: (
        <div>
          <p className="mb-2">We track vacation pay two ways:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Accrual Method:</strong> Track vacation time earned, pay out when taken (most common)</li>
            <li><strong>Percentage Method:</strong> Pay 4% or 6% on each cheque (common for part-time/seasonal)</li>
          </ul>
          <p className="mt-3">BC requires minimum 2 weeks (4%) after 1 year, 3 weeks (6%) after 5 years.</p>
        </div>
      )
    },
    {
      title: 'Do you file remittances with CRA for me?',
      content: 'Yes! We calculate what you owe and file the remittance online. You just need to make the payment to CRA by the deadline (15th of following month). We send you a remittance summary showing exactly what to pay.'
    },
    {
      title: 'What if an employee is EI-exempt?',
      content: 'No problem! Incorporated business owners with 40%+ shares are EI-exempt. We flag these employees and exclude them from EI deductions while still processing CPP and income tax correctly.'
    },
    {
      title: 'Can you help with catch-up payroll?',
      content: 'Yes! If you\'re behind on payroll, we can catch up historical pay runs, calculate back-dated remittances, and get you compliant. The sooner we start, the better - CRA penalties increase over time.'
    },
    {
      title: 'What about statutory holiday pay?',
      content: (
        <div>
          <p className="mb-2">We handle all statutory holidays correctly:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Eligible employees get paid:</strong> Average daily wage even if not working</li>
            <li><strong>If working on holiday:</strong> 1.5x or 2x regular rate (depends on employment standards)</li>
            <li><strong>BC has 10 stat holidays:</strong> New Year's, Family Day, Good Friday, Victoria Day, Canada Day, BC Day, Labour Day, Truth & Reconciliation Day, Thanksgiving, Christmas</li>
          </ul>
        </div>
      )
    },
    {
      title: 'How quickly can you start processing our payroll?',
      content: 'We can typically start within 1-2 business days. We\'ll need employee information (names, SINs, TD1 forms, pay rates), and banking details for direct deposit. First payroll includes setup, then it\'s smooth sailing!'
    }
  ];

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
                  <Users size={48} />
                  <h1 className="text-5xl font-bold">Payroll Services</h1>
                </div>
                <p className="text-xl text-white/90 mb-8">
                  Accurate payroll processing, on-time remittances, and happy employees. We handle the complexity so you can focus on your business.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <DollarSign className="mb-2" />
                    <div className="font-bold text-2xl">From $50</div>
                    <div className="text-sm text-white/80">Per month</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Clock className="mb-2" />
                    <div className="font-bold text-2xl">Any Frequency</div>
                    <div className="text-sm text-white/80">Weekly to Monthly</div>
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
                    'Unlimited payroll runs (weekly, bi-weekly, monthly)',
                    'CPP, EI, and income tax calculations',
                    'CRA source deduction remittances',
                    'T4 and T4A preparation & filing',
                    'ROE (Record of Employment)',
                    'Direct deposit or cheque printing',
                    'Employee pay stubs',
                    'Year-round support'
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

        {/* Stats */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <CountUpStat end={100} suffix="%" label="Accuracy Rate" />
              <CountUpStat end={0} label="Late Remittances" />
              <CountUpStat end={500} suffix="+" label="Employees Paid Monthly" />
            </div>
          </div>
        </section>

        {/* Payroll Calculator */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-navy text-center mb-4">
                Calculate Your Payroll Cost
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Get an instant estimate based on your employee count and pay frequency
              </p>

              <div className="bg-white rounded-lg shadow-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block font-semibold text-navy mb-3">
                      Number of Employees
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={employeeCount}
                      onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-center mt-2">
                      <span className="text-4xl font-bold text-gator-green-dark">{employeeCount}</span>
                      <span className="text-gray-600 ml-2">employees</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-navy mb-3">
                      Pay Frequency
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'weekly', label: 'Weekly (52 times/year)' },
                        { value: 'biweekly', label: 'Bi-Weekly (26 times/year)' },
                        { value: 'semimonthly', label: 'Semi-Monthly (24 times/year)' },
                        { value: 'monthly', label: 'Monthly (12 times/year)' }
                      ].map((freq) => (
                        <label
                          key={freq.value}
                          className={`block p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            payFrequency === freq.value
                              ? 'border-gator-green-dark bg-gator-green-light'
                              : 'border-gray-200 hover:border-gator-green'
                          }`}
                        >
                          <input
                            type="radio"
                            name="frequency"
                            value={freq.value}
                            checked={payFrequency === freq.value}
                            onChange={(e) => setPayFrequency(e.target.value)}
                            className="mr-3"
                          />
                          {freq.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="btn-primary w-full"
                >
                  <Calculator className="inline mr-2" size={20} />
                  Calculate Cost
                </button>

                {estimatedCost && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 bg-gradient-to-br from-gator-green-light to-white p-8 rounded-lg text-center"
                  >
                    <h3 className="text-2xl font-bold text-navy mb-4">Your Estimated Cost</h3>
                    <div className="text-6xl font-bold text-gator-green-dark mb-2">
                      ${estimatedCost}<span className="text-3xl">/month</span>
                    </div>
                    <p className="text-gray-600 mb-6">
                      For {employeeCount} employee{employeeCount > 1 ? 's' : ''} • {payFrequency.charAt(0).toUpperCase() + payFrequency.slice(1)} payroll
                    </p>
                    <a href="/sign-in" className="btn-primary inline-block">
                      Get Started with Payroll
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">
              Complete Payroll Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {payrollServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <h3 className="text-2xl font-bold text-navy mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={18} className="text-gator-green-dark flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-20 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <AlertTriangle className="mx-auto mb-4 text-red-600" size={64} />
              <h2 className="text-4xl font-bold text-navy mb-4">
                Common Payroll Mistakes (And How We Prevent Them)
              </h2>
              <p className="text-xl text-gray-600">
                DIY payroll errors cost Canadian businesses millions in penalties every year
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {commonMistakes.map((mistake, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 border-l-4 border-red-500"
                >
                  <h3 className="font-bold text-navy text-xl mb-2">{mistake.title}</h3>
                  <div className="mb-3">
                    <div className="text-sm font-semibold text-red-700 mb-1">❌ The Problem:</div>
                    <p className="text-gray-700 text-sm">{mistake.problem}</p>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm font-semibold text-green-700 mb-1">✅ Our Solution:</div>
                    <p className="text-gray-700 text-sm">{mistake.solution}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <div className="text-xs font-semibold text-red-800 mb-1">💸 Cost of Mistake:</div>
                    <p className="text-red-900 text-sm font-bold">{mistake.cost}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deductions Explained */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                Understanding Payroll Deductions
              </h2>
              <p className="text-xl text-gray-600">
                Where does all that money go? Let's break it down.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion items={deductionsExplained} allowMultiple={true} defaultOpen={0} />
            </div>
          </div>
        </section>

        {/* Payroll Timeline */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">
              Important Payroll Dates & Deadlines
            </h2>

            <div className="max-w-4xl mx-auto space-y-6">
              {payrollTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-start gap-4 p-6 rounded-lg ${
                    item.important ? 'bg-amber-50 border-2 border-amber-500' : 'bg-white'
                  }`}
                >
                  <div className="text-5xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-navy text-xl">{item.event}</h3>
                      {item.important && (
                        <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          DEADLINE
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-1">{item.description}</p>
                    <p className="text-sm font-semibold text-gator-green-dark">{item.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Quiz */}
        <section className="py-20 bg-gradient-to-br from-gator-green-light to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <InteractiveQuiz
                title={payrollQuiz.title}
                description={payrollQuiz.description}
                questions={payrollQuiz.questions}
                onComplete={(answers) => console.log('Payroll quiz completed:', answers)}
              />
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">
              Simple, Transparent Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`card ${tier.popular ? 'ring-4 ring-gator-green-dark' : ''} relative`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gator-green-dark text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-navy mb-1">{tier.name}</h3>
                  <div className="text-sm text-gray-600 mb-3">{tier.employees} employees</div>
                  <div className="text-4xl font-bold text-gator-green-dark mb-4">{tier.price}</div>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-gator-green-dark flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/sign-in" className="btn-primary w-full text-center text-sm">
                    Get Started
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                Payroll Questions Answered
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our payroll services
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} defaultOpen={0} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-gator-green-dark to-gator-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Never Worry About Payroll Again
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Accurate calculations, on-time remittances, and happy employees. Every single pay period.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/sign-in" className="btn-primary bg-white text-gator-green-dark hover:bg-gray-100 inline-flex items-center gap-2">
                Start Payroll Service <ArrowRight />
              </a>
              <a href="/services" className="btn-secondary bg-transparent border-2 border-white hover:bg-white/10">
                View All Services
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Payroll;
