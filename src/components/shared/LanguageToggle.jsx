import { Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg border-2 border-gray-300 hover:border-gator-green-dark transition-colors"
      aria-label="Toggle language"
    >
      <Globe size={18} />
      <span className="font-semibold text-sm">
        {language === 'en' ? 'EN' : 'FR'}
      </span>
    </button>
  );
};

export default LanguageToggle;
