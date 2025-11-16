import { motion } from 'framer-motion';
import { Award, TrendingUp, Trophy } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const StatusTracker = ({ currentStatus = 'bronze', onStatusClick }) => {
  const { t } = useLanguage();

  const statuses = [
    {
      level: 'bronze',
      label: t('portal.status.bronze'),
      icon: Award,
      color: 'orange',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-800',
      requirement: 'Sign up complete'
    },
    {
      level: 'silver',
      label: t('portal.status.silver'),
      icon: TrendingUp,
      color: 'gray',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-400',
      textColor: 'text-gray-800',
      requirement: 'Upload 1 document'
    },
    {
      level: 'gold',
      label: t('portal.status.gold'),
      icon: Trophy,
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-800',
      requirement: 'Upload all documents'
    }
  ];

  const currentIndex = statuses.findIndex(s => s.level === currentStatus);

  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold text-navy mb-4">Your Status</h3>

      {/* Status Timeline */}
      <div className="flex items-center justify-between mb-6">
        {statuses.map((status, index) => {
          const Icon = status.icon;
          const isActive = index <= currentIndex;
          const isCurrent = status.level === currentStatus;

          return (
            <div key={status.level} className="flex-1 flex items-center">
              {/* Status Circle */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                className="relative flex flex-col items-center"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all ${
                    isActive
                      ? `${status.bgColor} ${status.borderColor}`
                      : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      isActive ? status.textColor : 'text-gray-400'
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`mt-2 text-sm font-semibold ${
                    isActive ? status.textColor : 'text-gray-500'
                  }`}
                >
                  {status.label}
                </span>

                {/* Current Indicator */}
                {isCurrent && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gator-green-dark text-white text-xs px-2 py-1 rounded-full"
                  >
                    Current
                  </motion.div>
                )}
              </motion.div>

              {/* Connector Line */}
              {index < statuses.length - 1 && (
                <div className="flex-1 h-1 mx-2">
                  <div
                    className={`h-full rounded transition-all ${
                      index < currentIndex ? 'bg-gator-green-dark' : 'bg-gray-300'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next Step */}
      {currentIndex < statuses.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gator-green-light p-4 rounded-lg"
        >
          <p className="text-sm text-gray-700">
            <strong>Next step:</strong> {statuses[currentIndex + 1].requirement}
          </p>
        </motion.div>
      )}

      {/* Gold Status Unlock Message */}
      {currentStatus === 'gold' && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-yellow-100 to-gold p-4 rounded-lg text-center"
        >
          <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
          <p className="font-bold text-yellow-900">
            🎉 Gold Status Unlocked! You've completed everything!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StatusTracker;
