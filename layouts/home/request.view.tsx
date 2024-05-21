import useAppTheme from "@/hooks/app-theme";
import {
  Button,
  Card,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import WelcomeView from "./welcome.view";

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const { isDarkMode } = useAppTheme();

  return (
    <View
      style={[
        styles.rowContainer,
        { alignItems: "center", justifyContent: "space-between", gap: 8 },
      ]}
    >
      <Card
        style={{
          flex: 1,
          padding: 4,
          height: 150,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
        }}
        onPress={() => {
          console.log("ขอสินเชื่อ");
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <FontAwesome
            name="file-text-o"
            size={25}
            color={Colors[isDarkMode() ? "dark" : "light"].text}
            style={{ marginBottom: 15 }}
          />
        </View>
        <Text category="h6">ขอสินเชื่อ</Text>
      </Card>
      <Card
        style={{
          flex: 1,
          padding: 4,
          height: 150,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
        }}
        onPress={() => {
          console.log("ฝากเงิน");
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <FontAwesome
            name="money"
            size={25}
            color={Colors[isDarkMode() ? "dark" : "light"].text}
            style={{ marginBottom: 15 }}
          />
        </View>
        <Text category="h6">ฝากเงิน</Text>
      </Card>
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
