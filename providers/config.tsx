import FullLoadingView from "@/components/organisms/full-loading.view";
import LoadingView from "@/components/organisms/loading.view";
import { AppConfig } from "@/models/app-config";
import { MessengerConversation } from "@/models/messenger-conversation";
import { Notification } from "@/models/notification";
import {
  ConfigurationApiService,
  MessengerApiService,
  NotificationApiService,
} from "@/services/api.service";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setConfig,
  setIsNewNotification,
  setLastNotificationUpdate,
} from "@/store/reducer/app-reducer";
import {
  setIsNewMessenger,
  setLastConversationSeen,
} from "@/store/reducer/messenger-reducer";
import React, { useEffect, useState } from "react";

type Props = {
  children?: React.ReactNode;
  configurationApiService?: ConfigurationApiService;
  notificationApiService?: NotificationApiService;
  messengerApiService?: MessengerApiService;
  dispatch?: UseAppDispatch;
};
const ConfigProvider: React.FC<Props> = (props) => {
  const { lastNotificationUpdate } = useAppSelector((state) => state.app);
  const { lastConversationSeen, channelId, telephone } = useAppSelector(
    (state) => state.messenger
  );
  const {
    children,
    configurationApiService = new ConfigurationApiService(),
    notificationApiService = new NotificationApiService(),
    messengerApiService = new MessengerApiService(),
    dispatch = useAppDispatch(),
  } = props;

  const [loading, setLoading] = useState(false);

  const getConfigurations = async () => {
    try {
      const response = await configurationApiService.getConfigurations();
      if (response.status) {
        const list = response.data.list;
        const data = AppConfig.createFromDB(list);
        dispatch(setConfig(data));
      }
    } catch (error) {
      console.log("can not call network");
    }
  };

  const getLastConversationSeen = async (params: {
    channelId: number;
    telephone: string;
  }) => {
    try {
      const response = await messengerApiService.getLastConversationSeen(
        params
      );
      if (response.status) {
        const conversation = MessengerConversation.createFromApi(response.data);
        dispatch(setLastConversationSeen(conversation));

        if (conversation.id != lastConversationSeen?.id) {
          dispatch(setIsNewMessenger(true));
        }
      }
    } catch (error) {
      console.log("can not call network");
    }
  };

  const getLastUpdateNotification = async () => {
    try {
      const response = await notificationApiService.getLastUpdateNotification();
      if (response.status) {
        const notification = Notification.createFromApi(response.data);
        dispatch(setLastNotificationUpdate(notification.updatedAt));

        if (notification.updatedAt != lastNotificationUpdate) {
          dispatch(setIsNewNotification(true));
        }
      }
    } catch (error) {
      console.log("can not call network");
    }
  };

  const getApiData = async () => {
    setLoading(true);
    const promises = [getConfigurations(), getLastUpdateNotification()];
    try {
      await Promise.all(promises);
    } catch (error) {
      console.log("Promise error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!channelId || !telephone) return;
    getLastConversationSeen({ channelId, telephone });
  }, [channelId, telephone]);

  useEffect(() => {
    getApiData();
  }, []);

  if (loading) {
    return <FullLoadingView onDismissPress={null} />;
  }

  return children;
};

export default ConfigProvider;
