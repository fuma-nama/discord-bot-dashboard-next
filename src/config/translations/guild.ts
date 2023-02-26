import { provider } from './provider';
import { createI18n } from 'hooks/i18n';

export const guild = createI18n(provider, {
  en: {
    features: 'Features',
    banner: {
      title: 'Getting Started',
      description: 'Create your bot and type something',
    },
    error: {
      'not found': 'Where is it?',
      'not found description': "The bot can't access the server, let's invite him!",
      load: 'Failed to load guild',
    },
    bn: {
      'enable feature': 'Enable',
      'config feature': 'Config',
      invite: 'Invite bot',
      settings: 'Settings',
    },
  },
  cn: {
    features: '管理機器人功能',
    banner: {
      title: '立即免費試用',
      description: '為您的服務器定制機器人',
    },
    error: {
      'not found': '它在哪裡？',
      'not found description': '機器人無法訪問服務器，我們邀請他吧！',
      load: '無法加載服務器',
    },
    bn: {
      'enable feature': '啟用功能',
      'config feature': '配置',
      invite: '邀請機器人',
      settings: '設置',
    },
  },
});
