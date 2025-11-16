import { motion, AnimatePresence } from 'framer-motion';
import { GATOR_IMAGES } from '../../config/constants';
import { useLanguage } from '../../hooks/useLanguage';

const GatorGuide = ({ message, gatorState = 'business', show = true }) => {
  const { t, language } = useLanguage();

  const gatorImages = {
    business: GATOR_IMAGES.BUSINESS_SUIT,
    happy: GATOR_IMAGES.THUMBS_UP,
    pointing: GATOR_IMAGES.POINTING,
    chill: GATOR_IMAGES.CHILL
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-start space-x-4 mb-6"
        >
          {/* Gator Image */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex-shrink-0"
          >
            <img
              src={gatorImages[gatorState]}
              alt="Gator guide"
              className="w-24 h-24 object-contain"
            />
          </motion.div>

          {/* Speech Bubble */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="speech-bubble flex-grow"
          >
            <p className="text-navy text-base leading-relaxed">
              {message}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GatorGuide;
