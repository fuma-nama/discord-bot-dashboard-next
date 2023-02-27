import { ReactNode, ReactElement } from 'react';
import { I18nConfig } from './create';

export type TranslationKey = string | number | symbol;

export type TranslationModel = {
  [key: TranslationKey]: any;
};

export type Translation<Model extends TranslationModel> = {
  [K in keyof Model]: Model[K];
};

export function element<Languages extends string, Model extends TranslationModel>(
  config: I18nConfig<Languages, Model>,
  key: keyof Model | ((model: Model) => ReactNode)
): ReactElement {
  return <config.T text={key} />;
}
