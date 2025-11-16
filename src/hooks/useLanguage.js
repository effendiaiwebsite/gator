import { useState, useEffect } from 'react';
import { detectLanguage, t as translate, setLanguage as changeLanguage } from '../utils/i18n';

export const useLanguage = () => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const detected = detectLanguage();
    setLanguageState(detected);
  }, []);

  const t = (keyPath, replacements = {}) => {
    return translate(keyPath, language, replacements);
  };

  const setLanguage = (lang) => {
    changeLanguage(lang);
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
    t
  };
};
