import { Notification } from "@/models/notification";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  readNotifications: number[];
  notifications: Notification[];
}

const initialState: State = {
  readNotifications: [],
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addReadNotifications(state, action: PayloadAction<number>) {
      state.readNotifications.push(action.payload);
    },
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },
  },
});

export const { addReadNotifications, setNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
