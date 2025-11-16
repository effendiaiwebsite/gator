import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, DollarSign, Clock, Shield, ArrowRight } from 'lucide-react';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import Accordion from '../../components/interactive/Accordion';
import GatorTooltip from '../../components/interactive/GatorTooltip';
import InteractiveQuiz from '../../components/interactive/InteractiveQuiz';

const IndividualTax = () => {
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [complexity, setComplexity] = useState('simple');

  const documents = [
    { name: 'T4 - Employment Income', required: true, checked: false },
    { name: 'T5 - Investment Income', required: false, checked: false },
    { name: 'RRSP Contribution Receipts', required: false, checked: false },
    { name: 'Medical Expenses', required: false, checked: false },
    { name: 'Charitable Donation Receipts', required: false, checked: false },
    { name: 'Rental Income/Expenses', required: false, checked: false },
    { name: 'Tuition Receipts (T2202)', required: false, checked: false },
    { name: 'Home Office Expenses', required: false, checked: false }
  ];

  const [checkedDocs, setCheckedDocs] = useState(documents);

  const handleDocCheck = (index) => {
    const updated = [...checkedDocs];
    updated[index].checked = !updated[index].checked;
    setCheckedDocs(updated);

    // Calculate complexity
    const checkedCount = updated.filter(d => d.checked).length;
    let price = 80;
    let complexityLevel = 'simple';

    if (checkedCount <= 2) {
      price = 80;
      complexityLevel = 'simple';
    } else if (checkedCount <= 4) {
      price = 150;
      complexityLevel = 'moderate';
    } else {
      price = 250;
      complexityLevel = 'complex';
    }

    setEstimatedPrice(price);
    setComplexity(complexityLevel);
  };

  const deductions = [
    {
      category: 'Employment',
      items: [
        { name: 'Home Office Expenses', description: 'If you work from home, claim a portion of rent, utilities, internet' },
        { name: 'Union Dues', description: 'Annual union or professional membership fees' },
        { name: 'Office Supplies', description: 'Supplies you purchased for work' }
      ]
    },
    {
      category: 'Medical',
      items: [
        { name: 'Prescriptions & Medications', description: 'All prescription drugs not covered by insurance' },
        { name: 'Dental & Vision', description: 'Dental work, glasses, contacts' },
        { name: 'Medical Devices', description: 'Wheelchairs, hearing aids, etc.' }
      ]
    },
    {
      category: 'Education',
      items: [
        { name: 'Tuition Fees', description: 'Post-secondary tuition (T2202)' },
        { name: 'Student Loan Interest', description: 'Interest paid on government student loans' },
        { name: 'Moving Expenses (students)', description: 'If you moved 40km+ for school' }
      ]
    },
    {
      category: 'Savings',
      items: [
        { name: 'RRSP Contributions', description: 'Reduces taxable income dollar-for-dollar' },
        { name: 'Pension Adjustments', description: 'RPP contributions' }
      ]
    }
  ];

  const credits = [
    {
      title: 'GST/HST Credit',
      content: 'Automatic quarterly payments for low to moderate income individuals and families. No application needed!'
    },
    {
      title: 'Canada Workers Benefit',
      content: 'Refundable tax credit for low-income workers. Can provide up to $1,428 for individuals or $2,461 for families.'
    },
    {
      title: 'Disability Tax Credit',
      content: 'For individuals with prolonged physical or mental impairment. Can provide up to $8,870 per year.'
    },
    {
      title: 'First-Time Home Buyers',
      content: '$10,000 credit for first-time home purchasers, worth up to $1,500.'
    },
    {
      title: 'Charitable Donations',
      content: 'First $200: 15% federal credit. Over $200: 29% federal credit (33% on amounts over $216,511).'
    }
  ];

  const eligibilityQuiz = {
    title: 'Check Your Eligibility',
    description: 'Answer these questions to see what deductions you qualify for',
    questions: [
      {
        id: 'employment',
        question: 'What is your employment status?',
        options: [
          { label: 'Employed (T4)', value: 'employed' },
          { label: 'Self-Employed', value: 'selfEmployed' },
          { label: 'Retired', value: 'retired' },
          { label: 'Student', value: 'student' }
        ]
      },
      {
        id: 'homeOwner',
        question: 'Do you own or rent your home?',
        options: [
          { label: 'Own', value: 'own' },
          { label: 'Rent', value: 'rent' },
          { label: 'Live with family', value: 'family' }
        ]
      },
      {
        id: 'dependents',
        question: 'Do you have dependents (children)?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]
      }
    ]
  };

  const faqItems = deductions.map(category => ({
    title: `${category.category} Deductions`,
    content: (
      <ul className="space-y-3">
        {category.items.map((item, index) => (
          <li key={index}>
            <strong className="text-gator-green-dark">{item.name}:</strong> {item.description}
          </li>
        ))}
      </ul>
    )
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gator-green-dark to-gator-green text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={48} />
                  <h1 className="text-5xl font-bold">Individual Tax Returns</h1>
                </div>
                <p className="text-xl text-white/90 mb-8">
                  Maximize your refund with professional tax preparation. We find every deduction you're entitled to.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <DollarSign className="mb-2" />
                    <div className="font-bold text-2xl">From $80</div>
                    <div className="text-sm text-white/80">Simple returns</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Clock className="mb-2" />
                    <div className="font-bold text-2xl">2-5 Days</div>
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
                    'Complete tax return preparation',
                    'Maximum deduction identification',
                    'RRSP contribution optimization',
                    'CRA e-filing (fastest refund)',
                    'Secure document upload portal',
                    'Year-round email support'
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

        {/* Document Checklist */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-navy text-center mb-4">
                What Documents Do You Have?
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Check off what you have to get an estimated price and complexity level
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {checkedDocs.map((doc, index) => (
                  <label
                    key={index}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      doc.checked
                        ? 'border-gator-green-dark bg-gator-green-light'
                        : 'border-gray-200 hover:border-gator-green'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={doc.checked}
                      onChange={() => handleDocCheck(index)}
                      className="mt-1 w-5 h-5 text-gator-green-dark rounded focus:ring-gator-green"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-navy">{doc.name}</div>
                      {doc.required && (
                        <span className="text-xs text-red-600">Required</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {estimatedPrice && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-gator-green-light to-white p-8 rounded-lg shadow-xl text-center"
                >
                  <h3 className="text-2xl font-bold text-navy mb-4">Your Estimate</h3>
                  <div className="text-5xl font-bold text-gator-green-dark mb-2">${estimatedPrice}</div>
                  <div className="text-lg text-gray-600 mb-4">
                    Complexity: <span className="font-semibold capitalize">{complexity}</span>
                  </div>
                  <a href="/sign-in" className="btn-primary inline-block">
                    Start Your Return
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Deductions Guide */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                Common Deductions You Might Be Missing
              </h2>
              <p className="text-xl text-gray-600">
                Most Canadians miss these! Let us find them for you.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} allowMultiple={true} />
            </div>
          </div>
        </section>

        {/* Tax Credits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                Tax Credits & Benefits
              </h2>
              <p className="text-xl text-gray-600">
                These credits can significantly reduce your tax bill or increase your refund
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {credits.map((credit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <h3 className="font-bold text-navy text-lg mb-2">{credit.title}</h3>
                  <p className="text-gray-600 text-sm">{credit.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility Quiz */}
        <section className="py-20 bg-gradient-to-br from-gator-green-light to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <InteractiveQuiz
                title={eligibilityQuiz.title}
                description={eligibilityQuiz.description}
                questions={eligibilityQuiz.questions}
                onComplete={(answers) => console.log('Quiz completed:', answers)}
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-16">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { step: 1, icon: '📤', title: 'Upload Documents', description: 'Securely upload your T4s, receipts, and other documents through our encrypted portal' },
                { step: 2, icon: '🔍', title: 'We Optimize', description: 'Our experts review your return, find every deduction, and maximize your refund' },
                { step: 3, icon: '💸', title: 'Get Your Refund', description: 'We e-file directly with CRA. Get your refund in 2-4 weeks!' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-navy text-xl mb-2">
                    {item.step}. {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-gator-green-dark to-gator-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Maximize Your Refund?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 1,547+ Canadians who've already filed with Gator Bookkeeping
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

export default IndividualTax;
