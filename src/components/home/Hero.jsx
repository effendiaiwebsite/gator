import { motion } from 'framer-motion';
import { GATOR_IMAGES } from '../../config/constants';
import { useLanguage } from '../../hooks/useLanguage';

const Hero = ({ onStartCalculator }) => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-gator-green-light via-white to-gator-green-light py-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gator-green-dark opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold opacity-5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-white rounded-full shadow-md text-gator-green-dark font-semibold mb-6"
            >
              🐊 Gator Bookkeeping & Payroll
            </motion.span>

            <h1 className="text-5xl md:text-6xl font-bold text-navy mb-6 leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartCalculator}
                className="btn-primary text-lg px-8 py-4"
              >
                {t('hero.cta')}
              </button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center space-x-6"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gator-green-dark text-white flex items-center justify-center border-2 border-white font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-700 font-semibold">150+ Happy Clients</p>
                <p className="text-xs text-gray-500">Saving thousands every year</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Gator Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="speech-bubble absolute top-0 left-0 max-w-xs z-10"
              >
                <p className="text-navy font-medium">
                  Let me help you save money! Answer 3 quick questions to get started.
                </p>
              </motion.div>

              {/* Gator Image */}
              <img
                src={GATOR_IMAGES.BUSINESS_SUIT}
                alt="Gator mascot in business suit"
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />

              {/* Floating Badge */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-10 right-10 bg-white rounded-full shadow-xl p-4"
              >
                <div className="text-center">
                  <p className="text-3xl font-bold text-gator-green-dark">$4.8K</p>
                  <p className="text-xs text-gray-600">Avg. Savings</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
