import { IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/configure-store";
import ThemeProvider from "./theme";
import ConfigProvider from "./config";
import { Theme } from "@/types/theme";

export type Props = {
  children?: React.ReactNode;
  theme: Theme;
};

const CoreProvider: React.FC<Props> = ({ children, theme }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={[EvaIconsPack]} />
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <ConfigProvider>{children}</ConfigProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default CoreProvider;
