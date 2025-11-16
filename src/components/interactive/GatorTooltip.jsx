import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const GatorTooltip = ({ term, explanation, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <span className="relative inline-block">
      <span
        className="border-b-2 border-dotted border-gator-green-dark cursor-help inline-flex items-center gap-1"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {term}
        <HelpCircle size={14} className="text-gator-green-dark" />
      </span>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${positionClasses[position]} w-64`}
          >
            <div className="bg-white border-2 border-gator-green-dark rounded-lg shadow-xl p-4">
              <div className="flex items-start gap-2">
                <div className="text-3xl flex-shrink-0">🐊</div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gator-green-dark">Gator says:</span>
                    <br />
                    {explanation}
                  </p>
                </div>
              </div>
              {/* Arrow */}
              <div className={`absolute w-3 h-3 bg-white border-gator-green-dark transform rotate-45 ${
                position === 'top' ? 'bottom-[-7px] left-1/2 -translate-x-1/2 border-b-2 border-r-2' :
                position === 'bottom' ? 'top-[-7px] left-1/2 -translate-x-1/2 border-t-2 border-l-2' :
                position === 'left' ? 'right-[-7px] top-1/2 -translate-y-1/2 border-t-2 border-r-2' :
                'left-[-7px] top-1/2 -translate-y-1/2 border-b-2 border-l-2'
              }`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default GatorTooltip;
