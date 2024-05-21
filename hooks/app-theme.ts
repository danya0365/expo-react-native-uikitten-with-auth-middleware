import { ThemeContextValue, Theming } from "@/services/theme.service";
import React from "react";

const useAppTheme = () => {
  const { isDarkMode, currentTheme, setCurrentTheme } = React.useContext(
    Theming.ThemeContext
  ) as ThemeContextValue;

  return {
    isDarkMode,
    currentTheme,
    setCurrentTheme,
  };
};

export default useAppTheme;
