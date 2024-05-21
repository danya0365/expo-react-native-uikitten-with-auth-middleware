import { default as appMapping } from "@/constants/app-mapping-eva.json";
import { default as appThemeGreenDark } from "@/constants/app-theme-green-dark.json";
import { default as appThemeGreenLight } from "@/constants/app-theme-green-light.json";
import { default as appThemeYellowDark } from "@/constants/app-theme-yellow-dark.json";
import { default as appThemeYellowLight } from "@/constants/app-theme-yellow-light.json";
import { appThemes } from "@/constants/app-theming";
import useAppConfig from "@/hooks/app-config";
import { Theme } from "@/types/theme";
import * as eva from "@eva-design/eva";
import { ApplicationProvider as UIKittenApplicationProvider } from "@ui-kitten/components";
import React from "react";
import { Theming } from "../services/theme.service";

export const defaultThemeConfig: { theme: Theme } = {
  theme: "light",
};

export type Props = {
  children?: React.ReactNode;
  theme: Theme;
};

const ThemeProvider: React.FC<Props> = ({ children, theme }) => {
  const [themeContext] = Theming.useTheming(appThemes, theme);
  const { themeScheme } = useAppConfig();

  let appTheme = themeContext.isDarkMode()
    ? { ...eva.dark, ...appThemeGreenDark }
    : { ...eva.light, ...appThemeGreenLight };
  if (themeScheme === "yellow")
    appTheme = themeContext.isDarkMode()
      ? { ...eva.dark, ...appThemeYellowDark }
      : { ...eva.light, ...appThemeYellowLight };
  return (
    <UIKittenApplicationProvider
      {...eva}
      theme={appTheme}
      customMapping={appMapping as any}
    >
      <Theming.ThemeContext.Provider value={themeContext}>
        {children}
      </Theming.ThemeContext.Provider>
    </UIKittenApplicationProvider>
  );
};

export default ThemeProvider;
