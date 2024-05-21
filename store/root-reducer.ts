import { combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appReducer from "./reducer/app-reducer";
import messengerReducer from "./reducer/messenger-reducer";
import notificationReducer from "./reducer/notification-reducer";

const mainStorage = AsyncStorage;

const rootReducer = combineReducers({
  app: persistReducer<ReturnType<typeof appReducer>>(
    {
      key: "app",
      storage: mainStorage,
      stateReconciler: autoMergeLevel2,
    },
    appReducer
  ),
  messenger: persistReducer<ReturnType<typeof messengerReducer>>(
    {
      key: "messenger",
      storage: mainStorage,
      stateReconciler: autoMergeLevel2,
    },
    messengerReducer
  ),
  notification: persistReducer<ReturnType<typeof notificationReducer>>(
    {
      key: "notification",
      storage: mainStorage,
      stateReconciler: autoMergeLevel2,
    },
    notificationReducer
  ),
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof rootReducer>;
