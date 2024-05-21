import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import LoadingView from "@/components/organisms/loading.view";
import { Notification } from "@/models/notification";
import { NotificationApiService } from "@/services/api.service";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import { addReadNotifications } from "@/store/reducer/notification-reducer";
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

type Props = {
  notificationApiService?: NotificationApiService;
  dispatch?: UseAppDispatch;
};

export default (props: Props): React.ReactElement => {
  const {
    notificationApiService = new NotificationApiService(),
    dispatch = useAppDispatch(),
  } = props;
  const { readNotifications } = useAppSelector((state) => state.notification);
  const styles = useStyleSheet(themedStyles);
  const [refreshing, setRefreshing] = React.useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<Notification>();

  const getNotificationDetail = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const response = await notificationApiService.getNotificationById({ id });
      if (response.status) {
        const newNotification = Notification.createFromApi(response.data);
        setNotification(newNotification);
        if (!readNotifications.includes(newNotification.id)) {
          dispatch(addReadNotifications(newNotification.id));
        }
      }
    } catch {
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getNotificationDetail();
  }, [id]);

  return (
    <Layout level="1" style={{ width: "100%", flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <KeyboardAvoidingView style={styles.container}>
          <Layout style={[styles.contentContainer]} level="1">
            <Layout
              level="2"
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 16,
              }}
            >
              <Text
                category="h6"
                style={{
                  paddingBottom: 16,
                }}
              >
                {notification?.title}
              </Text>
              <Text category="p1">{notification?.content}</Text>
            </Layout>
          </Layout>
        </KeyboardAvoidingView>
        {isLoading && <LoadingView onDismissPress={null} />}
      </ScrollView>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginBottom: 4,
    color: "text-basic-color",
  },
  borderBottom: {
    borderBottomColor: "border-basic-color-3",
    borderBottomWidth: 4,
  },
});
