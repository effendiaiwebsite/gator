import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, Loader, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useLanguage } from '../hooks/useLanguage';
import { checkRateLimit, clearRateLimit } from '../utils/rateLimit';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const ADMIN_EMAIL = 'satindersandhu138@gmail.com';

const SignIn = () => {
  const { signInWithEmail, signInWithOAuth, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Check rate limit
    const rateLimitCheck = checkRateLimit('signIn', email);
    if (!rateLimitCheck.allowed) {
      setStatus('error');
      setErrorMessage(`${rateLimitCheck.message} (Try again in ${rateLimitCheck.retryAfter} minutes)`);
      return;
    }

    try {
      const result = await signInWithEmail(email, password);

      if (result.success) {
        // Clear rate limit on successful sign-in
        clearRateLimit('signIn', email);

        // Check if admin user
        if (email === ADMIN_EMAIL) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/portal', { replace: true });
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to sign in. Please try again.');
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
      const result = await signInWithOAuth(provider);

      if (result.success) {
        // Clear rate limit on successful OAuth
        clearRateLimit('oauth', provider);

        // Check if admin user
        if (result.user.email === ADMIN_EMAIL) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/portal', { replace: true });
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || `Failed to sign in with ${provider}. Please try again.`);
    }
  };

  const isValid = email.includes('@') && password.length >= 6;

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
              Welcome Back!
            </h1>
            <p className="text-lg text-gray-600">
              Sign in to access your client portal
            </p>
          </div>

          {/* Sign In Card */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-navy mb-6">
              Sign In
            </h2>

            {/* Social Sign In Buttons */}
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
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input pl-10 pr-10"
                    placeholder="Enter your password"
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
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-gator-green-dark hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* New User CTA */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              New to Gator Bookkeeping?{' '}
              <Link to="/register" className="text-gator-green-dark font-bold hover:underline">
                Create an account →
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
