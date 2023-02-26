import { provider } from './provider';
import { createI18n } from 'hooks/i18n';

export const dashboard = createI18n(provider, {
  en: {
    welcome: 'Wellcome back, ',
    pricing: 'Pricing',
    invite: {
      title: 'Invite our Bot',
      description: 'Try our discord bot with one-click',
      bn: 'Invite now',
    },
    music: {
      title: 'Music Player',
      description: 'Play Your Favoite songs in Voice channels',
      'now playing': 'Now Playing',
    },
    vc: {
      create: 'Create a voice channel',
      'created channels': 'Created Voice channels',
    },
    command: {
      title: 'Command Usage',
      description: 'Use of commands of your server',
    },
  },
  cn: {
    welcome: '歡迎回來, ',
    pricing: '價錢',
    invite: {
      title: '邀請我們的機器人',
      description: '一鍵試用我們的 Discord 機器人',
      bn: '現在邀請',
    },
    music: {
      title: '音樂播放器',
      description: '在語音頻道中播放您最喜歡的歌曲',
      'now playing': '正在播放',
    },
    vc: {
      create: '創建語音通道',
      'created channels': '已創建語音頻道',
    },
    command: {
      title: '命令使用量',
      description: '使用你的服務器命令使用量',
    },
  },
});
