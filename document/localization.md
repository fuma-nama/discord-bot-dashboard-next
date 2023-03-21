# Localization

We provide a built-in localization utils for you which is light-weight and type-safe

## Add a New language

We're using the built-in [Internationalized Routing](https://nextjs.org/docs/advanced-features/i18n-routing) from Next.js in order to setup i18n

Please read their guide to more details

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
