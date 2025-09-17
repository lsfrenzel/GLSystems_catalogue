import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function usePageTitle(titleKey?: string) {
  const { t, language } = useLanguage();

  useEffect(() => {
    if (titleKey) {
      // Use the provided title key
      document.title = t(titleKey);
    } else {
      // Default to home page title
      document.title = t('page.title.home');
    }
  }, [t, titleKey, language]);
}