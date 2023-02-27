import { provider } from './provider';
import { createI18n } from '@/utils/i18n';

export const common = createI18n(provider, {
  en: {
    loading: 'Loading',
    search: 'Search',
    'select lang': 'Select your language',
    dashboard: 'Dashboard',
    profile: 'Profile',
    pages: '@/pages',
    logout: 'Logout',
  },
  cn: {
    loading: '加載中',
    search: '搜索',
    'select lang': '選擇你的語言',
    dashboard: '儀表板',
    profile: '用戶資料',
    pages: '所有頁面',
    logout: '登出',
  },
});
