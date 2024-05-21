import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { TopNavigationView } from "@/components/molecules/top-navigation.view";
import LoginLayout from "@/layouts/login/login.layout";
import {
  Divider,
  StyleService,
  TopNavigationAction,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";

type Props = {};

export default (_: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const iconColor = theme["text-control-color"];

  const renderBackAction = (): React.ReactElement => {
    if (!router.canGoBack()) {
      return <></>;
    }
    return (
      <TopNavigationAction
        icon={<ArrowIosBackIcon fill={iconColor} />}
        onPress={router.back}
      />
    );
  };

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigationView
        textTitle={`เข้าสู่ระบบ`}
        accessoryLeft={renderBackAction}
      />
      <Divider />
      <LoginLayout />
    </SafeAreaLayoutView>
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
