/***
 * Custom types that should be configured by developer
 ***/

import { z } from 'zod';
import { GuildInfo } from './types';

export type CustomGuildInfo = GuildInfo & {};

/**
 * Define feature ids and it's option types
 */
export type CustomFeatures = {
  music: {};
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

export const memeFeatureSchema = z.object({
  channel: z.string().optional(),
  source: z.enum(['youtube', 'twitter', 'discord']).optional(),
});

export type MemeFeature = z.infer<typeof memeFeatureSchema>;
