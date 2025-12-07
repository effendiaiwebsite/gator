import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, Loader, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { checkRateLimit, clearRateLimit } from '../utils/rateLimit';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const Register = () => {
  const { signUpWithEmail, signInWithOAuth, loading } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState('form'); // form, success
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Check rate limit
    const rateLimitCheck = checkRateLimit('signUp', formData.email);
    if (!rateLimitCheck.allowed) {
      setStatus('error');
      setErrorMessage(`${rateLimitCheck.message} (Try again in ${rateLimitCheck.retryAfter} minutes)`);
      return;
    }

    try {
      const clientData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        province: 'ON',
        annualRevenue: '0-50k',
        employeeCount: '0',
        estimatedSavings: 0,
        adSource: 'Direct',
        utmCampaign: null
      };

      const result = await signUpWithEmail(formData.email, formData.password, clientData);

      if (result.success) {
        // Clear rate limit on successful registration
        clearRateLimit('signUp', formData.email);
        setStep('success');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to create account. Please try again.');
    }
  };


  const handleOAuthSignIn = async (provider) => {
    setStatus('loading');
    setErrorMessage('');

    // Check rate limit for OAuth
    const rateLimitCheck = checkRateLimit('oauth', provider);
    if (!rateLimitCheck.allowed) {
      setStatus('error');
      setErrorMessage(`${rateLimitCheck.message} (Try again in ${rateLimitCheck.retryAfter} minutes)`);
      return;
    }

    try {
      const clientData = {
        province: 'ON',
        annualRevenue: '0-50k',
        employeeCount: '0',
        estimatedSavings: 0,
        adSource: 'Direct',
        utmCampaign: null
      };

      const result = await signInWithOAuth(provider, clientData);

      if (result.success) {
        // Clear rate limit on successful OAuth
        clearRateLimit('oauth', provider);
        navigate('/portal', { replace: true });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || `Failed to sign up with ${provider}. Please try again.`);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email.includes('@') &&
                      formData.password.length >= 6 && formData.password === formData.confirmPassword;

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <div className="card p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">
                Account Created!
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Welcome to Gator Bookkeeping! Your account has been created successfully.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>📧 Verification Email:</strong>
                </p>
                <p className="text-sm text-blue-700 mb-2">
                  We've sent a verification email to <strong>{formData.email}</strong>.
                </p>
                <p className="text-sm text-blue-700 mb-2">
                  <strong>⚠️ Please check your spam/junk folder</strong> if you don't see it in your inbox within a few minutes.
                </p>
                <p className="text-sm text-blue-600">
                  Don't worry - you can sign in and use your account right away without waiting for verification!
                </p>
              </div>
              <button
                onClick={() => navigate('/sign-in')}
                className="btn-primary w-full"
              >
                Go to Sign In
              </button>
            </div>
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-navy mb-3">
              Create Your Account
            </h1>
            <p className="text-lg text-gray-600">
              Join Gator Bookkeeping today
            </p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold text-navy mb-6">
              Sign Up
            </h2>

            {/* Social Sign Up Buttons */}
            <div className="mb-6">
              <button
                onClick={() => handleOAuthSignIn('google')}
                disabled={status === 'loading'}
                className="w-full btn-secondary flex items-center justify-center border-2"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or register with email</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleEmailRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
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
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
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
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input pl-10"
                    placeholder="your@email.com"
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input pl-10 pr-10"
                    placeholder="Min. 6 characters"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="form-input pl-10 pr-10"
                    placeholder="Re-enter password"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
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
                disabled={!isFormValid || status === 'loading'}
                className={`w-full btn-primary flex items-center justify-center ${
                  (!isFormValid || status === 'loading') ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {status === 'loading' ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>

          {/* Existing User CTA */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-gator-green-dark font-bold hover:underline">
                Sign in →
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
