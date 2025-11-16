import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, DollarSign } from 'lucide-react';
import { calculateSavings, formatCurrency } from '../../utils/calculator';
import { REVENUE_RANGES, EMPLOYEE_COUNTS, PROVINCES } from '../../config/constants';
import { useLanguage } from '../../hooks/useLanguage';

const Calculator = ({ onComplete }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    revenue: null,
    employees: null,
    province: null
  });
  const [result, setResult] = useState(null);

  const handleSelection = (field, value) => {
    setSelections({ ...selections, [field]: value });
  };

  const goToNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate result
      const { savings, reason } = calculateSavings(
        selections.revenue,
        selections.employees,
        selections.province
      );
      setResult({ savings, reason });
      setStep(4);
    }
  };

  const goToBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 4) setResult(null);
    }
  };

  const canProceed = () => {
    if (step === 1) return selections.revenue !== null;
    if (step === 2) return selections.employees !== null;
    if (step === 3) return selections.province !== null;
    return false;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-1/3 h-2 rounded-full mx-1 transition-all ${
                step >= num ? 'bg-gator-green-dark' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center">
          {step < 4 ? `Question ${step} of 3` : 'Your Results'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* Question 1: Revenue */}
        {step === 1 && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="animate-slide-up"
          >
            <h2 className="text-3xl font-bold text-navy mb-6 text-center">
              {t('calculator.q1.question')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REVENUE_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleSelection('revenue', range.value)}
                  className={`option-card text-left ${
                    selections.revenue === range.value ? 'selected' : ''
                  }`}
                >
                  <DollarSign className="inline w-5 h-5 mb-2 text-gator-green-dark" />
                  <p className="font-semibold text-lg">{range.label}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Question 2: Employees */}
        {step === 2 && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="animate-slide-up"
          >
            <h2 className="text-3xl font-bold text-navy mb-6 text-center">
              {t('calculator.q2.question')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EMPLOYEE_COUNTS.map((count) => (
                <button
                  key={count.value}
                  onClick={() => handleSelection('employees', count.value)}
                  className={`option-card text-left ${
                    selections.employees === count.value ? 'selected' : ''
                  }`}
                >
                  <p className="font-semibold text-lg">{count.label}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Question 3: Province */}
        {step === 3 && (
          <motion.div
            key="q3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="animate-slide-up"
          >
            <h2 className="text-3xl font-bold text-navy mb-6 text-center">
              {t('calculator.q3.question')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PROVINCES.map((province) => (
                <button
                  key={province.code}
                  onClick={() => handleSelection('province', province.code)}
                  className={`option-card text-center ${
                    selections.province === province.code ? 'selected' : ''
                  }`}
                >
                  <p className="font-bold text-xl">{province.code}</p>
                  <p className="text-sm text-gray-600">{province.name}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Result */}
        {step === 4 && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center animate-fade-in"
          >
            <div className="card bg-gradient-to-br from-gator-green-light to-white p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <p className="text-lg text-gray-700 mb-2">{t('calculator.result.title')}</p>
                <h1 className="text-6xl font-bold text-gator-green-dark mb-2">
                  {formatCurrency(result.savings)}
                </h1>
                <p className="text-xl text-gray-600 mb-6">{t('calculator.result.perYear')}</p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-700 leading-relaxed mb-8"
              >
                {result.reason}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => onComplete(selections, result)}
                className="btn-primary text-lg px-8 py-4"
              >
                {t('calculator.result.cta')} <ArrowRight className="inline ml-2" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={goToBack}
            disabled={step === 1}
            className={`btn-secondary flex items-center ${
              step === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ArrowLeft className="mr-2" size={20} />
            {t('calculator.back')}
          </button>

          <button
            onClick={goToNext}
            disabled={!canProceed()}
            className={`btn-primary flex items-center ${
              !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {t('calculator.next')}
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
