import { CustomFeatures } from './types';
import { features } from './features';
import { FeatureConfig } from './types';

export type IdFeature<K extends keyof CustomFeatures = keyof CustomFeatures> = FeatureConfig<K> & {
  id: K;
};

export function getFeatures(): IdFeature<any>[] {
  return Object.entries(features).map(([k, v]) => {
    return {
      id: k,
      ...v,
    };
  });
}
