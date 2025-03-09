
import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations, LanguageKey, TranslationKeys, defaultLanguage } from '../config/i18n';

interface LanguageContextType {
  currentLanguage: LanguageKey;
  t: (key: TranslationKeys, params?: Record<string, string | number>) => string;
  changeLanguage: (lang: LanguageKey) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>(() => {
    const saved = localStorage.getItem('language') as LanguageKey;
    return saved || defaultLanguage;
  });

  const changeLanguage = useCallback((lang: LanguageKey) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  const t = useCallback((key: TranslationKeys, params?: Record<string, string | number>) => {
    const keys = key.split('.');
    let value = keys.reduce((obj, k) => obj?.[k], translations[currentLanguage] as any);
    
    if (params) {
      Object.entries(params).forEach(([param, replacement]) => {
        value = value.replace(`{${param}}`, String(replacement));
      });
    }
    
    return value || key;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
