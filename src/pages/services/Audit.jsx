import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Shield, Clock, ArrowRight, FileText, Mail, Phone, AlertCircle, DollarSign, FileCheck } from 'lucide-react';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import Accordion from '../../components/interactive/Accordion';
import GatorTooltip from '../../components/interactive/GatorTooltip';
import InteractiveQuiz from '../../components/interactive/InteractiveQuiz';

const Audit = () => {
  const [auditType, setAuditType] = useState('');

  const auditTypes = [
    {
      type: 'review',
      title: 'Document Review',
      severity: 'low',
      description: 'CRA requests specific documents or receipts to verify claims',
      icon: '📄',
      timeline: '30 days to respond',
      commonReasons: ['Large deductions', 'Home office claims', 'Business expenses'],
      ourHelp: 'We organize documents, prepare explanations, and submit responses'
    },
    {
      type: 'desk-audit',
      title: 'Desk Audit',
      severity: 'medium',
      description: 'CRA auditor reviews your return at their office, requests documents by mail',
      icon: '🖥️',
      timeline: '30-90 days process',
      commonReasons: ['Discrepancies in income', 'Unusual patterns', 'Industry-specific triggers'],
      ourHelp: 'Full audit representation, document preparation, and negotiation'
    },
    {
      type: 'field-audit',
      title: 'Field Audit',
      severity: 'high',
      description: 'CRA auditor visits your business premises for in-person examination',
      icon: '🏢',
      timeline: '6-12 months',
      commonReasons: ['Large revenue discrepancies', 'Multiple years of issues', 'Industry audits'],
      ourHelp: 'On-site representation, full document review, appeal preparation if needed'
    },
    {
      type: 'reassessment',
      title: 'Notice of Reassessment',
      severity: 'medium',
      description: 'CRA has changed your return and is demanding additional tax',
      icon: '📩',
      timeline: '90 days to object',
      commonReasons: ['Denied deductions', 'Unreported income found', 'Calculation errors'],
      ourHelp: 'Review reassessment, file objection, negotiate settlement'
    }
  ];

  const auditTriggers = [
    {
      category: 'Income Discrepancies',
      triggers: [
        { item: 'Unreported T4/T5 income', explanation: 'CRA automatically matches slips to your return' },
        { item: 'Cash business with low income', explanation: 'Restaurants, retail, contractors often flagged' },
        { item: 'Large year-over-year income changes', explanation: 'Sudden drops raise red flags' },
        { item: 'Lifestyle doesn\'t match reported income', explanation: 'CRA cross-references property, vehicles, travel' }
      ]
    },
    {
      category: 'Deduction Red Flags',
      triggers: [
        { item: 'Home office claims over 20%', explanation: 'Larger claims scrutinized more heavily' },
        { item: 'Vehicle expenses over 50%', explanation: 'Personal vs. business use questioned' },
        { item: 'Meals & entertainment over industry norms', explanation: 'Compared to similar businesses' },
        { item: 'Charitable donations over 20% of income', explanation: 'Unusually high donations verified' }
      ]
    },
    {
      category: 'Business Structure Issues',
      triggers: [
        { item: 'Personal services business (PSB)', explanation: 'Incorporated employee relationships flagged' },
        { item: 'Income splitting with family', explanation: 'Unreasonable salary to spouse/children' },
        { item: 'GST/HST refunds consistently high', explanation: 'Always in refund position triggers review' },
        { item: 'Losses for multiple consecutive years', explanation: 'Hobby vs. business determination' }
      ]
    }
  ];

  const auditStages = [
    {
      stage: 1,
      title: 'Initial Contact',
      description: 'You receive a letter or call from CRA',
      whatWeDo: [
        'Review the CRA letter with you',
        'Determine the scope of the audit',
        'Establish timeline and deadlines',
        'Advise on your rights and obligations'
      ],
      yourRights: [
        'You can have representation',
        'You have 30 days minimum to respond',
        'You can request extensions if needed'
      ]
    },
    {
      stage: 2,
      title: 'Information Gathering',
      description: 'Collect all requested documents and prepare explanations',
      whatWeDo: [
        'Create document checklist',
        'Review all receipts and records',
        'Prepare supporting explanations',
        'Organize into clear submission packages'
      ],
      yourRights: [
        'Only provide what was requested',
        'You can clarify confusing requests',
        'Documents must be reasonable to produce'
      ]
    },
    {
      stage: 3,
      title: 'Audit Examination',
      description: 'CRA reviews documents and may ask follow-up questions',
      whatWeDo: [
        'Act as primary contact with CRA',
        'Answer auditor questions professionally',
        'Provide additional context when helpful',
        'Push back on unreasonable requests'
      ],
      yourRights: [
        'You can have us present at all meetings',
        'You can review auditor\'s notes',
        'Discussions can be in writing (we recommend this)'
      ]
    },
    {
      stage: 4,
      title: 'Audit Conclusion',
      description: 'CRA issues findings - either no change, reassessment, or penalties',
      whatWeDo: [
        'Review proposed adjustments',
        'Negotiate with auditor if reasonable',
        'Calculate interest and penalties',
        'Advise on next steps (accept or object)'
      ],
      yourRights: [
        'You can object within 90 days',
        'You can request taxpayer relief',
        'You can appeal to Tax Court if needed'
      ]
    }
  ];

  const commonOutcomes = [
    {
      outcome: 'No Change',
      probability: '20%',
      description: 'CRA accepts your return as filed',
      whatHappens: 'Audit file closed, no further action needed',
      icon: '✅',
      color: 'green'
    },
    {
      outcome: 'Minor Adjustments',
      probability: '50%',
      description: 'Small changes, usually under $5,000',
      whatHappens: 'Pay the difference plus interest, move on',
      icon: '⚖️',
      color: 'blue'
    },
    {
      outcome: 'Significant Reassessment',
      probability: '25%',
      description: 'Major denied deductions or unreported income',
      whatHappens: 'Large balance owing, consider objection or payment plan',
      icon: '⚠️',
      color: 'orange'
    },
    {
      outcome: 'Gross Negligence Penalties',
      probability: '5%',
      description: 'CRA believes you intentionally misrepresented',
      whatHappens: '50% penalty on top of tax + interest, definitely object',
      icon: '🚨',
      color: 'red'
    }
  ];

  const documentChecklist = {
    'Personal Tax Audit': [
      'All T4, T5, T3 slips',
      'Bank statements for full year',
      'Credit card statements',
      'Investment statements',
      'Receipts for claimed deductions',
      'Mileage logs (if claiming vehicle)',
      'Home office floor plan & expenses',
      'Medical expense receipts',
      'Donation receipts',
      'RRSP contribution receipts'
    ],
    'Business Tax Audit': [
      'Complete financial statements',
      'General ledger',
      'Bank statements (business accounts)',
      'Sales invoices and records',
      'Expense receipts (organized by category)',
      'Payroll records & remittances',
      'GST/HST filings and remittances',
      'Asset purchase agreements',
      'Vehicle logs',
      'Contracts with clients/suppliers'
    ],
    'GST/HST Audit': [
      'GST/HST returns (all periods)',
      'Sales invoices showing GST collected',
      'Purchase invoices showing ITCs claimed',
      'Export documentation (zero-rated)',
      'Bad debt write-off documentation',
      'Capital asset purchases',
      'Vehicle purchase documents',
      'Bank statements matching returns'
    ]
  };

  const auditQuiz = {
    title: 'Are You At Risk of Audit?',
    description: 'Answer these questions to assess your audit risk level',
    questions: [
      {
        id: 'homeOffice',
        question: 'Do you claim home office expenses?',
        options: [
          { label: 'No', value: 'no', description: 'Low risk' },
          { label: 'Yes, under 20% of home', value: 'under20', description: 'Moderate risk - keep good records!' },
          { label: 'Yes, over 20% of home', value: 'over20', description: 'Higher risk - ensure fully documented' },
          { label: 'Yes, 100% of home', value: '100', description: '⚠️ Very high risk unless legitimately home-based' }
        ]
      },
      {
        id: 'cashBusiness',
        question: 'Do you operate a cash-based business?',
        options: [
          { label: 'No, mostly credit/debit', value: 'no' },
          { label: 'Some cash (under 30%)', value: 'some' },
          { label: 'Mostly cash (over 50%)', value: 'mostly', description: 'Higher audit risk - detailed records crucial' },
          { label: 'All cash', value: 'all', description: '⚠️ Very high risk - CRA targets cash businesses' }
        ]
      },
      {
        id: 'deductions',
        question: 'How do your business deductions compare to revenue?',
        options: [
          { label: 'Normal (30-50%)', value: 'normal' },
          { label: 'High (50-80%)', value: 'high', description: 'Above average - be ready to explain' },
          { label: 'Very high (80%+)', value: 'veryHigh', description: '⚠️ Definitely flagged - need solid backup' },
          { label: 'Loss position', value: 'loss', description: 'Multiple years of losses trigger review' }
        ]
      }
    ]
  };

  const faqItems = [
    {
      title: 'What are my rights during a CRA audit?',
      content: (
        <div>
          <p className="mb-3">You have important rights protected by the Taxpayer Bill of Rights:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Right to representation:</strong> You can have us communicate with CRA on your behalf</li>
            <li><strong>Right to review:</strong> See all documents CRA is using against you</li>
            <li><strong>Right to complain:</strong> Escalate to CRA supervisor or Taxpayers' Ombudsperson</li>
            <li><strong>Right to information:</strong> Understand why you're being audited and what they're looking for</li>
            <li><strong>Right to impartial treatment:</strong> Fair and unbiased examination</li>
            <li><strong>Right to privacy:</strong> CRA can only request relevant information</li>
          </ul>
          <p className="mt-3 text-green-700 font-semibold">💚 We ensure CRA respects all your rights throughout the process.</p>
        </div>
      )
    },
    {
      title: 'How long can CRA go back in an audit?',
      content: (
        <div>
          <p className="mb-2">Depends on the situation:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Normal reassessment period:</strong> 3 years from the Notice of Assessment</li>
            <li><strong>With suspicion of carelessness:</strong> CRA can go back further</li>
            <li><strong>With evidence of fraud or misrepresentation:</strong> No time limit</li>
            <li><strong>Waiver signed:</strong> Extends the normal period (we advise on whether to sign)</li>
          </ul>
          <p className="mt-3">Example: For your 2020 return assessed in April 2021, normal period ends April 2024. But if CRA suspects you "forgot" significant income, they could reassess 2020 even in 2025 or later.</p>
        </div>
      )
    },
    {
      title: 'What happens if I can\'t pay the assessment?',
      content: (
        <div>
          <p className="mb-3">Several options exist:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Payment arrangement:</strong> CRA offers installment plans (they charge interest)</li>
            <li><strong>Taxpayer relief:</strong> Request to waive interest/penalties if you have a good reason</li>
            <li><strong>Objection while paying:</strong> Object to the assessment while making payments</li>
            <li><strong>Consumer proposal:</strong> Legal debt settlement option</li>
          </ul>
          <p className="mt-3 bg-amber-50 border-l-4 border-amber-500 p-3 text-sm">
            <strong>⚠️ Important:</strong> Interest accrues daily on unpaid balances. Even if you object, consider paying what you reasonably can to reduce interest charges.
          </p>
        </div>
      )
    },
    {
      title: 'Should I represent myself or hire help?',
      content: (
        <div>
          <p className="mb-3">Here's our honest advice:</p>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded">
              <strong className="text-green-800">✅ You might be okay on your own if:</strong>
              <ul className="list-disc ml-6 mt-2 text-sm">
                <li>Simple document review request</li>
                <li>You have excellent records</li>
                <li>Amount in question is under $1,000</li>
              </ul>
            </div>
            <div className="bg-red-50 p-3 rounded">
              <strong className="text-red-800">❌ Definitely get professional help if:</strong>
              <ul className="list-disc ml-6 mt-2 text-sm">
                <li>Amount in question is over $5,000</li>
                <li>Multiple years being audited</li>
                <li>Gross negligence penalties proposed</li>
                <li>Criminal investigation mentioned</li>
                <li>You're not sure what CRA is asking for</li>
              </ul>
            </div>
          </div>
          <p className="mt-3">We've seen taxpayers accidentally admit to things they didn't do, or provide documents that hurt their case. Professional representation usually pays for itself.</p>
        </div>
      )
    },
    {
      title: 'What is a "gross negligence penalty"?',
      content: (
        <div>
          <p className="mb-3">The worst penalty CRA can levy (besides criminal charges):</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Penalty amount:</strong> 50% of the unpaid tax on the misrepresented amount</li>
            <li><strong>When applied:</strong> CRA believes you knowingly made false statements</li>
            <li><strong>Examples:</strong> Claiming fake expenses, not reporting cash income, inflating deductions</li>
          </ul>
          <div className="mt-3 bg-red-50 border-l-4 border-red-600 p-4">
            <p className="font-semibold text-red-900 mb-2">Example:</p>
            <p className="text-sm">You claimed $20,000 in fake expenses. Tax rate 30%. You owe $6,000 in tax + $3,000 gross negligence penalty (50% of $6,000) + interest.</p>
          </div>
          <p className="mt-3 font-semibold text-navy">If CRA proposes gross negligence penalties, contact us immediately. These can often be negotiated down or removed with proper representation.</p>
        </div>
      )
    },
    {
      title: 'Can I appeal a CRA decision?',
      content: (
        <div>
          <p className="mb-3">Yes! There's a clear appeal process:</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-gator-green-dark text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <strong>Notice of Objection</strong>
                <p className="text-sm text-gray-700">File within 90 days of reassessment. Free. CRA appeals officer reviews.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-gator-green-dark text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <strong>Tax Court of Canada (Informal Procedure)</strong>
                <p className="text-sm text-gray-700">If objection denied and amount under $25,000. Simplified process, no lawyer required.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-gator-green-dark text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <strong>Tax Court (General Procedure)</strong>
                <p className="text-sm text-gray-700">Over $25,000 or you want a formal hearing. Lawyer usually recommended.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-gator-green-dark text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <strong>Federal Court of Appeal</strong>
                <p className="text-sm text-gray-700">Final level (rare). Legal questions only.</p>
              </div>
            </div>
          </div>
          <p className="mt-3">We help with steps 1-2. For step 3+, we refer to tax lawyers we trust.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-red-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={48} />
                  <h1 className="text-5xl font-bold">CRA Audit Assistance</h1>
                </div>
                <p className="text-xl text-white/90 mb-8">
                  Being audited by CRA? Don't panic. We represent you, handle communication, and fight for the best outcome.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <DollarSign className="mb-2" />
                    <div className="font-bold text-2xl">From $500</div>
                    <div className="text-sm text-white/80">One-time fee</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Clock className="mb-2" />
                    <div className="font-bold text-2xl">Same Day</div>
                    <div className="text-sm text-white/80">Initial consultation</div>
                  </div>
                </div>
                <a href="/sign-in" className="btn-primary bg-white text-red-600 hover:bg-gray-100">
                  Get Help Now
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold mb-4">What We Do For You</h3>
                <ul className="space-y-3">
                  {[
                    'Read and explain CRA letters',
                    'Gather and organize all required documents',
                    'Communicate with CRA on your behalf',
                    'Prepare written responses and explanations',
                    'Negotiate with auditors for fair treatment',
                    'File objections if reassessment is unfair',
                    'Represent you in appeals',
                    'Minimize taxes, interest, and penalties'
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

        {/* Panic Reducer */}
        <section className="py-12 bg-yellow-50 border-y-4 border-yellow-500">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <AlertCircle className="mx-auto mb-4 text-yellow-700" size={64} />
              <h2 className="text-3xl font-bold text-navy mb-4">
                First: Take a Deep Breath
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-bold text-navy mb-2">✅ Being audited is NOT a crime</h3>
                  <p className="text-sm text-gray-700">CRA audits thousands of returns yearly. Most are random or pattern-based, not because you did something wrong.</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-bold text-navy mb-2">✅ You have rights</h3>
                  <p className="text-sm text-gray-700">You don't have to face CRA alone. You can have professional representation at every step.</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-bold text-navy mb-2">✅ Most audits end okay</h3>
                  <p className="text-sm text-gray-700">With proper documentation and professional help, many audits result in minor or no changes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Audits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-4">
              Types of CRA Audits & Reviews
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Understanding what you're facing is the first step. Click to see details:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {auditTypes.map((audit, index) => (
                <motion.button
                  key={index}
                  onClick={() => setAuditType(audit.type)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`card text-left cursor-pointer transition-all ${
                    auditType === audit.type
                      ? 'ring-4 ring-gator-green-dark'
                      : 'hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl">{audit.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      audit.severity === 'low' ? 'bg-green-100 text-green-800' :
                      audit.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {audit.severity.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-2">{audit.title}</h3>
                  <p className="text-gray-600 mb-4">{audit.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gator-green-dark" />
                      <span><strong>Timeline:</strong> {audit.timeline}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {auditType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-gradient-to-br from-gator-green-light to-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-navy mb-4">
                  {auditTypes.find(a => a.type === auditType).title} - Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Common Reasons:</h4>
                    <ul className="space-y-1">
                      {auditTypes.find(a => a.type === auditType).commonReasons.map((reason, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-gator-green-dark">•</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">How We Help:</h4>
                    <p className="text-sm text-gray-700">{auditTypes.find(a => a.type === auditType).ourHelp}</p>
                    <a href="/sign-in" className="btn-primary mt-4 inline-block">
                      Get Audit Help
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Audit Triggers */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <AlertTriangle className="mx-auto mb-4 text-orange-600" size={64} />
              <h2 className="text-4xl font-bold text-navy mb-4">
                What Triggers a CRA Audit?
              </h2>
              <p className="text-xl text-gray-600">
                Understanding risk factors helps you prepare better records
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
              {auditTriggers.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                    <AlertTriangle className="text-orange-600" />
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.triggers.map((trigger, i) => (
                      <div key={i} className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-semibold text-navy mb-1">{trigger.item}</h4>
                        <p className="text-sm text-gray-600">{trigger.explanation}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">
              The Audit Process: What to Expect
            </h2>

            <div className="max-w-5xl mx-auto space-y-6">
              {auditStages.map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="bg-gator-green-dark text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                        {stage.stage}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-navy mb-2">{stage.title}</h3>
                      <p className="text-gray-600 mb-4">{stage.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gator-green-dark mb-2 flex items-center gap-2">
                            <CheckCircle size={18} />
                            What We Do:
                          </h4>
                          <ul className="space-y-1">
                            {stage.whatWeDo.map((item, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <span className="text-gator-green-dark">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                            <Shield size={18} />
                            Your Rights:
                          </h4>
                          <ul className="space-y-1">
                            {stage.yourRights.map((item, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <span className="text-blue-700">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Possible Outcomes */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">
              Possible Audit Outcomes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {commonOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`card border-t-4 ${
                    outcome.color === 'green' ? 'border-green-500' :
                    outcome.color === 'blue' ? 'border-blue-500' :
                    outcome.color === 'orange' ? 'border-orange-500' :
                    'border-red-500'
                  }`}
                >
                  <div className="text-5xl mb-3">{outcome.icon}</div>
                  <h3 className="font-bold text-navy text-xl mb-2">{outcome.outcome}</h3>
                  <div className={`text-2xl font-bold mb-3 ${
                    outcome.color === 'green' ? 'text-green-600' :
                    outcome.color === 'blue' ? 'text-blue-600' :
                    outcome.color === 'orange' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {outcome.probability}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{outcome.description}</p>
                  <div className="border-t pt-3 mt-3">
                    <p className="text-xs font-semibold text-gray-700">What Happens:</p>
                    <p className="text-xs text-gray-600 mt-1">{outcome.whatHappens}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Document Checklist */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <FileText className="mx-auto mb-4 text-gator-green-dark" size={64} />
              <h2 className="text-4xl font-bold text-navy mb-4">
                What Documents Will I Need?
              </h2>
              <p className="text-xl text-gray-600">
                Typical document requests by audit type
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(documentChecklist).map(([type, docs], index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card"
                  >
                    <h3 className="text-xl font-bold text-navy mb-4">{type}</h3>
                    <ul className="space-y-2">
                      {docs.map((doc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <FileCheck size={16} className="text-gator-green-dark flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <p className="text-sm">
                  <strong className="text-blue-900">💡 Gator Tip:</strong> We help you gather, organize, and present all these documents in a way CRA can easily understand. Missing something? We advise on how to proceed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Audit Risk Quiz */}
        <section className="py-20 bg-gradient-to-br from-gator-green-light to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <InteractiveQuiz
                title={auditQuiz.title}
                description={auditQuiz.description}
                questions={auditQuiz.questions}
                onComplete={(answers) => console.log('Audit risk quiz completed:', answers)}
                completionMessage="Based on your responses, we've identified potential audit risk factors in your situation. Don't worry - with proper documentation and professional guidance, most audit concerns can be addressed proactively."
                completionTip="Get ahead of any potential issues by signing up for your portal. Our experts can review your specific situation and help ensure you're audit-ready."
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                CRA Audit Questions Answered
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about dealing with CRA
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} defaultOpen={0} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-red-600 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don't Face CRA Alone
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Professional representation makes a real difference. Let us handle CRA while you focus on your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/sign-in" className="btn-primary bg-white text-red-600 hover:bg-gray-100 inline-flex items-center gap-2">
                Get Audit Help Now <ArrowRight />
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

export default Audit;
