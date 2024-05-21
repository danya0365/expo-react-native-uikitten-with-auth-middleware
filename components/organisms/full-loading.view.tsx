import React from "react";
import {
  Card,
  Modal,
  Spinner,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";

export default ({
  onDismissPress,
}: {
  onDismissPress: any;
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);

  return (
    <Modal
      visible={true}
      backdropStyle={styles.backdrop}
      onBackdropPress={onDismissPress}
    >
      <Card disabled={true} style={styles.card}>
        <Spinner status="primary" size="giant" />
      </Card>
    </Modal>
  );
};

const themedStyle = StyleService.create({
  card: {
    borderRadius: 20,
  },
  backdrop: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});
