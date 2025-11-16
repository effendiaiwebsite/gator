import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth.jsx';

const LeadForm = ({ calculatorData }) => {
  const { t } = useLanguage();
  const { sendMagicLink } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Prepare client data for Firebase
      const clientData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        province: calculatorData?.selections?.province || 'ON',
        annualRevenue: calculatorData?.selections?.revenue || '0-50k',
        employeeCount: calculatorData?.selections?.employees || '0',
        estimatedSavings: calculatorData?.result?.savings || 0,
        adSource: 'Organic', // Will be updated from URL params in production
        utmCampaign: 'tax-calculator'
      };

      // Send magic link via Firebase Authentication
      const result = await sendMagicLink(formData.email, clientData);

      if (result.success) {
        setStatus('success');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || t('leadForm.error') || 'Failed to send magic link. Please try again.');
    }
  };

  const isValid = formData.firstName && formData.lastName && formData.email.includes('@');

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
        </motion.div>
        <h2 className="text-3xl font-bold text-navy mb-4">
          {t('leadForm.success')}
        </h2>
        <p className="text-lg text-gray-600">
          Check your inbox for your magic link to access your personalized portal.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-navy mb-3">
          {t('leadForm.title')}
        </h2>
        <p className="text-gray-600">
          {t('leadForm.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            {t('leadForm.firstName')}
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="John"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            {t('leadForm.lastName')}
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('leadForm.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="john@example.com"
          />
        </div>

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center text-red-600 bg-red-50 p-3 rounded-lg"
          >
            <AlertCircle className="mr-2" size={20} />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={!isValid || status === 'loading'}
          className={`w-full btn-primary flex items-center justify-center ${
            (!isValid || status === 'loading') ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {status === 'loading' ? (
            <>
              <Loader className="animate-spin mr-2" size={20} />
              Sending...
            </>
          ) : (
            <>
              <Mail className="mr-2" size={20} />
              {t('leadForm.submit')}
            </>
          )}
        </button>
      </form>

      {/* Show calculated savings reminder */}
      {calculatorData && calculatorData.result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-gator-green-light rounded-lg text-center"
        >
          <p className="text-sm text-gray-700">
            💰 Your estimated savings: <span className="font-bold text-gator-green-dark">${calculatorData.result.savings.toLocaleString()}</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LeadForm;
