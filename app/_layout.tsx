import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";

import { Inter_300Light } from "@expo-google-fonts/inter";
import {
  Kanit_100Thin,
  Kanit_400Regular,
  Kanit_700Bold,
  Kanit_900Black,
} from "@expo-google-fonts/kanit";
import {
  Sarabun_100Thin,
  Sarabun_400Regular,
  Sarabun_700Bold,
  Sarabun_800ExtraBold,
} from "@expo-google-fonts/sarabun";

import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import CoreProvider from "@/providers/core";
import { defaultThemeConfig } from "@/providers/theme";
import { AppStorage } from "@/services/app-storage.service";
import { Theme } from "@/types/theme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(bottom-tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [storageTheme, setStorageTheme] = useState<Theme>();
  const [fontsLoaded, error] = useFonts({
    CSPraJad: require("../assets/fonts/CSPraJad-v2.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Kanit_100Thin,
    Kanit_400Regular,
    Kanit_700Bold,
    Kanit_900Black,
    Sarabun_100Thin,
    Sarabun_400Regular,
    Sarabun_700Bold,
    Sarabun_800ExtraBold,
    Inter_300Light,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded && storageTheme) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, storageTheme]);

  useEffect(() => {
    AppStorage.getTheme(defaultThemeConfig.theme).then((value) => {
      setStorageTheme(value);
    });
  }, []);

  if (!fontsLoaded || !storageTheme) {
    return null;
  }

  return (
    <CoreProvider theme={storageTheme}>
      <Slot />
    </CoreProvider>
  );
}
