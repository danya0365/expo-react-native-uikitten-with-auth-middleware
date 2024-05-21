import { Notification } from "@/models/notification";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMemo } from "react";

const useNotification = ({
  notification,
  dispatch = useAppDispatch(),
}: {
  notification: Notification;
  dispatch?: UseAppDispatch;
}) => {
  const { readNotifications } = useAppSelector((state) => state.notification);

  const isRead = useMemo(() => {
    return readNotifications.includes(notification.id);
  }, [notification, readNotifications]);

  return {
    isRead,
  };
};

export default useNotification;
