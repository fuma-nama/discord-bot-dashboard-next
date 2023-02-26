import { initLanguages, initI18n } from 'hooks/i18n';
import { useSettingsStore } from 'stores';

/**
 * Supported languages
 */
export type Languages = 'en' | 'cn';
export const { languages, names } = initLanguages<Languages>({
  en: 'English',
  cn: '中文',
});

export const provider = initI18n({
  getLang: () => useSettingsStore.getState().lang,
  useLang: () => useSettingsStore((s) => s.lang),
});
