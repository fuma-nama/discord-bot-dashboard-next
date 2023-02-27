![banner](./document/4B9E09C4-48F7-47B4-9622-93A43912BE63.png)

# Mordern Discord Bot Dashboard

> This project is still in development

Using typescript, Next.js 13, react 18 and chakra ui 2.0

- Support Light/Dark theme
- Multi languages support (i18n)
- Typescript support
- Nice UI & UX + Fast performance
- Flexiable and Customizable
- Detailed Documentation

**Live Demo:** https://demo-discord-dashboard.vercel.app/

- Only 'Welcome message' Feature is Supported
- The api might be down sometimes (It is using the free tier of Koyeb)

## Review (might not the latest version)

|                  Light                   |                  Dark                  |
| :--------------------------------------: | :------------------------------------: |
| ![light-mode](./document/home-light.png) | ![dark-mode](./document/home-dark.png) |

## Getting Started

As a template, you need to customize a few things in order to get it work

### Before that

- Install Node.js, and a Package Manager (ex: npm or pnpm)

### Required Skills

- Basic knowledge about React.js
- Able to read javascript/typescript

### Set up

1. **Clone the repo**
   <br>
   `git clone https://github.com/SonMooSans/discord-bot-dashboard-2.git`
2. **Install dependencies**

   |      NPM      |      PNPM      |      Yarn      |
   | :-----------: | :------------: | :------------: |
   | `npm install` | `pnpm install` | `yarn install` |

3. **Customize following files**
   - [src/pages/user/home](./src/pages/user/home.tsx) **User Dashboard** - Some states about the user
   - [src/components/HomeView](./src/components/HomeView.tsx) **Home page** - introduce your bot
   - [src/pages/guilds/[guild]](./src/pages/guilds/[guild]/index.tsx) **Guild Dashboard** - The place to customize guild (ex: features, actions)
4. **Define Features**
   <br>
   The dashboard has built-in support for configuring features
   <br>
   Users are able to enable/disable features and config the feature after enabling it

   **Customize all typings in [src/config/types/custom-types.ts](./src/config/types/custom-types.ts)**
   <br>
   `CustomFeatures` is used for defining features and options, see the example for more details

   **Open [src/config/features](./src/config/features.tsx)**
   <br>
   You can see how a feature is configured

   ```tsx
   'feature-id': {
        name: 'Feature name',
        description: 'Description about this feature',
        icon: <Icon as={BsMusicNoteBeamed} />, //give it a cool icon
        useRender: (data) => {
            //render the form
        },
    }
   ```

   The `useRender` property is used to render Feature Configuration Panel
   Take a look at [example/MusicFeature.tsx](./src/config/example/MusicFeature.tsx) to learn more

5. **Configure General Information**
   <br>
   Modify [src/config/common.tsx](./src/config/common.tsx)
   - Bot name & icon
   - Invite url _(example: https://discord.com/oauth2/authorize?client_id=1234&scope=bot)_
   - Guild settings
6. **Configure Your API Endpoint url**
   <br>
   You can define the API Endpoint by
   - Setting the `VITE_API_ENDPOINT` environment variable
   - Modify the default url in [src/api/bot.ts](./src/api/bot.ts) _(default: http://localhost:8080)_
7. **Done!**
   <br>
   Start the app by `npm run dev` _(depends on your package manager)_
   <br>
   Then you should see the app started in port `3000`

## Localization

We provide a built-in localizaion utils for you which is light-weight and type-safe

Create the provider

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
  getLang: () => useSettingsStore.getState().lang,
  useLang: () => useSettingsStore((s) => s.lang),
});
```

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

Use it in any places

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

## Authorization

Create your OAuth2 application in https://discord.com/developers/applications

**`Login -> Discord OAuth -> Backend Server -> Client`**

- Open login url
  <br>
  In dev mode, it is the `http://localhost:8080/login`
  Redirects user to discord oauth url
- Open Discord OAuth url
  - User authorizes the application
  - Redirect back to backend server _(http://localhost:8080/callback)_
- Backend Server
  - Store the access token in user cookies _(You may encrypt the cooke)_
  - Redirect back to Frontend web app (http://localhost:3000)
- Web App updates State

## Backend Development

You should see "Failed to login" after running the app, why?
<br>
That is because it failed to connect to backend server (Your bot)

As a frontend template, we doesn't provide an built-in Backend
<br>
Check [src/api/bot.ts](./src/api/bot.ts), it defined a built-in API for fetching data and authorization
<br>

### Required Routes

You may extend it for more functions

GET `/auth`

- get access token (string)
- If not logged in, **Respond null or 401 error**

POST `/auth/signout`

- Sign out _(ex: removing cookies)_

GET `/guilds/{guild}`

- Get guild info (`custom-types.ts > CustomGuildInfo`)
- **Respond Null (in json) if bot hasn't joined the guild**

GET `/guilds/{guild}/features/{feature}`

- Get Feature options (`custom-types.ts > CustomFeatures[K]`)
- **Respond 404 if not enabled**

PATCH `/guilds/{guild}/features/{feature}`

- Update feature options
- With custom body (defined in `config/features`)
- Respond updated feature options

POST `/guilds/{guild}/features/{feature}`

- Enable a feature

DELETE `/guilds/{guild}/features/{feature}`

- Disable a feature

GET `/guilds/{guild}/roles`

- Get Roles of the guild
- Responds a list of [Role Object](https://discord.com/developers/docs/topics/permissions#role-object) _(Same as discord documentation)_

GET `/guilds/{guild}/channels`

- Get Channels of the guild
- Responds a list of [Guild Channel](https://discord.com/developers/docs/resources/channel#channel-object) _(Same as discord documentation)_

### Example Backend used for Demo?

Not recommended, but I had written the backend in different programming languages for the Live Demo
<br>
**Kotlin:** https://github.com/SonMooSans/discord-bot-dashboard-backend _(2.0.0 branch)_
<br>
**Golang:** https://github.com/SonMooSans/discord-bot-dashboard-backend-go
<br>
**Node.js (Typescript):** https://github.com/SonMooSans/discord-bot-dashboard-backend-ts

## Any issues?

Feel free to ask a question by opening a issue

**Love this project?** Give this repo a star!
