import { CustomFeatures } from './custom-types';
import { Guild } from '@/api/discord';
import { ReactElement, ReactNode } from 'react';

export type AppConfig = {
  /**
   * bot name
   */
  name: string;
  /**
   * icon (react component)
   */
  icon?: (props: any) => ReactElement;
  /**
   * Guild settings
   */
  guild: GuildConfig;
  /**
   * Url to invite the bot
   *
   * example: `https://discord.com/api/oauth2/authorize?client_id=907955781972918281&permissions=8&scope=bot`
   */
  inviteUrl: string;
};

export type GuildConfig = {
  /**
   * Filter configurable guilds
   *
   * ex: to allow only if user permissions include ADMINISTRATOR
   * ```
   * import { PermissionFlags } from '@/api/discord';
   * (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0
   * ```
   */
  filter: (guild: Guild) => boolean;
};

export interface GuildInfo {
  enabledFeatures: string[];
}

export type FeaturesConfig = {
  [K in keyof CustomFeatures]: FeatureConfig<K>;
};

/**
 * Internal Feature info
 */
export interface FeatureConfig<K extends keyof CustomFeatures> {
  name: ReactNode;
  description?: ReactNode;
  icon?: ReactElement;
  /**
   * Render content in Feature view
   */
  useRender: UseFormRender<CustomFeatures[K]>;
  /**
   * Render skeleton before featrue is loaded
   */
  useSkeleton?: () => ReactNode;
}

type SubmitFn<T> = (data: FormData | string) => Promise<T>;

export type UseFormRenderResult = {
  /**
   * Save bar will be disappeared if `canSave` is false
   */
  canSave?: boolean;

  /**
   * called on submit
   */
  onSubmit: () => void;

  /**
   * Reset current value
   */
  reset?: () => void;

  component: ReactElement;
};

export type UseFormRender<T = unknown> = (data: T, onSubmit: SubmitFn<T>) => UseFormRenderResult;
