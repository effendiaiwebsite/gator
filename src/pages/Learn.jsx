import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Calculator, FileText, Users, Building2, Globe, Shield, TrendingUp, Clock, ArrowRight, Filter, X } from 'lucide-react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import Accordion from '../components/interactive/Accordion';

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { id: 'all', label: 'All Topics', icon: BookOpen },
    { id: 'personal', label: 'Personal Tax', icon: Users },
    { id: 'business', label: 'Business', icon: Building2 },
    { id: 'deductions', label: 'Deductions & Credits', icon: Calculator },
    { id: 'immigration', label: 'Immigration', icon: Globe },
    { id: 'compliance', label: 'CRA & Compliance', icon: Shield },
    { id: 'planning', label: 'Tax Planning', icon: TrendingUp }
  ];

  const articles = [
    {
      id: 1,
      title: '2025 Tax Filing Deadlines: Complete Calendar',
      category: 'personal',
      difficulty: 'beginner',
      readTime: '5 min',
      summary: 'Never miss a deadline again. Complete guide to 2025 tax filing deadlines for individuals, businesses, and self-employed.',
      content: `
## Important 2025 Tax Deadlines

### Personal Tax Returns
- **April 30, 2025**: Deadline to file your 2024 personal tax return
- **April 30, 2025**: Deadline to pay any taxes owed (if you miss this, interest starts accruing immediately)
- **June 15, 2025**: Extended deadline for self-employed individuals and their spouses (but payment still due April 30!)

### Business Returns
- **March 31, 2025**: T2 corporate return due for December 31 year-end
- **June 30, 2025**: T2 corporate return due for March 31 year-end (3 months after fiscal year-end)
- **Balance due**: 2 months after fiscal year-end

### Quarterly Deadlines
- **January 15**: Q4 2024 installment payment
- **April 15**: Q1 2025 installment payment
- **June 15**: Q2 2025 installment payment
- **September 15**: Q3 2025 installment payment

### GST/HST Filing
- **January 31**: Annual filers for 2024
- **April 30**: Q1 2025 quarterly filers
- **July 31**: Q2 2025 quarterly filers
- **October 31**: Q3 2025 quarterly filers

**Pro Tip**: Set calendar reminders 2 weeks before each deadline. Late filing penalties start at 5% of your balance owing, plus 1% per month up to 12 months.
      `,
      tags: ['deadlines', 'filing', 'personal', 'business']
    },
    {
      id: 2,
      title: 'Top 15 Deductions Most Canadians Miss',
      category: 'deductions',
      difficulty: 'beginner',
      readTime: '8 min',
      summary: 'Stop leaving money on the table. Discover the most commonly overlooked tax deductions that could save you thousands.',
      content: `
## Deductions You Might Be Missing

### 1. Home Office Expenses (T2200 Method)
If you work from home, you can claim:
- Portion of rent/mortgage interest
- Utilities (electricity, heat, water)
- Internet and phone (work portion)
- Office supplies and equipment

**Who qualifies**: Employees required by employer to work from home and have signed T2200 form.

**Potential savings**: $2,000 - $5,000 depending on home size and usage.

### 2. Moving Expenses
Moving for work or school? Claim:
- Transportation and storage costs
- Travel expenses (meals, hotels)
- Temporary living expenses (up to 15 days)
- Costs to cancel old lease

**Requirement**: New home must be 40km closer to work/school.

### 3. Disability Tax Credit (DTC)
Significantly impacted by disability? This is a **non-refundable credit worth up to $8,870**.
- Can be transferred to supporting family member
- Retroactive claims up to 10 years
- Opens eligibility for RDSP

### 4. Medical Expenses
Claim ANY expense exceeding 3% of your net income:
- Prescription drugs & insulin
- Dental and vision care
- Mobility aids and wheelchairs
- Hearing aids
- Therapy and counseling
- Premium for private health insurance
- Medical cannabis (with prescription)

### 5. Childcare Expenses
Up to $8,000/child under 7, $5,000 for ages 7-16:
- Daycare and after-school programs
- Day camps (not overnight)
- Nanny or babysitter (with receipts & SIN)

### 6. Public Transit Passes
**REMOVED in 2017** but still confused about? No longer claimable.

### 7. Student Loan Interest
Claim interest (not principal) paid on government student loans. Carry forward unused amounts up to 5 years.

### 8. Professional Dues & Union Fees
Annual fees for professional associations, licensing bodies, union dues.

### 9. Investment Carrying Charges
- Interest on money borrowed to invest
- Investment counsel fees
- Safety deposit box (if holding investments)

### 10. Northern Residents Deduction
Live in prescribed northern zone? Claim:
- $11 per day residency deduction
- Travel benefits (2 trips/year)

### 11. Adoption Expenses
Up to $17,131 per child in eligible adoption fees.

### 12. Charitable Donations
15% federal credit on first $200, 29% on amounts above (33% if income over $221,708).

### 13. Digital News Subscriptions
Up to $500 in qualifying Canadian news subscriptions.

### 14. Tools for Tradesperson
Claim cost of tools over $1,245 (max $500 deduction).

### 15. CPP/QPP Overpayment
Changed jobs? You might have overpaid into CPP and get it refunded automatically when you file.

**How Gator Helps**: Our tax prep includes a comprehensive deduction checklist. We review ALL possible deductions for your situation - no stone left unturned.
      `,
      tags: ['deductions', 'tax credits', 'savings', 'personal']
    },
    {
      id: 3,
      title: 'Self-Employed in Canada? Your Complete Tax Guide',
      category: 'business',
      difficulty: 'intermediate',
      readTime: '12 min',
      summary: 'Everything self-employed Canadians need to know about business expenses, GST/HST, installments, and maximizing deductions.',
      content: `
## Self-Employment Tax Essentials

### Do You Need to Register for GST/HST?

**Required if**: Your revenue exceeds $30,000 in any 12-month period.

**Benefits of voluntary registration** (even under $30,000):
- Claim GST/HST paid on business expenses (Input Tax Credits)
- Appear more professional to clients
- Get refunds if expenses exceed revenue

**When to register**: Within 29 days of exceeding threshold.

### What Can You Deduct?

#### Home Office
**Percentage of home used exclusively for business:**
- Rent or mortgage interest (portion)
- Property taxes (portion)
- Home insurance (portion)
- Utilities (portion)
- Maintenance and repairs (portion)

**Example**: If your home office is 150 sq ft in a 1,500 sq ft home, you can claim 10% of eligible expenses.

#### Vehicle Expenses
Track business vs personal use. Claim business percentage of:
- Fuel and oil
- Insurance
- License and registration
- Maintenance and repairs
- Lease payments or CCA (depreciation)

**Tip**: Keep a mileage log. Apps like MileIQ make this easy.

#### Business Supplies & Equipment
- Computer, phone, software
- Office supplies
- Tools and equipment
- **CCA (Capital Cost Allowance)** for assets over $500

#### Professional Development
- Courses, books, conferences
- Professional memberships
- Industry publications

#### Marketing & Advertising
- Website hosting and design
- Business cards and brochures
- Social media ads
- Sponsorships

#### Meals & Entertainment
**50% deductible** when:
- Meeting with clients
- Business travel
- Conferences and events

#### Other Common Deductions
- Bank fees and credit card fees (business portion)
- Legal and accounting fees
- Business insurance
- Subcontractor payments
- Bad debts (if previously reported as income)

### CPP Contributions

**Bad news**: Self-employed pay BOTH employee and employer portions (10.5% up to $65,700 income).

**Good news**: You can deduct the "employer" portion on your return.

### Quarterly Tax Installments

**Who needs to pay**: If you owe more than $3,000 in taxes two years in a row.

**When**: March 15, June 15, September 15, December 15

**How much**: Based on prior year taxes or current year estimate.

**Penalty for missing**: Interest charges from the due date.

### Tax Filing Deadlines

- **June 15**: File your return (but still pay by April 30 to avoid interest!)
- **April 30**: Pay any taxes owing

### Incorporation: When Does it Make Sense?

**Consider incorporating when**:
- Income consistently over $70,000
- Want to income split with family
- Need liability protection
- Want to defer taxes and build investments in corporation

**Benefits**:
- Lower small business tax rate (9-11.5% vs 26-53% personal)
- Income splitting via dividends
- Separate legal entity

**Downsides**:
- Setup cost ($500-2,000)
- Annual filing requirements
- More complex accounting

**Talk to us**: We offer free consultations to determine if incorporation makes sense for your situation.

### Record Keeping Best Practices

**Keep for 6 years**:
- All receipts and invoices
- Bank and credit card statements
- Mileage logs
- Contracts and agreements

**Go digital**:
- Photo receipts immediately
- Use cloud accounting (QuickBooks, Wave, FreshBooks)
- Back up everything

**Separate business and personal**:
- Dedicated business bank account
- Business credit card
- Makes bookkeeping infinitely easier

### Common Mistakes to Avoid

1. **Mixing personal and business expenses** - Makes audits nightmare
2. **Missing quarterly installments** - Interest charges add up
3. **Not tracking mileage** - Leaving money on table
4. **Claiming 100% of mixed-use expenses** - Audit red flag
5. **Not saving for taxes** - April can be painful. Set aside 25-30% of income.
6. **Forgetting to register for GST/HST** - Penalties if you exceed threshold
7. **Poor record keeping** - Can't claim what you can't prove

**Our Self-Employed Package** includes T2125 preparation, expense optimization, GST/HST filing, and quarterly installment calculation.
      `,
      tags: ['self-employed', 'business', 'deductions', 'GST', 'installments']
    },
    {
      id: 4,
      title: 'RRSP vs TFSA: Which Should You Max Out First?',
      category: 'planning',
      difficulty: 'intermediate',
      readTime: '10 min',
      summary: 'The age-old question: RRSP or TFSA? We break down the math and strategy for different income levels and life stages.',
      content: `
## RRSP vs TFSA: The Complete Comparison

### How They Work

#### RRSP (Registered Retirement Savings Plan)
- **Contribution**: Tax-deductible (reduces taxable income)
- **Growth**: Tax-free while invested
- **Withdrawal**: Taxed as income
- **Limit**: 18% of prior year income, max $31,560 (2025)
- **Deadline**: 60 days after year-end (March 1, 2025 for 2024)

#### TFSA (Tax-Free Savings Account)
- **Contribution**: NOT tax-deductible (after-tax money)
- **Growth**: Tax-free while invested
- **Withdrawal**: Completely tax-free
- **Limit**: $7,000 (2025), cumulative room since 2009
- **Deadline**: None (anytime in calendar year)

### Decision Framework

#### Prioritize RRSP if:
✅ Income over $50,000 (higher marginal tax rate means bigger deduction)
✅ Expect lower income in retirement
✅ Self-employed (reduces self-employment taxes too)
✅ Want to use Home Buyers' Plan ($35,000) or Lifelong Learning Plan ($20,000)
✅ Employer RRSP matching available (FREE MONEY - always max this first!)

#### Prioritize TFSA if:
✅ Income under $50,000 (lower tax bracket = smaller RRSP benefit)
✅ Expect SAME or HIGHER income in retirement
✅ Want flexibility to withdraw before retirement
✅ Already maxed RRSP
✅ Receiving income-tested benefits (GIS, OAS, CCB)
✅ Saving for non-retirement goals (home, car, sabbatical)

### The Math

**Example**: $5,000 contribution, 40% marginal tax rate, 6% annual return, 25 years

#### RRSP
- Contribution: $5,000
- Tax refund: $2,000 (40% of $5,000)
- *If you invest the refund too*: $7,000 total invested
- After 25 years at 6%: $30,068
- After tax at withdrawal (assume 30%): $21,048

#### TFSA
- Contribution: $5,000 (after-tax, so really cost $7,143 pre-tax)
- After 25 years at 6%: $21,477
- After tax at withdrawal: $21,477 (no tax!)

**Winner**: Depends on withdrawal tax rate!
- If retirement tax rate LOWER than contribution rate → RRSP wins
- If retirement tax rate SAME as contribution rate → Tie
- If retirement tax rate HIGHER than contribution rate → TFSA wins

### Optimal Strategy by Income

#### Income Under $50,000
1. Max TFSA first
2. Then RRSP
3. Consider saving RRSP room for higher income years

#### Income $50,000 - $100,000
1. Employer RRSP match (if available)
2. Split between RRSP and TFSA
3. RRSP slightly favored

#### Income Over $100,000
1. Employer RRSP match
2. Max RRSP
3. Then max TFSA
4. Then non-registered investments

### Advanced Strategies

#### RRSP Refund Reinvestment
Always reinvest your tax refund! This is where RRSP magic happens.

$5,000 contribution → $2,000 refund → Invest refund → New refund → Repeat

#### Spousal RRSP
Higher-income spouse contributes to lower-income spouse's RRSP.
- Contributor gets tax deduction
- Withdrawals taxed in spouse's lower bracket
- Income splitting in retirement!

#### TFSA for Emergency Fund
TFSA perfect for emergency fund because:
- Tax-free withdrawals
- Can recontribute what you withdraw (next year)
- No penalties

#### Home Buyers' Plan (HBP)
Withdraw up to $35,000 from RRSP for first home purchase.
- Tax-free withdrawal
- Must repay over 15 years
- Can use BOTH RRSP and TFSA for down payment

### Common Mistakes

❌ **Contributing to RRSP without calculating tax bracket** - If in low bracket, TFSA often better

❌ **Not reinvesting RRSP refund** - Refund is part of the strategy!

❌ **Over-contributing** - 1% penalty per month on excess

❌ **Withdrawing from RRSP early** - Lose contribution room forever + taxes + withholding

❌ **Ignoring TFSA** - Many people don't realize they have $95,000+ room accumulated

❌ **Choosing only RRSP or only TFSA** - Most people benefit from both

### Our Recommendation

**Most Canadians**: Split contributions 60% RRSP, 40% TFSA.

**The real secret**: Contribute to BOTH consistently. Time in market beats timing the market.

**Need help?** Our tax planning consultation includes RRSP/TFSA optimization analysis customized to your situation. We calculate the exact amount that maximizes your tax savings.
      `,
      tags: ['RRSP', 'TFSA', 'retirement', 'planning', 'savings']
    },
    {
      id: 5,
      title: 'Got a CRA Letter? Here\'s What to Do (Don\'t Panic!)',
      category: 'compliance',
      difficulty: 'beginner',
      readTime: '7 min',
      summary: 'Received a letter from CRA? Learn how to interpret different types of CRA correspondence and what action you need to take.',
      content: `
## Types of CRA Letters

### 1. Notice of Assessment (NOA)
**What it is**: Confirmation that CRA processed your return.

**Timeline**: Usually 2 weeks for e-filed returns, 8 weeks for paper.

**What to check**:
- Did they accept your return as-is?
- Any changes to deductions or credits?
- Refund amount or balance owing
- RRSP contribution room for next year
- TFSA contribution room

**Action needed**: Keep for your records. If there are changes, read explanation carefully.

### 2. Notice of Reassessment
**What it is**: CRA changed something on your previously assessed return.

**Common reasons**:
- Additional information received (T4, T5, etc.)
- Deduction or credit disallowed
- Math error
- Random review

**Action needed**:
- Read the explanation
- Check if you agree with changes
- You have 90 days to object if you disagree
- Contact us immediately if you need help

### 3. Request for Information (T2020)
**What it is**: CRA wants proof of deductions or credits you claimed.

**Commonly requested**:
- Medical expense receipts
- Donation receipts
- Childcare receipts
- Business expense records
- T2200 (work from home form)

**Timeline**: Usually 30 days to respond.

**Action needed**:
- Gather requested documents
- Respond by deadline (request extension if needed)
- Send via registered mail or online through My Account
- Keep copies of everything

**Don't ignore!** If you don't respond, CRA will disallow the deduction and reassess.

### 4. Pre-Assessment Review Letter
**What it is**: CRA reviewing your return BEFORE processing it.

**Common triggers**:
- First-time filing
- Large refund claimed
- Unusual deductions
- Multiple sources of income

**Action needed**: Respond with requested documentation. Return won't be processed until you do.

### 5. Notice of Audit
**What it is**: CRA conducting detailed review of your return(s).

**Types**:
- **Desk audit**: Mail correspondence only
- **Field audit**: CRA comes to your home/business
- **Random audit**: Selected by computer
- **Targeted audit**: Something triggered review

**Action needed**:
- **CALL US IMMEDIATELY** - Do not respond alone
- Gather all records for years under review
- Never volunteer extra information
- You have right to professional representation

### 6. Payment Reminder
**What it is**: You owe money and haven't paid.

**Timeline escalation**:
- First notice: Friendly reminder
- Second notice: More urgent
- Third notice: Formal demand
- **Next**: Collections action (wage garnishment, account freeze)

**Action needed**:
- Pay immediately if possible
- Can't pay in full? Call CRA to arrange payment plan
- Ignoring won't make it go away - interest compounds daily

### 7. Instalment Reminder
**What it is**: Reminder that quarterly tax payment is due.

**Who gets these**: Self-employed, investors, anyone owing $3,000+ two years in a row.

**Action needed**: Pay by due date or interest charges apply.

### How to Respond to Any CRA Letter

#### Step 1: Don't Panic
Most letters are routine. CRA sends millions annually.

#### Step 2: Read Carefully
- What type of letter is it?
- What is being requested?
- What is the deadline?

#### Step 3: Gather Documents
Collect any receipts, forms, or records mentioned.

#### Step 4: Respond by Deadline
- Online via My Account (fastest)
- Mail (use registered with tracking)
- Fax (keep confirmation)

**Need extension?** Call CRA before deadline to request more time.

#### Step 5: Keep Everything
- Copy of letter
- Copy of your response
- Proof of mailing/submission
- All supporting documents

### When to Get Professional Help

**Call us if**:
- Notice of reassessment reducing your refund
- Request for documents you don't have
- Audit notice
- Objection needed
- Penalty or interest charges
- Collections action threatened
- You're confused or stressed

**What we do**:
- Review the letter and your situation
- Gather and organize required documents
- Prepare written responses
- Communicate with CRA on your behalf
- File objections if needed
- Negotiate payment arrangements

### Your Rights

✅ **Right to professional representation** - CRA must deal with us if you authorize us

✅ **Right to understand** - CRA must explain in plain language

✅ **Right to review** - You can review files CRA has on you

✅ **Right to object** - 90 days to dispute assessments

✅ **Right to payment arrangement** - CRA will work with you if you can't pay in full

### Common Mistakes

❌ **Ignoring the letter** - Won't go away. Makes things worse.

❌ **Missing the deadline** - Lose right to object or face penalties

❌ **Volunteering extra information** - Answer only what's asked

❌ **Paying without reviewing** - Sometimes CRA makes mistakes

❌ **Handling audit alone** - False confidence often costly

### Prevention Tips

✅ Keep receipts for 6 years

✅ Claim only legitimate deductions

✅ Report all income (CRA already knows from T4s, T5s, etc.)

✅ File on time every year

✅ Use professional tax prep for complex situations

**Need Help?** Forward any CRA letter to us for free review. We'll tell you what it means and what you need to do. No obligation.
      `,
      tags: ['CRA', 'compliance', 'audit', 'assessment', 'letters']
    },
    {
      id: 6,
      title: 'LMIA Guide: How to Bring Workers to Canada',
      category: 'immigration',
      difficulty: 'advanced',
      readTime: '15 min',
      summary: 'Complete guide for employers seeking Labour Market Impact Assessment approval to hire foreign workers in Canada.',
      content: `
## What is LMIA?

**Labour Market Impact Assessment** is a document from Employment and Social Development Canada (ESDC) that allows employers to hire foreign workers.

**Purpose**: Prove that hiring a foreign worker will have neutral or positive impact on Canadian labour market (i.e., no Canadians available for the job).

### When Do You Need LMIA?

**Required for**:
- Temporary Foreign Worker Program (TFWP)
- Some Express Entry applications (50-200 CRS points!)
- Permanent residency pathways

**NOT required for**:
- LMIA-exempt work permits (CUSMA/NAFTA, intra-company transfers, etc.)
- International Experience Canada (IEC)
- Post-graduation work permits (PGWP)

### High-Wage vs Low-Wage Positions

**High-wage**: Position pays AT or ABOVE provincial median wage.
**Low-wage**: Position pays BELOW provincial median wage.

**BC Median Wages (2025)**:
- British Columbia: $28.85/hour
- Victoria: $29.50/hour
- Vancouver: $31.25/hour

**Why it matters**: Different requirements, different processing times, different caps.

### The LMIA Process (Step-by-Step)

#### Step 1: Determine Eligibility (Week 1)
✅ Genuine job offer
✅ Positive or neutral effect on Canadian labour market
✅ Will pay prevailing wage
✅ Safe working conditions
✅ Tried to hire Canadians first

#### Step 2: Recruitment (Weeks 1-5)
**Mandatory advertising** (BEFORE applying):
- **Job Bank**: 4 weeks minimum
- **2+ additional sources** for same duration:
  - Indeed, LinkedIn, industry publications
  - Provincial job boards
  - Union halls (for unionized positions)
  - Recruitment agencies

**Job ad requirements**:
- Job title and duties
- Wage (or salary range)
- Location
- Employer name
- How to apply

**You must prove**: Recruitment efforts, applications received, why Canadians weren't suitable.

#### Step 3: Prepare Application Package (Week 6)
**Required documents**:
- LMIA application form (EMP5593)
- Business legitimacy documents (incorporation, tax returns, payroll records)
- Job offer details
- Proof of recruitment (ads, applications, interview notes)
- Transition plan (how you'll recruit Canadians in future)
- Wage assessment (prove you're paying prevailing wage)

**Government fee**: $1,000 per position

#### Step 4: Submit Application (Week 6)
Submit to Service Canada ESDC office for your province.

**Where**: Online via LMIA Online Portal or paper submission.

#### Step 5: Processing (Weeks 7-18+)
**Processing times** (current averages):
- **High-wage**: 8-12 weeks
- **Low-wage**: 12-20 weeks
- **Seasonal agricultural**: 6-8 weeks
- **In-home caregivers**: 10-14 weeks

**During processing**:
- ESDC may request additional information
- May conduct employer site visits
- May contact references

#### Step 6: Decision
**Positive LMIA**: You receive approval letter with job offer number. Worker can now apply for work permit.

**Negative LMIA**: Application denied. Explanation provided. Can reapply addressing issues.

### Requirements for Positive LMIA

#### 1. Genuine Job Offer
- Full-time, temporary position
- Reasonable duration (usually max 2 years)
- Detailed job duties (NOC code)
- Clear business need

#### 2. Prevailing Wage
Must pay at or above:
- Provincial median (for high-wage)
- Wage ranges for occupation in that region
- Check Job Bank wage data

**Cannot**: Pay foreign worker less than Canadians doing same job.

#### 3. Recruitment Efforts
**Must prove**:
- Advertised widely
- Received and considered Canadian applications
- Why Canadians weren't suitable (legitimate reasons only)

**Red flags**:
- Overly specific job requirements tailored to foreign worker
- Unreasonable language requirements
- Short application windows
- Rejecting Canadians for minor reasons

#### 4. Business Legitimacy
**Must prove** you're established business:
- Business registration/incorporation
- T2 corporate tax returns (2+ years)
- Payroll records (if existing employees)
- Business premises
- Active business operations

**Startup?** More scrutiny. Need solid business plan and proof of financing.

#### 5. Transition Plan
**For high-wage positions**: Plan for reducing reliance on temporary foreign workers.

**Must include**:
- How you'll train Canadians
- Career advancement opportunities
- Knowledge transfer from foreign worker

#### 6. Workplace Safety
- Comply with provincial OHS regulations
- Provide safe working conditions
- Have WCB coverage (if required)

### Common Refusal Reasons

❌ **Insufficient recruitment** - Didn't advertise long enough or widely enough

❌ **Qualified Canadians available** - Applications received from suitable candidates

❌ **Wage too low** - Below prevailing wage or median

❌ **Vague job duties** - Job description unclear or doesn't match NOC

❌ **Business legitimacy concerns** - Can't prove you're established business

❌ **Unrealistic job requirements** - Obviously tailored to specific foreign worker

❌ **Previous non-compliance** - Past issues with LMIA, work permits, or immigration programs

❌ **Economic concerns** - Job won't provide neutral/positive impact

### Special LMIA Streams

#### Global Talent Stream
- **Fast track**: 10 business day processing
- For innovative companies hiring specialized talent
- Must be referred by designated partner
- Categories A (unique/specialized) or B (in-demand occupations)

#### Seasonal Agricultural Worker Program
- For primary agriculture
- Workers from participating countries (Mexico, Caribbean)
- Streamlined process
- Housing must be provided

#### In-Home Caregivers
- Live-in or live-out
- Pathways to permanent residence
- Specific wage and working condition requirements

#### High-wage Permanent Residency Stream
- 50-200 CRS points for Express Entry
- Must be genuine job offer
- Requires LMIA AND proof job will exist when PR granted

### Costs

**Government fees**: $1,000 per position

**Our LMIA support services**: $400-800
- Job posting compliance review
- Recruitment documentation
- Application package preparation
- Transition plan development
- Government submission

**Total typical cost**: $1,400-1,800 per worker

**Is it worth it?** If you genuinely need the worker and can't find Canadians, yes. Success rate for properly prepared applications: 85%+

### After LMIA Approval

1. **Send approval letter** to foreign worker
2. **Worker applies** for work permit (online or at visa office)
3. **Worker provides**:
   - LMIA approval letter
   - Job offer
   - Passport
   - Proof of qualifications
   - Medical exam (if required)
   - Biometrics
4. **Work permit issued** (if approved)
5. **Worker enters Canada** and starts work

**Work permit processing**: 2-8 weeks (varies by country)

### Employer Obligations After Hiring

✅ Provide same wages and working conditions as job offer

✅ Report if worker doesn't show up or quits

✅ Maintain business legitimacy

✅ Keep records for 6 years

✅ Allow inspections if requested

**Penalties for non-compliance**:
- $1,000 per violation
- Bans from hiring foreign workers (1 year to permanent)
- Loss of LMIA privileges

### Alternatives to LMIA

Before going LMIA route, consider:
- **LMIA-exempt work permits** (check if worker qualifies)
- **Provincial Nominee Program** (PNP) - Some streams don't need LMIA
- **Intra-company transfer** (if you have foreign office)
- **CUSMA/NAFTA professionals** (for US/Mexico citizens in certain occupations)

**Our consultation** includes LMIA-exempt option analysis. Sometimes there's easier path!

### How We Help

**Gator LMIA Support Package** ($400-800):
1. **Eligibility assessment** - Should you proceed?
2. **Recruitment compliance** - Ensure ads meet requirements
3. **Document preparation** - Business legitimacy, wage assessment, transition plan
4. **Application package** - Complete, organized, ready to submit
5. **Government liaison** - Handle questions and additional requests
6. **Post-approval support** - Guide worker through work permit application

**Success rate**: 87% approval for clients using our full package (vs 65% industry average).

**Free consultation**: Not sure if LMIA is right for you? 30-minute call to discuss your situation and alternatives.
      `,
      tags: ['LMIA', 'immigration', 'foreign workers', 'work permit', 'employers']
    },
    {
      id: 7,
      title: 'Small Business Tax Deductions: Complete Checklist',
      category: 'business',
      difficulty: 'intermediate',
      readTime: '11 min',
      summary: 'Comprehensive checklist of tax deductions available to Canadian small businesses. Don\'t leave money on the table.',
      content: `
## Every Small Business Tax Deduction (Organized by Category)

### Operating Expenses

#### Office Expenses
✅ Office supplies (pens, paper, printer ink)
✅ Postage and courier
✅ Office equipment under $500
✅ Software subscriptions (Office 365, Adobe, etc.)
✅ Website hosting and domain
✅ Coffee, tea, and office snacks (reasonable amounts)

#### Rent & Utilities
✅ Office rent or lease payments
✅ Property taxes (if you own building)
✅ Utilities (electricity, gas, water)
✅ Internet and phone
✅ Security system
✅ Janitorial and cleaning services

#### Home Office (If Working from Home)
**Method 1 - Detailed**:
✅ Portion of rent/mortgage interest
✅ Portion of property taxes
✅ Portion of utilities
✅ Portion of home insurance
✅ Maintenance (portion)

**Method 2 - Simplified**: $2/day worked from home (max $500/year)

**Requirements**: Space used regularly and exclusively for business, or for storing inventory, or for meeting clients.

### Vehicle & Travel

#### Vehicle Expenses (Business Use)
✅ Fuel and oil
✅ Insurance
✅ License and registration
✅ Maintenance and repairs
✅ Car washes
✅ Lease payments (if leasing)
✅ Parking (business-related)
✅ CCA/depreciation (if owned)

**Must track**: Business km vs personal km. Only business % is deductible.

**Mileage rate alternative**: $0.68/km for first 5,000 km, $0.62/km after (2025 rates).

#### Travel Expenses
✅ Airfare, train, bus
✅ Hotels and accommodations
✅ Meals (50% deductible)
✅ Taxi, Uber, car rental
✅ Conference and event registration
✅ Baggage fees

**Requirements**: Business purpose, keep receipts, log details.

### Marketing & Advertising

✅ Website design and development
✅ Social media advertising (Facebook, Instagram, Google)
✅ Print advertising (flyers, brochures, business cards)
✅ Sponsorships and donations (business-related)
✅ Promotional items (branded pens, shirts, etc.)
✅ SEO and marketing services
✅ Photography and videography (for marketing)
✅ Trade show booth and materials

### Professional Services

✅ Accounting and bookkeeping fees (that's us!)
✅ Legal fees (business-related)
✅ Consulting and advisory fees
✅ IT support and tech services
✅ Recruiting and hiring services
✅ Business coaching

**Not deductible**: Legal fees for buying assets (add to asset cost instead).

### Salaries & Benefits

✅ Employee wages and salaries
✅ Bonuses
✅ Employer portion of CPP
✅ Employer portion of EI
✅ Health and dental benefits
✅ RRSP matching contributions
✅ Training and professional development
✅ Employee gifts (up to $500/year per employee)

**Owner salary**: Incorporated? Pay yourself salary (deductible) vs dividend (not deductible to corp).

### Insurance

✅ Business liability insurance
✅ Professional liability (E&O insurance)
✅ Property insurance
✅ Vehicle insurance (business %)
✅ Life insurance (if required for business loan)

**Not deductible**: Personal life insurance.

### Interest & Bank Fees

✅ Interest on business loans
✅ Interest on business line of credit
✅ Credit card interest (business expenses)
✅ Bank fees and service charges
✅ Merchant fees (credit card processing)
✅ PayPal or Stripe fees

### Equipment & Capital Assets

**Under $500**: Expense immediately (fully deductible in year purchased).

**Over $500**: Claim CCA (Capital Cost Allowance) - depreciation over multiple years.

**CCA Classes**:
- Computer equipment: 50% Class (Rate: 55%)
- Furniture: Class 8 (20%)
- Vehicles: Class 10/10.1 (30%)
- Buildings: Class 1 (4%)
- Tools: 100% Class (100% if under $500)

**First-year rule**: Usually only 50% of CCA in year of purchase (except 100% classes).

**Pro tip**: If profitable year, claim max CCA. If loss or low income, claim less CCA (can carry forward).

### Meals & Entertainment

✅ Client meals (50% deductible)
✅ Business meals while traveling (50%)
✅ Office celebrations (100% deductible if ALL employees invited)
✅ Staff meeting meals (100% if working meeting)
✅ Conference meals (50%)

**Documentation**: Who attended, business purpose, receipt.

### Education & Training

✅ Courses and certifications (business-related)
✅ Books and publications
✅ Webinars and online courses
✅ Industry conferences
✅ Professional memberships and dues
✅ Trade publications

### Subcontractors & Outsourcing

✅ Freelancer and contractor payments
✅ Outsourced services (bookkeeping, design, writing, etc.)

**Important**: May need to issue T4A at year-end if over $500 paid.

### Taxes & Licenses

✅ Business licenses and permits
✅ Professional certifications
✅ Property taxes (business property)
✅ EHT (Employer Health Tax) if applicable

**Not deductible**: Income taxes, fines, penalties.

### Other Common Deductions

✅ Bad debts (if previously reported as income)
✅ Moving expenses (relocating business)
✅ Research and development (SR&ED tax credits!)
✅ Donations (charitable, limits apply)
✅ Warranty expenses
✅ Refunds and returns

### Special Considerations

#### Incorporation Benefits
- **Small business deduction**: First $500,000 income taxed at ~11.5% (vs 26%+ personal)
- **Salary vs dividend**: Flexibility in tax planning
- **Lifetime capital gains exemption**: Up to $971,190 tax-free on sale (2025)

#### GST/HST Input Tax Credits
If registered for GST/HST:
✅ Claim back GST/HST paid on all business expenses
✅ This is HUGE - effectively 5% discount on everything

#### Home Office: Incorporated?
If you own corporation and work from home:
- **Option 1**: Claim on personal return (if corp requires it)
- **Option 2**: Corp pays you "rent" (income to you, deduction to corp)

**Talk to us** about which method works better.

### Record Keeping Requirements

**Keep for 6 years**:
- All receipts (digital photos ok!)
- Invoices
- Bank statements
- Credit card statements
- Mileage logs
- Contracts
- Proof of payment

**Best practice**:
- Photo receipts immediately (before they fade)
- Use cloud accounting software
- Separate business bank account
- Document business purpose on receipt

### Common Mistakes

❌ **Claiming 100% of mixed-use expenses** (vehicle, phone, home office)

❌ **No receipts or documentation** - Can't claim what you can't prove

❌ **Claiming personal expenses** - CRA WILL catch this in audit

❌ **Not tracking mileage** - Leaving thousands on table

❌ **Claiming ineligible expenses** (golf, fines, personal insurance)

❌ **Missing HST/GST ITCs** - If registered, claim back ALL GST paid

### How Much Can You Save?

**Example small business**:
- Revenue: $150,000
- Expenses properly tracked: $75,000
- Taxable income: $75,000

**If incorporated** (11.5% small business rate):
- Tax owing: $8,625

**If sole proprietor** (assuming 30% marginal rate):
- Tax owing: $22,500

**Savings from incorporation**: $13,875/year

**Plus**: Every $1,000 in missed deductions = $300-400 in extra taxes (depending on rate).

### Our Business Tax Package Includes:

✅ Comprehensive deduction review (we find what you're missing)
✅ T2125 or T2 corporate return preparation
✅ HST/GST filing
✅ Deduction optimization strategies
✅ Incorporation analysis (should you incorporate?)
✅ Salary vs dividend recommendations
✅ Year-round tax planning advice

**Average deductions found for new clients**: $5,000-$15,000 they were missing.

**Book a consultation** and bring your records - we'll do a free review and tell you what you could be claiming.
      `,
      tags: ['business', 'deductions', 'small business', 'expenses', 'CCA']
    },
    {
      id: 8,
      title: 'First-Time Home Buyer Tax Benefits in Canada',
      category: 'personal',
      difficulty: 'beginner',
      readTime: '9 min',
      summary: 'Everything first-time home buyers need to know about tax credits, RRSP withdrawals, and land transfer tax rebates.',
      content: `
## First-Time Home Buyer Incentives & Tax Benefits

### Who is a "First-Time Home Buyer"?

**CRA Definition**: You (or your spouse) did not own and occupy a home in the current year or previous 4 years.

**Example**: Bought a home in 2019 but sold it in 2020? You're a first-time buyer again in 2025!

**Inherited a home?** Doesn't disqualify you (as long as you didn't occupy it).

### 1. Home Buyers' Amount (Federal Tax Credit)

**What**: $10,000 non-refundable tax credit

**Value**: $1,500 (15% of $10,000)

**Who qualifies**:
- First-time home buyer
- Bought qualifying home in tax year
- You or spouse intends to occupy as principal residence

**Qualifying homes**:
- House, condo, townhouse
- Mobile home
- Apartment in duplex/triplex/fourplex

**How to claim**: Line 31270 on personal tax return.

**One-time benefit**: Can only claim once in lifetime.

### 2. First Home Savings Account (FHSA)

**What**: New savings account (started 2023) combining RRSP and TFSA benefits.

**Contribution limits**:
- $8,000/year
- $40,000 lifetime maximum
- Unused annual room carries forward

**Tax benefits**:
- Contributions are tax-deductible (like RRSP)
- Growth is tax-free (like TFSA)
- Withdrawals for home purchase are tax-free (unlike RRSP!)

**Timeline**: Must use within 15 years of opening account.

**Who qualifies**:
- 18+ years old
- Canadian resident
- First-time home buyer

**Can combine with**: HBP (RRSP withdrawal) for max down payment power!

**Example**:
- Max out FHSA: $40,000
- HBP from RRSP: $35,000
- **Total**: $75,000 tax-free for down payment!

### 3. Home Buyers' Plan (HBP)

**What**: Withdraw up to $35,000 from RRSP for home purchase.

**Benefits**:
- Tax-free withdrawal (normally RRSP withdrawals are taxed)
- Each spouse can withdraw $35,000 ($70,000 total for couple!)

**Requirements**:
- First-time home buyer (4-year rule)
- Funds must be in RRSP for 90 days before withdrawal
- Must sign purchase agreement by October 1 following withdrawal year
- Must occupy home within 1 year of purchase

**Repayment**:
- Must repay over 15 years
- Start 2nd year after withdrawal
- Minimum: 1/15th per year
- If you don't repay, amount is added to income and taxed

**Example repayment**:
- Withdrew: $35,000
- Annual repayment: $2,333.33
- Miss a payment? That $2,333 is added to your taxable income

**Strategy**: Contribute to RRSP, get tax refund, wait 90 days, withdraw via HBP. Free money from tax refund!

### 4. Land Transfer Tax Rebate

**Ontario**: Up to $4,000 rebate (Toronto: additional $4,475 for total $8,475)

**BC**: First-time buyers exemption on first $500,000 (partial exemption $500k-$835k)
- Homes under $500,000: Full exemption (save ~$8,000)
- $500k-$835k: Partial exemption
- Over $835,000: No exemption

**Who qualifies**:
- First-time buyer (BC: never owned ANYWHERE in world)
- Canadian citizen or PR
- Must occupy as principal residence for 1 year

**Value**: $5,000-$16,000+ depending on home price and province.

### 5. GST/HST New Housing Rebate

**What**: Get back some GST/HST paid on NEW home construction.

**Rebate amounts**:
- **GST (5%)**: Up to $6,300 rebate
- **HST (varies by province)**: Additional provincial rebate

**Who qualifies**:
- Bought new construction OR
- Built your own home OR
- Substantially renovated (90%+)
- Purchase price under $450,000 (full rebate)
- $450k-$350k: partial rebate

**How**: Builder often credits you directly, or you claim on tax return.

### 6. Provincial Programs

#### BC - Property Transfer Tax Exemption
**Full exemption if**:
- Home under $500,000
- First-time buyer
- Canadian citizen or PR

**Partial exemption**: $500k-$835k

**Newly built**: Additional exemption up to $750,000

#### BC - Home Owner Grant
**Annual grant**: Up to $570/year property tax reduction

**Who**: Primary residence, owned and occupied

#### Ontario - Land Transfer Tax Refund
Up to $4,000 for first-time buyers (full refund for homes under $368,000).

### Tax Planning Strategies for Home Buyers

#### Strategy 1: RRSP Contribution + HBP
1. Contribute $35,000 to RRSP (get ~$10,500 tax refund at 30% rate)
2. Wait 90 days
3. Withdraw via HBP for down payment
4. Use tax refund to boost down payment further

**Result**: $45,500 down payment from $35,000 out-of-pocket!

#### Strategy 2: Max FHSA First
- FHSA contributions are tax-deductible
- Never have to repay (unlike HBP)
- Can withdraw tax-free for home
- **Do this first** before HBP

#### Strategy 3: Income Splitting for Couples
- Each person gets own HBP ($35k each)
- Each gets own FHSA ($40k each)
- Each claims Home Buyers' Amount ($1,500 each)

**Total for couple**:
- HBP: $70,000
- FHSA: $80,000
- Tax credits: $3,000
- **Total**: $150,000+ in tax-advantaged down payment!

#### Strategy 4: Timing Your Purchase
**Buy before December 31**: Claim Home Buyers' Amount on that year's return.

**Buy in January**: Delay possession to next tax year if beneficial for other tax reasons.

### Common Questions

**Q: Can I use HBP and FHSA together?**
A: YES! Max both for combined $75,000 per person.

**Q: What if I don't repay HBP?**
A: Missed amount added to income and taxed. CRA doesn't chase you - just auto-includes on return.

**Q: Can I withdraw from spouse's RRSP?**
A: No. Each person withdraws from own RRSP (but each can do $35k).

**Q: I already own a rental property. Am I still first-time buyer?**
A: No. Must not own ANY property (rental or otherwise) in prior 4 years.

**Q: Does mobile home count?**
A: Yes! As long as in Canada and on permanent foundation.

**Q: What about buying with non-first-time buyer?**
A: You can claim credits even if spouse isn't first-time buyer (but spouse can't claim).

### Maximum First-Time Buyer Benefit (Couple)

**Down payment sources**:
- FHSA: $80,000 ($40k each)
- HBP: $70,000 ($35k each)
- **Total**: $150,000 tax-advantaged

**Tax credits/rebates**:
- Home Buyers' Amount: $3,000 ($1,500 each)
- BC Property Transfer Tax exemption: ~$8,000-16,000
- GST/HST New Housing Rebate: Up to $6,300 (if new construction)

**Total potential savings**: $17,000-$25,000+

**Plus**: Tax refunds from FHSA contributions (could be another $10,000-20,000 depending on income).

### What About After You Buy?

#### Mortgage Interest
**Not deductible** for principal residence (unlike US).

**Exception**: If you rent out part of home, that portion of interest is deductible.

#### Home Office
If self-employed and use home office:
- Deduct portion of property tax, utilities, insurance, maintenance
- Or claim simplified $2/day method

#### Renovations
**Generally not deductible** EXCEPT:
- **Medical expenses**: Wheelchair ramps, stairlifts, etc.
- **Home office**: Improvements to office space (if self-employed)
- **Rental income**: If renting out suite
- **Multigenerational Home Renovation Tax Credit**: Up to $50,000 for secondary suite for senior/disabled relative

### How We Help First-Time Buyers

**Pre-purchase consultation**:
✅ RRSP/FHSA optimization strategy
✅ HBP withdrawal planning
✅ Income splitting strategies
✅ Purchase timing advice

**Tax filing after purchase**:
✅ Claim Home Buyers' Amount
✅ Claim land transfer tax rebates
✅ Report HBP withdrawal
✅ Track HBP repayment schedule

**Ongoing**:
✅ Annual HBP repayment tracking
✅ Home office deduction (if applicable)
✅ Renovation tax credit eligibility

**Book a consultation** if you're planning to buy in the next 1-2 years. We'll create a custom tax strategy to maximize your down payment and minimize lifetime tax.
      `,
      tags: ['home buyer', 'HBP', 'FHSA', 'real estate', 'first-time', 'tax credits']
    }
  ];

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || article.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const faqItems = [
    {
      title: 'How often is the Knowledge Hub updated?',
      content: 'We update articles whenever tax laws change (usually annually) and add new content monthly. Subscribe to our newsletter to get notified of new articles and important tax updates.'
    },
    {
      title: 'Can I suggest topics for future articles?',
      content: 'Absolutely! Send topic requests to learn@gatorbookkeeping.ca. We prioritize articles based on client questions and current tax issues.'
    },
    {
      title: 'Are these articles specific to BC?',
      content: 'Most articles apply to all Canadian provinces, with BC-specific notes where applicable. We focus on federal tax rules that apply everywhere, plus BC provincial programs.'
    },
    {
      title: 'Can I trust this information for my tax filing?',
      content: 'These articles are for educational purposes and reflect current tax law. However, everyone\'s situation is unique. Always consult with a tax professional (like us!) before making major tax decisions.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gator-green-dark to-gator-green text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <BookOpen size={64} className="mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Knowledge Hub
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Everything you need to know about Canadian taxes, bookkeeping, and immigration. Written by experts,
                designed for real people. No jargon, just practical advice you can actually use.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles, topics, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gator-green-dark focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gator-green-dark text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={18} />
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Difficulty Filter */}
            <div className="flex justify-center gap-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedDifficulty === level
                      ? 'bg-gator-green text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div className="text-center mt-4 text-sm text-gray-600">
              Showing {filteredArticles.length} of {articles.length} articles
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-navy mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
                  >
                    {/* Category & Difficulty badges */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gator-green/10 text-gator-green-dark px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {categories.find(c => c.id === article.category)?.label}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        article.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                        article.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {article.difficulty}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-navy mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{article.summary}</p>

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{article.readTime} read</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="btn-secondary w-full flex items-center justify-center gap-2"
                    >
                      Read Article <ArrowRight size={18} />
                    </button>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">Popular Topics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { title: 'Tax Deadlines', icon: '📅', searchTerm: 'deadlines', category: 'personal' },
                { title: 'Deductions Guide', icon: '💰', searchTerm: 'deductions', category: 'deductions' },
                { title: 'Small Business', icon: '🏢', searchTerm: 'business', category: 'business' },
                { title: 'Immigration', icon: '🌍', searchTerm: 'LMIA', category: 'immigration' },
                { title: 'CRA Compliance', icon: '📋', searchTerm: 'CRA', category: 'compliance' },
                { title: 'RRSP & TFSA', icon: '🏦', searchTerm: 'RRSP', category: 'planning' },
                { title: 'Self-Employed', icon: '💼', searchTerm: 'self-employed', category: 'business' },
                { title: 'First-Time Buyers', icon: '🏠', searchTerm: 'home buyer', category: 'personal' }
              ].map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setSearchQuery(topic.searchTerm);
                    setSelectedCategory(topic.category);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gator-green/5 transition-colors cursor-pointer border-2 border-transparent hover:border-gator-green"
                >
                  <div className="text-4xl mb-3">{topic.icon}</div>
                  <h3 className="font-bold text-navy mb-1">{topic.title}</h3>
                  <p className="text-sm text-gray-600">
                    {articles.filter(a =>
                      (a.category === topic.category || topic.category === 'all') &&
                      (a.title.toLowerCase().includes(topic.searchTerm.toLowerCase()) ||
                       a.summary.toLowerCase().includes(topic.searchTerm.toLowerCase()) ||
                       a.tags.some(tag => tag.toLowerCase().includes(topic.searchTerm.toLowerCase())))
                    ).length} articles
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center card bg-gradient-to-br from-gator-green-dark to-gator-green text-white">
              <h2 className="text-3xl font-bold mb-4">Stay Tax-Smart All Year</h2>
              <p className="text-white/90 mb-6">
                Get new articles, tax tips, and deadline reminders delivered to your inbox.
                No spam, just useful info when you need it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="btn-primary bg-white text-gator-green-dark hover:bg-gray-100 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-white/70 mt-3">
                Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">About the Knowledge Hub</h2>
            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-gator-green-dark to-gator-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Have Questions? We Have Answers
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team is here to help with personalized advice for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/sign-in" className="btn-primary bg-white text-gator-green-dark hover:bg-gray-100">
                Get Started
              </a>
              <a href="/about" className="btn-secondary border-2 border-white text-white hover:bg-white/10">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between z-10">
                <div className="flex-grow pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gator-green/10 text-gator-green-dark px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {categories.find(c => c.id === selectedArticle.category)?.label}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedArticle.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                      selectedArticle.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedArticle.difficulty}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{selectedArticle.readTime} read</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-navy">{selectedArticle.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="prose prose-lg max-w-none">
                  {selectedArticle.content.split('\n').map((paragraph, i) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={i} className="text-2xl font-bold text-navy mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                    } else if (paragraph.startsWith('### ')) {
                      return <h3 key={i} className="text-xl font-bold text-navy mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                    } else if (paragraph.startsWith('#### ')) {
                      return <h4 key={i} className="text-lg font-bold text-navy mt-4 mb-2">{paragraph.replace('#### ', '')}</h4>;
                    } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return <p key={i} className="font-bold text-navy my-3">{paragraph.replace(/\*\*/g, '')}</p>;
                    } else if (paragraph.startsWith('- ')) {
                      return <li key={i} className="ml-6 my-1">{paragraph.replace('- ', '')}</li>;
                    } else if (paragraph.trim() === '') {
                      return null;
                    } else {
                      return <p key={i} className="text-gray-700 my-3 leading-relaxed">{paragraph}</p>;
                    }
                  })}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag, i) => (
                      <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 bg-gator-green/10 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-navy mb-2">Need Help With This?</h3>
                  <p className="text-gray-600 mb-4">Our experts can handle it for you.</p>
                  <a href="/sign-in" className="btn-primary inline-block">
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Learn;
