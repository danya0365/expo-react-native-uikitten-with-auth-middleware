import { ThemeType } from "@ui-kitten/components";

export type Theme = "light" | "dark" | "green" | "yellow";

export interface ThemeItem {
  name: Theme;
  theme: ThemeType;
}
