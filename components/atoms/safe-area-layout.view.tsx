import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StyledComponentProps,
  LayoutProps,
  Layout,
  useTheme,
} from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";

type Inset = "top" | "bottom";

export interface SafeAreaLayoutProps extends StyledComponentProps, LayoutProps {
  insets?: Inset;
  children?: React.ReactNode;
}

export const SafeAreaLayoutView: React.FC<SafeAreaLayoutProps> = ({
  insets,
  ...props
}) => {
  const theme = useTheme();
  const insetsConfig = useSafeAreaInsets();

  const backgroundColor: string = theme[`background-navigation-bar`];

  return (
    <>
      <StatusBar style="light" />
      <Layout
        {...props}
        style={[
          props.style,
          { backgroundColor },
          {
            paddingTop: insets === "top" ? insetsConfig.top : 0,
            paddingBottom: insets === "bottom" ? insetsConfig.bottom : 0,
          },
        ]}
      />
    </>
  );
};
