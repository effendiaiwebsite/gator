import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const MagicLink = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyMagicLink } = useAuth();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setError('No token provided in the URL');
      return;
    }

    verifyToken(token);
  }, [searchParams]);

  const verifyToken = async (token) => {
    try {
      setStatus('verifying');
      await verifyMagicLink(token);
      setStatus('success');

      // Redirect to portal after 2 seconds
      setTimeout(() => {
        navigate('/portal');
      }, 2000);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Invalid or expired magic link');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gator-green-light to-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-md w-full p-8 text-center"
      >
        {status === 'verifying' && (
          <>
            <div className="spinner mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-navy mb-2">
              Verifying your magic link...
            </h2>
            <p className="text-gray-600">
              Please wait while we log you in
            </p>
          </>
        )}

        {status === 'success' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-navy mb-2">
              Success! 🎉
            </h2>
            <p className="text-gray-600">
              Redirecting you to your portal...
            </p>
          </motion.div>
        )}

        {status === 'error' && (
          <>
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-navy mb-2">
              Invalid Magic Link
            </h2>
            <p className="text-gray-600 mb-4">
              {error}
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Return to Home
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default MagicLink;
