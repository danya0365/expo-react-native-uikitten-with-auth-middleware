module.exports = ({ config }) => {
  const iosBundleId = config.ios.bundleIdentifier;
  const androidPackage = config.android.package;
  const returnConfig = {
    ...config,
    ios: {
      ...config.ios,
      bundleIdentifier: process.env.APP_IOS_DUNDLE_ID ?? iosBundleId,
    },
    android: {
      ...config.android,
      package: process.env.APP_ANDROID_PACKAGE ?? androidPackage,
    },
    extra: {
      ...config.extra,
      appEnvironment: process.env.APP_ENVIRONMENT ?? "local",
      apiUrl: process.env.API_URL ?? "http://localhost/api",
      publicUrl: process.env.PUBLIC_URL ?? "http://localhost",
    },
  };
  return returnConfig;
};
