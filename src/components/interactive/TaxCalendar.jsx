import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const TAX_CALENDAR_DATA = [
  {
    month: 'January',
    events: [
      { date: 'Late Jan', title: 'T4 Slips Issued', description: 'Employers issue T4 slips for previous year employment income' },
      { date: 'Jan 31', title: 'T4 Deadline', description: 'Last day for employers to issue T4 slips' }
    ]
  },
  {
    month: 'February',
    events: [
      { date: 'Late Feb', title: 'T5 Slips Issued', description: 'Investment T5 slips start arriving' },
      { date: 'Feb 28/29', title: 'T3/T5 Deadline', description: 'Last day for T3 and T5 slip distribution' }
    ]
  },
  {
    month: 'March',
    events: [
      { date: 'Mar 1', title: 'RRSP Deadline', description: 'Last day to contribute to RRSP for previous tax year', highlight: true }
    ]
  },
  {
    month: 'April',
    events: [
      { date: 'Apr 30', title: 'Personal Tax Deadline', description: 'File personal tax returns and pay balance owing', highlight: true }
    ]
  },
  {
    month: 'May',
    events: [
      { date: 'Early May', title: 'Tax Refunds Start', description: 'CRA begins processing refunds for early filers' }
    ]
  },
  {
    month: 'June',
    events: [
      { date: 'Jun 15', title: 'Self-Employed Deadline', description: 'File tax returns if you or spouse are self-employed', highlight: true },
      { date: 'Jun 15', title: 'Corporate Year-End', description: 'T2 returns due 6 months after fiscal year-end' }
    ]
  },
  {
    month: 'July',
    events: [
      { date: 'Jul 15', title: 'GST/HST Credit', description: 'First quarterly GST/HST credit payment' }
    ]
  },
  {
    month: 'August',
    events: [
      { date: 'Mid Aug', title: 'Planning Season', description: 'Good time to review year-to-date and plan tax strategies' }
    ]
  },
  {
    month: 'September',
    events: [
      { date: 'Sep 15', title: 'Installments Due', description: 'Third quarterly tax installment payment for individuals' }
    ]
  },
  {
    month: 'October',
    events: [
      { date: 'Oct 15', title: 'GST/HST Credit', description: 'Second quarterly GST/HST credit payment' }
    ]
  },
  {
    month: 'November',
    events: [
      { date: 'Nov', title: 'Year-End Planning', description: 'Review finances and plan year-end tax strategies' }
    ]
  },
  {
    month: 'December',
    events: [
      { date: 'Dec 15', title: 'Installments Due', description: 'Fourth quarterly tax installment payment' },
      { date: 'Dec 31', title: 'Donation Deadline', description: 'Last day for charitable donations for current tax year' }
    ]
  }
];

const TaxCalendar = () => {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handlePrevious = () => {
    setSelectedMonth(prev => (prev === 0 ? 11 : prev - 1));
  };

  const handleNext = () => {
    setSelectedMonth(prev => (prev === 11 ? 0 : prev + 1));
  };

  const monthData = TAX_CALENDAR_DATA[selectedMonth];

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-navy flex items-center gap-2">
          <CalendarIcon className="text-gator-green-dark" />
          Tax Calendar
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="text-gray-600" />
          </button>
          <span className="text-lg font-semibold text-navy min-w-[120px] text-center">
            {monthData.month}
          </span>
          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Month Pills */}
      <div className="grid grid-cols-6 gap-2 mb-6">
        {TAX_CALENDAR_DATA.map((month, index) => (
          <button
            key={index}
            onClick={() => setSelectedMonth(index)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              index === selectedMonth
                ? 'bg-gator-green-dark text-white'
                : index === currentMonth
                ? 'bg-gator-green-light text-gator-green-dark border-2 border-gator-green'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {month.month.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Events */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMonth}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {monthData.events.length > 0 ? (
            monthData.events.map((event, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  event.highlight
                    ? 'bg-amber-50 border-amber-500'
                    : 'bg-gray-50 border-gator-green-dark'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-semibold ${
                        event.highlight ? 'text-amber-700' : 'text-gator-green-dark'
                      }`}>
                        {event.date}
                      </span>
                      {event.highlight && (
                        <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">
                          Important
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-navy mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="mx-auto mb-2 text-gray-400" size={48} />
              <p>No major tax events this month</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Current Month Indicator */}
      {selectedMonth === currentMonth && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-sm text-green-800">
            📍 You're viewing the current month
          </p>
        </div>
      )}
    </div>
  );
};

export default TaxCalendar;
