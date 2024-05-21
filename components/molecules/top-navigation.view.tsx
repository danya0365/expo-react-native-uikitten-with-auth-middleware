import useAppConfig from "@/hooks/app-config";
import {
  StyleService,
  Text,
  TopNavigation,
  TopNavigationProps,
  useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
//import FontList from "react-native-font-list";

type Props = TopNavigationProps & {
  textTitle?: string;
};

export const TopNavigationView = ({
  textTitle,
  ...restProps
}: Props): React.ReactElement => {
  const { companyName } = useAppConfig();
  const styles = useStyleSheet(themedStyles);

  const renderTitle = (titleProps: any): React.ReactElement => (
    <View style={{ alignItems: "center" }}>
      <Text
        {...titleProps}
        style={[titleProps.style, styles.topNavigationLabel]}
      >
        {textTitle ?? companyName}
      </Text>
    </View>
  );

  return (
    <TopNavigation
      title={renderTitle}
      style={styles.topNavigation}
      appearance="control"
      {...restProps}
    />
  );
};

const themedStyles = StyleService.create({
  topNavigation: {
    backgroundColor: "background-navigation-bar",
  },
  topNavigationLabel: {
    color: "color-control-default",
  },
});
