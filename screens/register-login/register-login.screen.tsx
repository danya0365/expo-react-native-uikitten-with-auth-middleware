import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { TopNavigationView } from "@/components/molecules/top-navigation.view";
import RegisterLoginLayout from "@/layouts/register-login/register-login.layout";
import { Divider, StyleService, useStyleSheet } from "@ui-kitten/components";
import React from "react";

type Props = {};

export default (_: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigationView textTitle={`เข้าสู่ระบบหรือลงทะเบียน`} />
      <Divider />
      <RegisterLoginLayout />
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
