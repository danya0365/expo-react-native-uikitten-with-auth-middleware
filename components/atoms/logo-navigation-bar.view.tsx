// 3 Ways to Add Image Icon Inside Navigation Bar in React Native
// https://aboutreact.com/react-native-image-icon-inside-navigation-bar/

import React from "react";

import { View, Image, StyleSheet } from "react-native";
import { ThemeContextValue, Theming } from "@/services/theme.service";

const LogoNavigationBarView = () => {
  const { currentTheme }: ThemeContextValue = React.useContext(
    Theming.ThemeContext
  ) as ThemeContextValue;

  React.useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <Image
        source={
          currentTheme == "dark"
            ? require("@/assets/img/chaothuk-logo-dark.png")
            : require("@/assets/img/chaothuk-logo.png")
        }
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 129,
    height: 50,
    borderRadius: 40 / 2,
  },
});

export default LogoNavigationBarView;
