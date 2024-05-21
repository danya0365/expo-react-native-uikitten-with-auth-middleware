# expo-react-native-uikitten-with-auth-middleware

Create Auth Middleware on Expo React native with UIKitten

## Getting Started

```batch
yarn
```

## Run

- Run on real device
  `npx expo start`

- Run with clean cache
  `npx expo start --clear`

- Run at Localhost
  `npx expo start --localhost`

- Run on Simulator
  `yarn ios`

## Build

using eas build

```batch
eas build --platform android
#or
eas build -p android --profile preview
#or
eas build -p ios --profile preview
```

## Build for Store

build to production

```batch
eas build --platform android
#or
eas build -p android --profile production
#or
eas build -p ios --profile production
```

## Submit to store

```batch
eas submit -p android
eas submit -p ios
```

## Helper

- Add web support
  `npx expo install react-dom react-native-web @expo/webpack-config`

- [Expo Router Docs](https://expo.github.io/router/docs/)
  `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler`

- [Reac Animation Docs](https://docs.expo.dev/develop/user-interface/animation/)
  `npx expo install react-native-reanimated`
  Add web support
  `yarn add --dev @babel/plugin-transform-export-namespace-from`

- [Integrate EAS Build](https://docs.expo.dev/build/setup/)
  `npm install -g eas-cli`
  `eas login`

- [read env variable in eas.json](https://dev.to/alexcoding42/how-to-set-environment-variables-with-easexpo-and-react-native-3b2n)
  `npx expo install dotenv`

- [Generate config file](https://docs.expo.dev/workflow/configuration/)
  create `app.config.js`

- Dont forget to clear every time when config is changed
  `npx expo start --clear`

- generate metro.config and android/ios folder for prebuild
  `npx expo prebuild`

- install Package via expo
  `npx expo install {pakage-name}`
  Q: Is it safe to use `expo install` for everything that I need to install?
  A: Yes, there is nothing wrong with using it to install all of your dependencies. All expo install does is check for compatibilities with your current expo versiono.
