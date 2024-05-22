import { default as appThemeGreenDark } from "@/constants/app-theme-green-dark.json";
import { default as appThemeGreenLight } from "@/constants/app-theme-green-light.json";
import { default as appThemeYellowDark } from "@/constants/app-theme-yellow-dark.json";
import { default as appThemeYellowLight } from "@/constants/app-theme-yellow-light.json";
import { appThemes } from "@/constants/app-theming";
import useAppConfig from "@/hooks/app-config";
import { ThemeContextValue, Theming } from "@/services/theme.service";
import { List, ThemeProvider } from "@ui-kitten/components";
import React from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { ThemeHelper } from "@/helpers/theme.service";
import { ThemeCard } from "./theme-card.view";
import { ThemeItem } from "@/types/theme";

export default (): React.ReactElement => {
  const { themeScheme } = useAppConfig();

  const themeContext: ThemeContextValue = React.useContext(
    Theming.ThemeContext
  ) as ThemeContextValue;

  const themes: ThemeItem[] = ThemeHelper.createThemeListItems(appThemes);

  const onItemPress = (info: ListRenderItemInfo<ThemeItem>): void => {
    themeContext.setCurrentTheme(info.item.name);
  };

  const isActiveTheme = (theme: ThemeItem): boolean => {
    return themeContext.currentTheme === theme.name;
  };

  const shouldDisableItem = (theme: ThemeItem): boolean => {
    return themeContext.currentTheme === theme.name;
  };

  const createThemeNameForItem = (theme: ThemeItem): string => {
    return `${theme.name}`.toUpperCase();
  };

  const renderItem = (
    info: ListRenderItemInfo<ThemeItem>
  ): React.ReactElement => {
    let appTheme =
      info.item.name === "dark" ? appThemeGreenDark : appThemeGreenLight;
    if (themeScheme === "yellow")
      appTheme =
        info.item.name === "dark" ? appThemeYellowDark : appThemeYellowLight;
    return (
      <ThemeProvider theme={{ ...info.item.theme, ...appTheme }}>
        <ThemeCard
          style={styles.item}
          title={createThemeNameForItem(info.item)}
          isActive={isActiveTheme(info.item)}
          disabled={shouldDisableItem(info.item)}
          onPress={() => onItemPress(info)}
        />
      </ThemeProvider>
    );
  };

  return (
    <List
      contentContainerStyle={styles.container}
      data={themes}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  item: {
    margin: 8,
  },
  evaToggle: {
    margin: 8,
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
});
