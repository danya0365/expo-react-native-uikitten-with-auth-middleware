import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { TopNavigationView } from "@/components/molecules/top-navigation.view";
import ThemeLayout from "@/layouts/theme/theme.layout";
import AuthMiddleware from "@/middleware/auth.middleware";
import { Divider, TopNavigationAction, useTheme } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default (): React.ReactElement => {
  const router = useRouter();
  const theme = useTheme();
  const iconColor = theme["text-control-color"];

  const renderBackAction = (): React.ReactElement => {
    if (!router.canGoBack()) {
      return (
        <TopNavigationAction
          icon={<ArrowIosBackIcon fill={iconColor} />}
          onPress={() => {
            router.navigate("/home");
          }}
        />
      );
    }
    return (
      <TopNavigationAction
        icon={<ArrowIosBackIcon fill={iconColor} />}
        onPress={router.back}
      />
    );
  };

  return (
    <AuthMiddleware>
      <SafeAreaLayoutView style={styles.safeArea} insets="top">
        <TopNavigationView
          textTitle={`เลือกธีม`}
          accessoryLeft={renderBackAction}
        />
        <Divider />
        <ThemeLayout />
      </SafeAreaLayoutView>
    </AuthMiddleware>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
