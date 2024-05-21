import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { TopNavigationView } from "@/components/molecules/top-navigation.view";
import MessengerLoginLayout from "@/layouts/messenger/messenger-login.layout";
import MessengerLayout from "@/layouts/messenger/messenger.layout";
import AuthMiddleware from "@/middleware/auth.middleware";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import { setChannelId, setTelephone } from "@/store/reducer/messenger-reducer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Divider,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import { Pressable } from "react-native";

type Props = {
  dispatch?: UseAppDispatch;
};

export default (props: Props): React.ReactElement => {
  const { dispatch = useAppDispatch() } = props;
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const { telephone } = useAppSelector((state) => state.messenger);

  const renderRightAction = (): React.ReactElement => {
    if (!telephone) {
      return <></>;
    }
    return (
      <Pressable
        onPress={() => {
          dispatch(setTelephone(null));
          dispatch(setChannelId(null));
        }}
      >
        {({ pressed }) => (
          <FontAwesome
            name="sign-out"
            size={25}
            color={theme["text-control-color"]}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    );
  };

  return (
    <AuthMiddleware>
      <SafeAreaLayoutView style={styles.safeArea} insets="top">
        <TopNavigationView
          textTitle={`ติดต่อเจ้าหน้าที่`}
          accessoryRight={renderRightAction}
        />
        <Divider />
        {telephone ? <MessengerLayout /> : <MessengerLoginLayout />}
      </SafeAreaLayoutView>
    </AuthMiddleware>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
