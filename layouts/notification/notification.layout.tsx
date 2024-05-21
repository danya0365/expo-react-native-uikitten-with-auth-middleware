import LoadingView from "@/components/organisms/loading.view";
import { Notification } from "@/models/notification";
import { NotificationApiService } from "@/services/api.service";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  List,
  StyleService,
  useStyleSheet,
  Text,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ListRenderItemInfo, RefreshControl, View } from "react-native";
import { NotificationItem } from "./notification-item.view";
import { setIsNewNotification } from "@/store/reducer/app-reducer";
import {
  addReadNotifications,
  setNotifications,
} from "@/store/reducer/notification-reducer";

type Props = {
  notificationApiService?: NotificationApiService;
  dispatch?: UseAppDispatch;
};

export default (props: Props): React.ReactElement => {
  const {
    notificationApiService = new NotificationApiService(),
    dispatch = useAppDispatch(),
  } = props;
  const styles = useStyleSheet(themedStyles);
  const { readNotifications, notifications } = useAppSelector(
    (state) => state.notification
  );
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const getNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await notificationApiService.getLatestNotifications();
      if (response.status) {
        let newNotifications = response.data.list.map((val) =>
          Notification.createFromApi(val)
        );
        newNotifications = newNotifications.sort((a, b) => {
          if (a.id < b.id) {
            return 1;
          }
          if (a.id > b.id) {
            return -1;
          }
          return 0;
        });
        dispatch(setNotifications(newNotifications));
      }
    } catch {
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNotifications();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotifications();
      dispatch(setIsNewNotification(false));
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = (
    info: ListRenderItemInfo<Notification>
  ): React.ReactElement => (
    <NotificationItem style={styles.item} notification={info.item} />
  );

  const listEmptyComponent = (): React.ReactElement => (
    <Layout
      level="1"
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexGrow: 1,
      }}
    >
      <Text category="h4" style={[styles.label, { padding: 24 }]}>
        ยังไม่มีประกาศใดๆ
      </Text>
    </Layout>
  );

  return (
    <>
      {notifications.length > 0 ? (
        <List
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.list}
          data={notifications}
          renderItem={renderItem}
        />
      ) : (
        listEmptyComponent()
      )}
      {isLoading && <LoadingView onDismissPress={null} />}
    </>
  );
};

const themedStyles = StyleService.create({
  list: {
    flex: 1,
    backgroundColor: "background-basic-color-1",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
  label: {
    color: "color-secondary-default",
  },
});
