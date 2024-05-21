import { ThemeItem } from "../types/theme";

export class ThemeHelper {
  static createThemeListItems = (themes: any): ThemeItem[] => {
    return [
      { name: "light", theme: themes["light"] },
      { name: "dark", theme: themes["dark"] },
    ];
  };
}
