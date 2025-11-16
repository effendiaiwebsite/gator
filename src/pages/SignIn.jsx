import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useLanguage } from '../hooks/useLanguage';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const SignIn = () => {
  const { sendMagicLink, loading } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Send magic link (no client data since this is returning user)
      const result = await sendMagicLink(email, null);

      if (result.success) {
        setStatus('success');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send magic link. Please try again.');
    }
  };

  const isValid = email.includes('@');

  if (status === 'success') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold text-navy mb-4">
              Check Your Email! 📧
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              We've sent a magic link to:
            </p>
            <p className="text-xl font-bold text-gator-green-dark mb-4">
              {email}
            </p>
            <div className="card p-6 text-left">
              <h3 className="font-bold text-navy mb-3">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Check your inbox (and spam folder)</li>
                <li>Click the magic link in the email</li>
                <li>You'll be automatically signed in to your portal!</li>
              </ol>
            </div>
            <p className="text-sm text-gray-600 mt-6">
              The magic link expires in 7 days.
            </p>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          {/* Gator Welcome */}
          <div className="text-center mb-8">
            <img
              src="/assets/gator/crocodileInBusinessSuitWithBriefcase.png"
              alt="Gator mascot"
              className="w-32 h-32 mx-auto mb-4"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h1 className="text-4xl font-bold text-navy mb-3">
              Welcome Back! 🐊
            </h1>
            <p className="text-lg text-gray-600">
              Sign in to access your client portal
            </p>
          </div>

          {/* Sign In Card */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-navy mb-2">
              Sign In
            </h2>
            <p className="text-gray-600 mb-6">
              We'll send you a magic link to sign in. No password needed!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                  disabled={status === 'loading'}
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
                    Sending Magic Link...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2" size={20} />
                    Send Magic Link
                  </>
                )}
              </button>
            </form>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-gator-green-light rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>🔒 Secure & Simple:</strong> Magic links are safer than passwords.
                Each link works only once and expires after 7 days.
              </p>
            </div>
          </div>

          {/* New User CTA */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              New to Gator Bookkeeping?{' '}
              <a href="/" className="text-gator-green-dark font-bold hover:underline">
                Calculate your savings →
              </a>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
