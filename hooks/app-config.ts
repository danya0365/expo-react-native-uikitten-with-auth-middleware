import { ThemeScheme } from "@/constants/app-theming";
import { publicUrl } from "@/constants/config";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMemo } from "react";
import { ImageSourcePropType } from "react-native";

const useAppConfig = ({
  dispatch = useAppDispatch(),
}: {
  dispatch?: UseAppDispatch;
} = {}) => {
  const { config } = useAppSelector((state) => state.app);

  const companyName = useMemo(() => {
    const appName = config?.configurations["company_name"]
      ? `${config?.configurations["company_name"]}`
      : "ชื่อบริษัทสินเชื่อ";
    return appName;
  }, [config]);

  const isEnableSaving = useMemo(() => {
    const isEnableSaving: boolean = config?.configurations["is_enable_saving"]
      ? (config?.configurations["is_enable_saving"] as boolean)
      : false;
    return isEnableSaving;
  }, [config]);

  const themeScheme: ThemeScheme = useMemo(() => {
    const themeScheme: ThemeScheme = config?.configurations["theme_scheme"]
      ? (config?.configurations["theme_scheme"] as ThemeScheme)
      : "green";
    return themeScheme;
  }, [config]);

  const appHomeScreenText1: string = useMemo(() => {
    const appHomeScreenText1: string = config?.configurations[
      "app_home_screen_text_1"
    ]
      ? (config?.configurations["app_home_screen_text_1"] as string)
      : "สวัสดี";
    return appHomeScreenText1;
  }, [config]);

  const appHomeScreenText2: string = useMemo(() => {
    const appHomeScreenText2: string = config?.configurations[
      "app_home_screen_text_2"
    ]
      ? (config?.configurations["app_home_screen_text_2"] as string)
      : "ยินดีต้อนรับ";
    return appHomeScreenText2;
  }, [config]);

  const appHomeScreenText3: string = useMemo(() => {
    const appHomeScreenText3: string = config?.configurations[
      "app_home_screen_text_3"
    ]
      ? (config?.configurations["app_home_screen_text_3"] as string)
      : "เงินด่วน";
    return appHomeScreenText3;
  }, [config]);

  const appHomeScreenText4: string = useMemo(() => {
    const appHomeScreenText4: string = config?.configurations[
      "app_home_screen_text_4"
    ]
      ? (config?.configurations["app_home_screen_text_4"] as string)
      : "วงเงินอนุมัติสูงสุด";
    return appHomeScreenText4;
  }, [config]);

  const appHomeScreenText5: string = useMemo(() => {
    const appHomeScreenText5: string = config?.configurations[
      "app_home_screen_text_5"
    ]
      ? (config?.configurations["app_home_screen_text_5"] as string)
      : "1,000,000 บาท";
    return appHomeScreenText5;
  }, [config]);

  const isShowBanner = useMemo(() => {
    const isShowBanner: boolean = config?.configurations["is_show_banner"]
      ? (config?.configurations["is_show_banner"] as boolean)
      : false;
    return isShowBanner;
  }, [config]);

  const loanPdpaText: string = useMemo(() => {
    const loanPdpaText: string = config?.configurations["loan_pdpa_text"]
      ? (config?.configurations["loan_pdpa_text"] as string)
      : "";
    return loanPdpaText;
  }, [config]);

  const savingPdpaText: string = useMemo(() => {
    const savingPdpaText: string = config?.configurations["saving_pdpa_text"]
      ? (config?.configurations["saving_pdpa_text"] as string)
      : "";
    return savingPdpaText;
  }, [config]);

  const banner: ImageSourcePropType = { uri: `${publicUrl}/banner.png` };

  return {
    companyName,
    isEnableSaving,
    themeScheme,
    appHomeScreenText1,
    appHomeScreenText2,
    appHomeScreenText3,
    appHomeScreenText4,
    appHomeScreenText5,
    banner,
    isShowBanner,
    loanPdpaText,
    savingPdpaText,
  };
};

export default useAppConfig;
