import React from "react";
import { AppStorage } from "./app-storage.service";
import { Appearance, ColorSchemeName } from "react-native";
import { Theme } from "@/types/theme";

export interface ThemeContextValue {
  /**
   * Should return the name of current theme
   */
  currentTheme: Theme;
  /**
   * Should switch theme globally
   */
  setCurrentTheme: (theme: Theme) => void;
  /**
   * Should return true if current theme is dark or dark mode enabled
   */
  isDarkMode: () => boolean;
  /**
   * Should create a theme based on current
   */
  createTheme: (upstreamTheme: Theme) => any;
}

export class Theming {
  static ThemeContext = React.createContext<ThemeContextValue | null>(null);

  static useTheming = (
    themes: Record<Theme, any>,
    theme: Theme
  ): [ThemeContextValue, any] => {
    const [currentTheme, setCurrentTheme] = React.useState<Theme>(theme);

    React.useEffect(() => {
      const subscription = Appearance.addChangeListener((preferences): void => {
        const appearanceTheme: Theme = Theming.createAppearanceTheme(
          preferences.colorScheme,
          theme
        );
        setCurrentTheme(appearanceTheme);
      });

      return () => subscription.remove();
    }, []);

    const isDarkMode = (): boolean => {
      return currentTheme === "dark";
    };

    const createTheme = (upstreamTheme: Theme): any => {
      return {
        ...themes[currentTheme],
        ...themes[upstreamTheme][currentTheme],
      };
    };

    const themeContext: ThemeContextValue = {
      currentTheme,
      setCurrentTheme: (nextTheme) => {
        AppStorage.setTheme(nextTheme);
        setCurrentTheme(nextTheme);
      },
      isDarkMode,
      createTheme,
    };

    return [themeContext, themes[currentTheme]];
  };

  static useTheme = (upstreamTheme: Theme): any => {
    const themeContext = React.useContext(Theming.ThemeContext);
    return themeContext?.createTheme(upstreamTheme);
  };

  private static createAppearanceTheme = (
    colorScheme: ColorSchemeName,
    preferredTheme: Theme
  ): Theme => {
    if (!colorScheme) {
      return preferredTheme;
    }
    return colorScheme;
  };
}
