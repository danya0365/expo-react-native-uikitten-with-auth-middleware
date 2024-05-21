import useAppTheme from "@/hooks/app-theme";
import {
  Button,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { router } from "expo-router";

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const { isDarkMode } = useAppTheme();

  return (
    <View
      style={[
        styles.rowContainer,
        { alignItems: "center", justifyContent: "space-between" },
      ]}
    >
      <Text category="h2">{`สวัสดี`}</Text>
      <Button
        onPress={() => {
          router.push("/(app)/term");
        }}
        size="tiny"
        appearance="ghost"
        style={{ padding: 4, margin: 2 }}
      >{`เงื่อนไขและข้อตกลง`}</Button>
    </View>
  );
};

const themedStyles = StyleService.create({
  rowContainer: {
    flexDirection: "row",
    width: "100%",
  },
  columnContainer: {
    flexDirection: "column",
    width: "100%",
  },
});
