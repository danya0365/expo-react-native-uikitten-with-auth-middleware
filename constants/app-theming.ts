import * as eva from "@eva-design/eva";
import { default as appThemeGreenLight } from "@/constants/app-theme-green-light.json";
import { default as appThemeGreenDark } from "@/constants/app-theme-green-dark.json";
import { default as appThemeYellowLight } from "@/constants/app-theme-yellow-light.json";
import { default as appThemeYellowDark } from "@/constants/app-theme-yellow-dark.json";

export type ThemeScheme = "green" | "yellow";

export const appThemes = {
  light: eva.light,
  dark: eva.dark,
  green: {
    light: appThemeGreenLight,
    dark: appThemeGreenDark,
  },
  yellow: {
    light: appThemeYellowLight,
    dark: appThemeYellowDark,
  },
};
