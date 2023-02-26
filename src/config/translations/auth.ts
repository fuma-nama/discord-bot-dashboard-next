import { provider } from './provider';
import { createI18n } from 'hooks/i18n';

export const auth = createI18n(provider, {
  en: {
    login: 'Login',
    'login description': 'Login to your Discord Account',
  },
  cn: {
    login: '登錄',
    'login description': '登錄您的 Discord 帳戶',
  },
});
