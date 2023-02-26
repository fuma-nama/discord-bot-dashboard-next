/***
 * Custom types that should be configured by developer
 ***/

import { GuildInfo } from '.';

export type CustomGuildInfo = GuildInfo & {};

/**
 * Define feature ids and it's option types
 */
export type CustomFeatures = {
  music: MusicFeature;
  gaming: {};
  'reaction-role': {};
  meme: {};
  'welcome-message': WelcomeMessageFeature;
};

/** example only */
export type WelcomeMessageFeature = {
  channel?: string;
  message: string;
};

/** example only */
export type MusicFeature = {
  message: string;
  channel?: string;

  role?: string;
  color?: string;
  count?: string;
  date?: Date;
  file?: File[];
  bool: boolean;
  tags: string[];
};
