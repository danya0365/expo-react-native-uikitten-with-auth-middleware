import { Theme } from "@/types/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY: string = "theme";

const convertValue = <T>(value: string | null): T | null => {
  if (value === null) {
    return null;
  }
  return value as T;
};

const getAsyncStorageValue = async <T>(key: string): Promise<T | null> => {
  const value = await AsyncStorage.getItem(key);
  return convertValue<T>(value);
};

export class AppStorage {
  static getTheme = (fallback: Theme): Promise<Theme> => {
    return getAsyncStorageValue<Theme>(THEME_KEY).then((theme) => {
      return theme || fallback;
    });
  };

  static setTheme = (theme: Theme): Promise<void> => {
    return AsyncStorage.setItem(THEME_KEY, theme);
  };
}
