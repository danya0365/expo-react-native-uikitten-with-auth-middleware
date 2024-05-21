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
