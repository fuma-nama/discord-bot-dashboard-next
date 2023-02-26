import { provider } from './provider';
import { createI18n } from 'hooks/i18n';

export const home = createI18n(provider, {
  en: {
    music: 'Music',
    'reaction role': 'Reaction Role',
    'auto moderator': 'Auto Moderator',
    'next gen discord bot': 'Next-gen Discord Bot',
    'play music anywhere': 'Play music anywhere',
    'reaction role description': 'Give user a role when clicking on a button or reaction',
    'auto moderator description': 'Keep your server safe and clean',
    'trusted by': ['Trusted by ', ' servers'],
  },
  cn: {
    music: '音樂',
    'reaction role': '反應角色',
    'auto moderator': '自動管理',
    'next gen discord bot': '下一代 Discord 機器人',
    'play music anywhere': '隨處播放音樂',
    'reaction role description': '單擊按鈕或反應時為用戶賦予角色',
    'auto moderator description': '確保您的服務器安全免受襲擊',
    'trusted by': ['受到', '個服務器的信任'],
  },
});
