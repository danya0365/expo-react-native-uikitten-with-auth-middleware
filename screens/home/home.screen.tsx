import { ColorPaletteOutlineIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import HomeLayout from "@/layouts/home/home.layout";
import { Divider, StyleService, useStyleSheet } from "@ui-kitten/components";
import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { TopNavigationView } from "../../components/molecules/top-navigation.view";
import AuthMiddleware from "@/middleware/auth.middleware";

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const renderRightAction = (): React.ReactElement => (
    <Link href="/theme" asChild>
      <Pressable>
        {({ pressed }) => (
          <ColorPaletteOutlineIcon
            style={[
              styles.iconButton,
              { marginRight: 15, opacity: pressed ? 0.5 : 1 },
            ]}
          />
        )}
      </Pressable>
    </Link>
  );

  return (
    <AuthMiddleware>
      <SafeAreaLayoutView style={styles.safeArea} insets="top">
        <TopNavigationView accessoryRight={renderRightAction} />
        <Divider />
        <HomeLayout />
      </SafeAreaLayoutView>
    </AuthMiddleware>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  iconButton: {
    aspectRatio: 1.0,
    height: 24,
  },
});
