import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { TopNavigationView } from "@/components/molecules/top-navigation.view";
import NotificationDetailLayout from "@/layouts/notification-detail/notification-detail.layout";
import AuthMiddleware from "@/middleware/auth.middleware";
import {
  Divider,
  StyleService,
  TopNavigationAction,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
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
          textTitle={`รายละเอียดประกาศ`}
          accessoryLeft={renderBackAction}
        />
        <Divider />
        <NotificationDetailLayout />
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
