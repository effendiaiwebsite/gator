import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle, DollarSign, Clock, ArrowRight, Users, FileText, MapPin, Briefcase, Home } from 'lucide-react';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import Accordion from '../../components/interactive/Accordion';
import GatorTooltip from '../../components/interactive/GatorTooltip';
import InteractiveQuiz from '../../components/interactive/InteractiveQuiz';
import CountUpStat from '../../components/interactive/CountUpStat';

const LMIA = () => {
  const [selectedPathway, setSelectedPathway] = useState('');

  const immigrationPathways = [
    {
      id: 'lmia-work-permit',
      title: 'LMIA-Based Work Permit',
      description: 'Employer needs foreign worker, gets Labour Market Impact Assessment',
      icon: '💼',
      timeline: '2-6 months',
      bestFor: 'Workers with Canadian job offers',
      requirements: [
        'Valid job offer from Canadian employer',
        'Employer must get positive LMIA',
        'Meet job requirements (education, experience)',
        'Proof of ability to perform job'
      ]
    },
    {
      id: 'pr-express-entry',
      title: 'Express Entry (PR)',
      description: 'Points-based system for skilled workers',
      icon: '🍁',
      timeline: '6-12 months',
      bestFor: 'Skilled workers under 45 with education',
      requirements: [
        'Language test (IELTS/CELPIP)',
        'Educational Credential Assessment (ECA)',
        'Work experience documentation',
        '67+ points on selection grid',
        'Proof of funds ($13,000+ for single)'
      ]
    },
    {
      id: 'pnp',
      title: 'Provincial Nominee Program',
      description: 'BC, Ontario, etc. nominate workers they need',
      icon: '🏛️',
      timeline: '6-18 months',
      bestFor: 'Workers in high-demand occupations',
      requirements: [
        'Provincial nomination certificate',
        'Meet province-specific criteria',
        'Connection to province (job offer or education)',
        'Language requirements vary by province'
      ]
    },
    {
      id: 'family-sponsorship',
      title: 'Family Sponsorship',
      description: 'Canadian citizen or PR sponsors family member',
      icon: '👨\u200d👩\u200d👧\u200d👦',
      timeline: '12-24 months',
      bestFor: 'Spouses, parents, dependent children',
      requirements: [
        'Sponsor must be Canadian citizen or PR',
        'Sponsor must meet income requirements',
        'Relationship proof (marriage certificate, birth certificate)',
        'Medical exam',
        'Police clearance'
      ]
    }
  ];

  const lmiaProcess = [
    {
      step: 1,
      title: 'Employer Posts Job',
      duration: '4 weeks minimum',
      description: 'Advertise position on Job Bank and 2+ other sources',
      documents: [
        'Job posting on Job Bank',
        'Advertisements (Indeed, LinkedIn, newspaper)',
        'Proof of recruitment efforts',
        'Copy of job description'
      ],
      gatortip: 'Ads must run for minimum 4 weeks before applying for LMIA. We help craft compliant job postings.'
    },
    {
      step: 2,
      title: 'Demonstrate Recruitment Efforts',
      duration: 'Concurrent with posting',
      description: 'Show you tried to hire Canadians first',
      documents: [
        'List of all applicants',
        'Reasons why Canadians weren\'t hired',
        'Interview notes',
        'Communication records'
      ],
      gatortip: 'This is where most applications fail. We help document genuine recruitment efforts properly.'
    },
    {
      step: 3,
      title: 'Prepare LMIA Application',
      duration: '1-2 weeks',
      description: 'Complete forms and gather supporting documents',
      documents: [
        'LMIA application form (EMP5593)',
        'Business documents (incorporation, financials)',
        'Job offer details',
        'Transition plan (how you\'ll eventually hire Canadian)',
        'LMIA fee: $1,000'
      ],
      gatortip: 'We prepare the entire application package with proper documentation and explanations.'
    },
    {
      step: 4,
      title: 'Submit to Service Canada',
      duration: '1 day',
      description: 'File complete application',
      documents: [
        'Completed application',
        'All supporting documents',
        'Payment confirmation'
      ],
      gatortip: 'Online submission preferred. We handle the filing and track your application.'
    },
    {
      step: 5,
      title: 'Processing & Decision',
      duration: '8-12 weeks average',
      description: 'Service Canada reviews and may request additional information',
      documents: [
        'Response to any information requests',
        'Additional clarifications if needed'
      ],
      gatortip: 'Processing times vary by occupation and location. High-wage positions often faster.'
    },
    {
      step: 6,
      title: 'Receive LMIA Decision',
      duration: '1 day',
      description: 'Positive, negative, or additional info requested',
      documents: [
        'LMIA confirmation letter (if positive)',
        'LMIA number for work permit application'
      ],
      gatortip: 'Positive LMIA valid for 6 months. Worker must apply for work permit within this time.'
    },
    {
      step: 7,
      title: 'Worker Applies for Work Permit',
      duration: '2-8 weeks',
      description: 'Foreign worker uses positive LMIA to get work permit',
      documents: [
        'LMIA confirmation',
        'Job offer letter',
        'Passport',
        'Photos',
        'Work permit application fee'
      ],
      gatortip: 'We help coordinate timing so worker can come to Canada quickly after LMIA approval.'
    }
  ];

  const commonOccupations = {
    'High-Wage (above provincial median)': [
      { job: 'Software Developers', median: '$92,000', processingTime: '8-10 weeks', demand: 'Very High' },
      { job: 'Registered Nurses', median: '$80,000', processingTime: '8-12 weeks', demand: 'Very High' },
      { job: 'Engineers', median: '$85,000', processingTime: '8-10 weeks', demand: 'High' },
      { job: 'Financial Managers', median: '$95,000', processingTime: '8-12 weeks', demand: 'High' },
      { job: 'Accountants', median: '$70,000', processingTime: '10-12 weeks', demand: 'Medium' }
    ],
    'Low-Wage (below provincial median)': [
      { job: 'Food Service Workers', median: '$32,000', processingTime: '10-16 weeks', demand: 'High' },
      { job: 'Retail Salespersons', median: '$35,000', processingTime: '12-16 weeks', demand: 'Medium' },
      { job: 'General Labourers', median: '$38,000', processingTime: '12-16 weeks', demand: 'Medium' },
      { job: 'Truck Drivers', median: '$48,000', processingTime: '10-14 weeks', demand: 'Very High' },
      { job: 'Construction Workers', median: '$52,000', processingTime: '10-14 weeks', demand: 'High' }
    ]
  };

  const provincialMedianWages = [
    { province: 'British Columbia', median: '$27.00/hour ($56,160/year)', year: '2024' },
    { province: 'Ontario', median: '$26.06/hour ($54,205/year)', year: '2024' },
    { province: 'Alberta', median: '$28.85/hour ($60,008/year)', year: '2024' },
    { province: 'Quebec', median: '$25.00/hour ($52,000/year)', year: '2024' }
  ];

  const refusalReasons = [
    {
      reason: 'Inadequate Recruitment',
      description: 'Didn\'t advertise widely or long enough',
      howToAvoid: 'Advertise on Job Bank + 2 other sources for minimum 4 weeks. Document all efforts.',
      frequency: 'Very Common'
    },
    {
      reason: 'Canadians Available',
      description: 'Service Canada believes qualified Canadians applied',
      howToAvoid: 'Provide detailed reasons why each Canadian applicant wasn\'t suitable. Be specific and job-related.',
      frequency: 'Very Common'
    },
    {
      reason: 'Wages Too Low',
      description: 'Offered wage below median for occupation',
      howToAvoid: 'Check Job Bank wage data. Offer at least median wage for your province and occupation.',
      frequency: 'Common'
    },
    {
      reason: 'Unclear Transition Plan',
      description: 'No plan to reduce reliance on foreign workers',
      howToAvoid: 'Show training plans, recruitment strategies, or business changes to hire Canadians eventually.',
      frequency: 'Common'
    },
    {
      reason: 'Business Legitimacy',
      description: 'Concerns about whether business is real or viable',
      howToAvoid: 'Provide recent financial statements, tax returns, proof of operations, lease agreements.',
      frequency: 'Moderate'
    },
    {
      reason: 'Job Doesn\'t Match NOC',
      description: 'Job duties don\'t align with stated occupation code',
      howToAvoid: 'Ensure job description accurately matches NOC duties. Use official NOC language.',
      frequency: 'Moderate'
    }
  ];

  const documentsPR = {
    'Identity Documents': [
      'Valid passport (all pages)',
      'Birth certificate',
      'National identity card',
      'Travel documents for last 10 years'
    ],
    'Language Proficiency': [
      'IELTS General or CELPIP results (less than 2 years old)',
      'TEF or TCF for French',
      'Must meet CLB 7+ for skilled worker programs'
    ],
    'Education': [
      'Educational Credential Assessment (WES, IQAS, etc.)',
      'University transcripts',
      'Degree certificates',
      'Professional certifications'
    ],
    'Work Experience': [
      'Reference letters from all employers (last 10 years)',
      'Employment contracts',
      'Pay stubs',
      'T4s if worked in Canada'
    ],
    'Financial': [
      'Bank statements (6 months minimum)',
      'Proof of funds ($13,310 for single, $16,570 for couple)',
      'Investment statements',
      'Property deeds'
    ],
    'Medical & Security': [
      'Medical exam from panel physician',
      'Police clearance (all countries lived 6+ months since age 18)',
      'Schedule A form (background declaration)'
    ]
  };

  const eligibilityQuiz = {
    title: 'Check Your Immigration Eligibility',
    description: 'Answer these questions to see which pathway might work for you',
    questions: [
      {
        id: 'status',
        question: 'What is your current status?',
        options: [
          { label: 'I\'m outside Canada', value: 'outside' },
          { label: 'I\'m in Canada on work permit', value: 'workPermit', description: 'May qualify for CEC' },
          { label: 'I\'m in Canada on study permit', value: 'study', description: 'PGWP then PR possible' },
          { label: 'I\'m in Canada as visitor', value: 'visitor' }
        ]
      },
      {
        id: 'jobOffer',
        question: 'Do you have a Canadian job offer?',
        options: [
          { label: 'Yes, with LMIA', value: 'lmia', description: '+50 Express Entry points!' },
          { label: 'Yes, LMIA-exempt', value: 'exempt' },
          { label: 'Yes, but no LMIA yet', value: 'noLmia', description: 'We can help with LMIA' },
          { label: 'No job offer', value: 'no' }
        ]
      },
      {
        id: 'experience',
        question: 'How many years of skilled work experience do you have?',
        options: [
          { label: 'Less than 1 year', value: 'none', description: 'Build experience first' },
          { label: '1-2 years', value: '1-2', description: 'Minimum for Express Entry' },
          { label: '3+ years', value: '3plus', description: 'Good! More points' }
        ]
      }
    ]
  };

  const faqItems = [
    {
      title: 'What is an LMIA and why do I need one?',
      content: (
        <div>
          <p className="mb-3">LMIA = Labour Market Impact Assessment. It's proof that:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>There's a genuine job available in Canada</li>
            <li>No Canadian citizen or PR can fill the position</li>
            <li>Hiring a foreign worker won't negatively affect Canadian labor market</li>
            <li>The wage offered is fair (at least median for the occupation)</li>
          </ul>
          <p className="mt-3">Service Canada (part of federal government) reviews LMIA applications. If approved, the foreign worker can use the positive LMIA to apply for a work permit.</p>
          <div className="mt-3 bg-blue-50 border-l-4 border-blue-500 p-3">
            <p className="text-sm"><strong>Note:</strong> Some jobs are LMIA-exempt (NAFTA, intra-company transfers, CETA, etc.). We help determine if you need an LMIA or qualify for exemption.</p>
          </div>
        </div>
      )
    },
    {
      title: 'How long does the LMIA process take?',
      content: (
        <div>
          <p className="mb-3">Timeline breakdown:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Job advertising:</strong> 4 weeks minimum</li>
            <li><strong>Application preparation:</strong> 1-2 weeks</li>
            <li><strong>Service Canada processing:</strong> 8-16 weeks (varies by occupation and wage level)</li>
            <li><strong>Work permit application:</strong> 2-8 weeks after positive LMIA</li>
          </ul>
          <p className="mt-3"><strong>Total: 4-6 months typically</strong> from start to worker arriving in Canada.</p>
          <div className="mt-3 bg-green-50 border-l-4 border-green-500 p-3">
            <p className="text-sm"><strong>Faster processing:</strong> High-wage positions (above provincial median) and in-demand occupations often process in 8-10 weeks instead of 12-16 weeks.</p>
          </div>
        </div>
      )
    },
    {
      title: 'What documents do you help prepare?',
      content: (
        <div>
          <p className="mb-3">We assist with the complete package:</p>
          <div className="space-y-3">
            <div>
              <strong className="text-navy">For LMIA Applications:</strong>
              <ul className="list-disc ml-6 mt-1 text-sm">
                <li>Job posting (compliant with all requirements)</li>
                <li>Recruitment report (documenting why Canadians weren't hired)</li>
                <li>Business documents (incorporation, financial statements, tax returns)</li>
                <li>Transition plan (plan to reduce reliance on foreign workers)</li>
                <li>Employer compliance form</li>
              </ul>
            </div>
            <div>
              <strong className="text-navy">For Permanent Residency:</strong>
              <ul className="list-disc ml-6 mt-1 text-sm">
                <li>Educational Credential Assessment coordination</li>
                <li>Employment reference letters (proper format crucial)</li>
                <li>Document translation (if needed)</li>
                <li>Proof of funds documentation</li>
                <li>Application forms (IMM 0008, Schedule A, etc.)</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'How much does LMIA support cost?',
      content: (
        <div>
          <p className="mb-3">Our fees are separate from government fees:</p>
          <div className="bg-gray-50 p-4 rounded mb-3">
            <strong className="text-navy">Government Fees:</strong>
            <ul className="list-disc ml-6 mt-2 text-sm">
              <li>LMIA application fee: $1,000 (paid to Service Canada)</li>
              <li>Work permit fee: $155 (paid to IRCC)</li>
              <li>Open work permit holder fee (if applicable): $100</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-gator-green-light to-white p-4 rounded">
            <strong className="text-navy">Our Service Fees:</strong>
            <ul className="list-disc ml-6 mt-2 text-sm">
              <li>LMIA document preparation & support: From $400</li>
              <li>PR document preparation: From $600</li>
              <li>Complete immigration consultation: From $200</li>
            </ul>
          </div>
          <p className="mt-3 text-sm">We provide upfront quotes after reviewing your specific situation.</p>
        </div>
      )
    },
    {
      title: 'Can my family come with me?',
      content: (
        <div>
          <p className="mb-3">Yes! Your spouse and dependent children can accompany you:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Spouse:</strong> Can get open work permit (can work for any employer)</li>
            <li><strong>Dependent children under 18:</strong> Can attend school (elementary/secondary free)</li>
            <li><strong>Dependent children 18-22:</strong> Study permit required for post-secondary</li>
          </ul>
          <div className="mt-3 bg-green-50 border-l-4 border-green-500 p-3">
            <p className="text-sm"><strong>Big Benefit:</strong> If you have a skilled work permit (NOC 0, A, or B), your spouse gets an open work permit automatically. This means two incomes while in Canada!</p>
          </div>
          <p className="mt-3">We help with family applications concurrently with your work permit application.</p>
        </div>
      )
    },
    {
      title: 'What is Express Entry?',
      content: (
        <div>
          <p className="mb-3">Express Entry is Canada's main permanent residency system for skilled workers. It has three programs:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Federal Skilled Worker (FSW):</strong> Points-based on age, education, language, experience (most common)</li>
            <li><strong>Canadian Experience Class (CEC):</strong> For people who already worked in Canada</li>
            <li><strong>Federal Skilled Trades:</strong> For electricians, plumbers, welders, etc.</li>
          </ul>
          <p className="mt-3"><strong>How it works:</strong></p>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li>Create profile, get ranked by CRS (Comprehensive Ranking System) score</li>
            <li>Wait for Invitation to Apply (ITA) - usually need 480+ points</li>
            <li>Once invited, submit full PR application (60 days to prepare)</li>
            <li>Get PR in 6-12 months</li>
          </ol>
          <div className="mt-3 bg-blue-50 p-3 rounded">
            <p className="text-sm"><strong>Provincial Nominee Programs (PNP)</strong> give +600 CRS points, essentially guaranteeing ITA. We help identify PNP opportunities for your profile.</p>
          </div>
        </div>
      )
    },
    {
      title: 'Do you guarantee LMIA approval?',
      content: (
        <div>
          <p className="mb-3">Honest answer: <strong>No one can guarantee approval.</strong> Service Canada makes the final decision.</p>
          <p className="mb-3">What we CAN do:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Maximize approval chances:</strong> We know what Service Canada looks for and prepare accordingly</li>
            <li><strong>Avoid common mistakes:</strong> Most refusals are preventable with proper preparation</li>
            <li><strong>Professional presentation:</strong> Well-organized applications with clear explanations</li>
            <li><strong>Honest assessment:</strong> If we think your case is weak, we'll tell you upfront</li>
          </ul>
          <div className="mt-3 bg-amber-50 border-l-4 border-amber-500 p-3">
            <p className="text-sm"><strong>⚠️ Beware of guarantees:</strong> Anyone promising LMIA approval is either lying or planning to do something fraudulent. Service Canada audits approved LMIAs and can revoke them.</p>
          </div>
          <p className="mt-3">Our success rate is high because we only take cases we believe have merit, and we prepare them thoroughly.</p>
        </div>
      )
    },
    {
      title: 'Can I apply for PR while on a work permit?',
      content: (
        <div>
          <p className="mb-3"><strong>Yes! This is actually very common and recommended.</strong></p>
          <p className="mb-3">The pathway:</p>
          <ol className="list-decimal ml-6 space-y-2">
            <li><strong>Work Permit:</strong> Come to Canada, work for 1-2 years</li>
            <li><strong>Gain Canadian Experience:</strong> This gives you CEC eligibility + extra Express Entry points</li>
            <li><strong>Apply for PR:</strong> While still working on your permit</li>
            <li><strong>Get PR:</strong> Transition from temporary to permanent resident</li>
          </ol>
          <div className="mt-3 bg-green-50 border-l-4 border-green-500 p-3">
            <p className="text-sm"><strong>Advantage:</strong> Working in Canada gives you Canadian experience points, and if you improve your language skills or get Canadian education, your Express Entry score increases.</p>
          </div>
          <p className="mt-3">We help plan the full pathway from initial work permit to PR, not just one step at a time.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Globe size={48} />
                  <h1 className="text-5xl font-bold">LMIA & Immigration Support</h1>
                </div>
                <p className="text-xl text-white/90 mb-8">
                  Comprehensive document preparation for LMIA applications, work permits, and permanent residency. We've helped hundreds of families make Canada home.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <DollarSign className="mb-2" />
                    <div className="font-bold text-2xl">From $400</div>
                    <div className="text-sm text-white/80">LMIA support</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Clock className="mb-2" />
                    <div className="font-bold text-2xl">4-6 Months</div>
                    <div className="text-sm text-white/80">Average timeline</div>
                  </div>
                </div>
                <a href="/sign-in" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                  Get Started
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold mb-4">What We Help With</h3>
                <ul className="space-y-3">
                  {[
                    'LMIA application preparation & documentation',
                    'Work permit applications',
                    'Express Entry profile creation',
                    'Provincial Nominee Program (PNP)',
                    'Family sponsorship documentation',
                    'Educational Credential Assessment coordination',
                    'Employment reference letters',
                    'Document translation & certification',
                    'Full immigration pathway planning'
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <CountUpStat end={500} suffix="+" label="Families Helped" />
              <CountUpStat end={85} suffix="%" label="Approval Rate" />
              <CountUpStat end={15} suffix="+" label="Countries Represented" />
              <CountUpStat end={20} suffix="+" label="Years Combined Experience" />
            </div>
          </div>
        </section>

        {/* Immigration Pathways */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                Immigration Pathways to Canada
              </h2>
              <p className="text-xl text-gray-600">
                Different paths to living and working in Canada. Choose what fits your situation:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {immigrationPathways.map((pathway, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedPathway(pathway.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`card text-left cursor-pointer transition-all ${
                    selectedPathway === pathway.id
                      ? 'ring-4 ring-blue-600'
                      : 'hover:shadow-xl'
                  }`}
                >
                  <div className="text-5xl mb-3">{pathway.icon}</div>
                  <h3 className="text-2xl font-bold text-navy mb-2">{pathway.title}</h3>
                  <p className="text-gray-600 mb-4">{pathway.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <Clock size={16} className="inline mr-1 text-blue-600" />
                      <strong>Timeline:</strong> {pathway.timeline}
                    </div>
                    <div>
                      <Users size={16} className="inline mr-1 text-blue-600" />
                      <strong>Best for:</strong>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{pathway.bestFor}</p>
                </motion.button>
              ))}
            </div>

            {selectedPathway && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg shadow-xl max-w-4xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-navy mb-4">
                  {immigrationPathways.find(p => p.id === selectedPathway).title} - Requirements
                </h3>
                <ul className="space-y-2">
                  {immigrationPathways.find(p => p.id === selectedPathway).requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
                <a href="/sign-in" className="btn-primary mt-6 inline-block">
                  Get Help with {immigrationPathways.find(p => p.id === selectedPathway).title}
                </a>
              </motion.div>
            )}
          </div>
        </section>

        {/* LMIA Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                The LMIA Process: Step-by-Step
              </h2>
              <p className="text-xl text-gray-600">
                What to expect from start to finish
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
              {lmiaProcess.map((step, index) => (
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
                      <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold text-navy">{step.title}</h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                          <FileText size={18} className="text-blue-600" />
                          Required Documents:
                        </h4>
                        <ul className="space-y-1">
                          {step.documents.map((doc, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-500 p-3">
                        <p className="text-sm">
                          <strong className="text-green-800">🐊 Gator Tip:</strong> {step.gatortip}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Occupations & Processing Times */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">
              Common Occupations & Expected Processing Times
            </h2>

            <div className="max-w-6xl mx-auto space-y-8">
              {Object.entries(commonOccupations).map(([category, jobs], index) => (
                <div key={index}>
                  <h3 className="text-2xl font-bold text-navy mb-4">{category}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                      <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <tr>
                          <th className="px-6 py-3 text-left">Occupation</th>
                          <th className="px-6 py-3 text-left">Median Wage (BC)</th>
                          <th className="px-6 py-3 text-left">Processing Time</th>
                          <th className="px-6 py-3 text-left">Demand Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map((job, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 font-semibold text-navy">{job.job}</td>
                            <td className="px-6 py-4 text-gray-700">{job.median}</td>
                            <td className="px-6 py-4 text-gray-700">{job.processingTime}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                job.demand === 'Very High' ? 'bg-green-100 text-green-800' :
                                job.demand === 'High' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {job.demand}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 max-w-4xl mx-auto">
              <h4 className="font-bold text-navy mb-4">Provincial Median Wages (2024):</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {provincialMedianWages.map((prov, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-navy">{prov.province}</h5>
                    <p className="text-blue-600 font-bold">{prov.median}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Refusal Reasons */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                Common LMIA Refusal Reasons (And How to Avoid Them)
              </h2>
              <p className="text-xl text-gray-600">
                Learn from others' mistakes. Most refusals are preventable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {refusalReasons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card border-l-4 border-red-500"
                >
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-navy">{item.reason}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.frequency === 'Very Common' ? 'bg-red-100 text-red-800' :
                        item.frequency === 'Common' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.frequency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-green-800 mb-1">✅ How to Avoid:</p>
                    <p className="text-xs text-gray-700">{item.howToAvoid}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PR Document Checklist */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                Permanent Residency: What You'll Need
              </h2>
              <p className="text-xl text-gray-600">
                Complete document checklist for Express Entry and PNP applications
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(documentsPR).map(([category, docs], index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <h3 className="text-xl font-bold text-navy mb-4">{category}</h3>
                  <ul className="space-y-2">
                    {docs.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility Quiz */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <InteractiveQuiz
                title={eligibilityQuiz.title}
                description={eligibilityQuiz.description}
                questions={eligibilityQuiz.questions}
                onComplete={(answers) => console.log('Immigration quiz completed:', answers)}
                completionMessage="Great news! Based on your answers, there may be immigration pathways available for you. Canada welcomes skilled workers and families through various programs."
                completionTip="Sign up for your portal to get a detailed assessment of your immigration options. Our team can help you understand which pathway is best for your situation and guide you through the document preparation process."
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">
                Immigration Questions Answered
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about coming to Canada
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} defaultOpen={0} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Canadian Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let us help you navigate the immigration process. We've helped hundreds of families make Canada home.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/sign-in" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 inline-flex items-center gap-2">
                Get Immigration Help <ArrowRight />
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

export default LMIA;
