import {
  BellIcon,
  BellOutlineIcon,
  CheckmarkOutlineIcon,
  DoneAllIcon,
  MessageCircleIcon,
  ShakeIcon,
} from "@/components/atoms/icons";
import useNotification from "@/hooks/notification";
import { Notification } from "@/models/notification";
import {
  ListItem,
  ListItemProps,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

type Props = ListItemProps & {
  notification: Notification;
};

export const NotificationItem = (props: Props): React.ReactElement => {
  const { notification, ...listItemProps } = props;
  const theme = useTheme();
  const { isRead } = useNotification({ notification });
  const styles = useStyleSheet(themedStyles);

  const renderMessageDate = (): React.ReactElement => (
    <View style={styles.dateContainer}>
      {isRead && <CheckmarkOutlineIcon />}
      <Text style={styles.dateText} appearance="hint" category="c1">
        {notification.formattedCreateDate}
      </Text>
    </View>
  );

  const renderNotificationType = (): React.ReactElement => {
    if (isRead) {
      return (
        <BellIcon width={16} height={16} fill={theme["color-primary-500"]} />
      );
    }
    return (
      <BellOutlineIcon
        width={16}
        height={16}
        fill={theme["color-primary-500"]}
      />
    );
  };

  const onItemPress = () => {
    router.push(`/notification/${notification.id}`);
  };

  return (
    <ListItem
      key={`notification-${notification.id}`}
      {...listItemProps}
      onPress={() => {
        onItemPress();
      }}
      title={notification.title}
      description={notification.previewContent}
      accessoryLeft={renderNotificationType}
      accessoryRight={renderMessageDate}
    />
  );
};

const themedStyles = StyleService.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    textAlign: "right",
    paddingLeft: 4,
  },
});
