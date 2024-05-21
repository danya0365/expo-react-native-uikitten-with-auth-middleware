import Constants from "expo-constants";

export const publicUrl =
  Constants.expoConfig?.extra?.publicUrl || "http://localhost";
