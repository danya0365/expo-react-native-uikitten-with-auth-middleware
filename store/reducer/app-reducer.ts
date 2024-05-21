import { AppConfig } from "@/models/app-config";
import { User } from "@/models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  config: AppConfig | null;
  user: User | null;
  lastNotificationUpdate: string | null;
  isNewNotification: boolean;
}

const initialState: AppState = {
  config: null,
  user: null,
  lastNotificationUpdate: null,
  isNewNotification: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<AppConfig>) {
      state.config = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setIsNewNotification(state, action: PayloadAction<boolean>) {
      state.isNewNotification = action.payload;
    },
    setLastNotificationUpdate(state, action: PayloadAction<string | null>) {
      state.lastNotificationUpdate = action.payload;
    },
  },
});

export const {
  setConfig,
  setUser,
  setLastNotificationUpdate,
  setIsNewNotification,
} = appSlice.actions;
export default appSlice.reducer;
