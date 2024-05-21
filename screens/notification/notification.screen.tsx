import { DoneAllOutlineIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { TopNavigationView } from "@/components/molecules/top-navigation.view";
import NotificationLayout from "@/layouts/notification/notification.layout";
import AuthMiddleware from "@/middleware/auth.middleware";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import { addReadNotifications } from "@/store/reducer/notification-reducer";
import {
  Divider,
  StyleService,
  TopNavigationAction,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import React, { useMemo } from "react";

type Props = {
  dispatch?: UseAppDispatch;
};

export default ({ dispatch = useAppDispatch() }: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const { readNotifications, notifications } = useAppSelector(
    (state) => state.notification
  );
  const theme = useTheme();
  const iconColor = theme["text-control-color"];
  const isUnread = useMemo(() => {
    for (const notification of notifications) {
      if (!readNotifications.includes(notification.id)) {
        return true;
      }
    }
    return false;
  }, [readNotifications, notifications]);

  const markAsRead = () => {
    for (const notification of notifications) {
      if (!readNotifications.includes(notification.id)) {
        dispatch(addReadNotifications(notification.id));
      }
    }
  };

  const renderRightAction = (): React.ReactElement => {
    if (!isUnread) return <></>;
    return (
      <TopNavigationAction
        icon={<DoneAllOutlineIcon fill={iconColor} />}
        onPress={() => {
          markAsRead();
        }}
      />
    );
  };

  return (
    <AuthMiddleware>
      <SafeAreaLayoutView style={styles.safeArea} insets="top">
        <TopNavigationView
          textTitle={`ประกาศ`}
          accessoryRight={renderRightAction}
        />
        <Divider />
        <NotificationLayout />
      </SafeAreaLayoutView>
    </AuthMiddleware>
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
