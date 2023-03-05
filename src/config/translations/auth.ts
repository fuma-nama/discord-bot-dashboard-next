import { provider } from './provider';
import { createI18n } from '@/utils/i18n';

export const auth = createI18n(provider, {
  en: {
    login: 'Sign in',
    'login description': 'Login and start using our bot today',
    login_bn: 'Login with Discord',
  },
  cn: {
    login: '登入控制面板',
    'login description': '登錄並開始使用我們的機器人',
    login_bn: '使用 Discord 登錄',
  },
});
