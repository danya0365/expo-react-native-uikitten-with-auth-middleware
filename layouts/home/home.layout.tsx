import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import RequestView from "./request.view";
import WelcomeView from "./welcome.view";

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={[styles.container, { gap: 16 }]} level="2">
      <WelcomeView />
      <RequestView />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
