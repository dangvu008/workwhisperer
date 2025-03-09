
import { vi } from './vi';
import { en } from './en';

export type LanguageKey = 'vi' | 'en';

export const translations = {
  vi,
  en,
};

export type TranslationKeys = keyof typeof vi;

export const defaultLanguage: LanguageKey = 'vi';
