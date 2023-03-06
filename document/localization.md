# Localization

We provide a built-in localizaion utils for you which is light-weight and type-safe

## Create i18n provider

> provider.ts

```typescript
import { initLanguages, initI18n } from '@/utils/i18n';
import { useSettingsStore } from '@/stores';

// Supported languages
export const { languages, names } = initLanguages<'en' | 'cn'>({
  en: 'English',
  cn: '中文',
});

// Create provider and export it
// We need to define how to get the current language
export const provider = initI18n({
  useLang: () => {...},
});
```

## Define Translations

Create the translation config (Default folder: [src/config/translations](./src/config/translations))

> test.ts

```ts
import { provider } from './provider'; //import the provider
import { createI18n } from '@/utils/i18n';

export const test = createI18n(provider, {
  en: {
    hello: 'Hello',
  },
  cn: {
    hello: '你好',
  },
});
```

## Use it in any places

> component.tsx

```tsx
import {test} from '@/config/translations/test'

export function YourComponent() {
  const t = test.useTranslations();

  return <>
   <p>{t.hello}</p>
   <test.T text='hello'>
  </>
}
```
