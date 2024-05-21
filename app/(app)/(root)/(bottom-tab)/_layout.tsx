import {
  TabBarBellOutlineIcon,
  TabBarHomeOutlineIcon,
  TabBarPhoneOutlineIcon,
  TabBarProfileOutlineIcon,
} from "@/components/atoms/icons";
import HomeScreen from "@/screens/home/home.screen";
import MessengerScreen from "@/screens/messenger/messenger.screen";
import NotificationScreen from "@/screens/notification/notification.screen";
import { useAppSelector } from "@/store/hooks";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import profileScreen from "./profile";

const BottomTab = createBottomTabNavigator();

const IconWithBadge = ({
  icon,
  badge = null,
}: {
  icon: React.ReactElement;
  badge?: string | null;
}) => {
  if (!badge) return icon;
  return (
    <View>
      {icon}
      <View
        style={{
          height: 20,
          width: 20,
          backgroundColor: "red",
          borderRadius: 10,
          position: "absolute",
          right: -8,
          padding: 4,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 8,
          }}
        >
          {badge}
        </Text>
      </View>
    </View>
  );
};

export const TabBarBottomNavigation: React.FC<BottomTabBarProps> = ({
  navigation,
  state,
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const backgroundColor: string = theme[`background-tab-bar`];
  const { isNewNotification } = useAppSelector((state) => state.app);
  const { isNewMessenger } = useAppSelector((state) => state.messenger);

  const onSelect = (index: number): void => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <Animated.View
      style={{
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: safeAreaInsets.bottom,
        backgroundColor: backgroundColor,
      }}
    >
      <Divider />
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title="หน้าหลัก" icon={TabBarHomeOutlineIcon} />
        <BottomNavigationTab
          title="แชตกับเจ้าหน้าที่"
          icon={(iconProps) => {
            return (
              <IconWithBadge
                icon={<TabBarPhoneOutlineIcon {...iconProps} />}
                badge={isNewMessenger ? "N" : null}
              />
            );
          }}
        />
        <BottomNavigationTab
          title="ประกาศ"
          icon={(iconProps) => {
            return (
              <IconWithBadge
                icon={<TabBarBellOutlineIcon {...iconProps} />}
                badge={isNewNotification ? "N" : null}
              />
            );
          }}
        />
        <BottomNavigationTab title="โปรไฟล์" icon={TabBarProfileOutlineIcon} />
      </BottomNavigation>
    </Animated.View>
  );
};

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? "home" : "home";

const BottomTabNavigator = (): React.ReactElement => {
  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialTabRoute}
      tabBar={(props) => <TabBarBottomNavigation {...props} />}
    >
      <BottomTab.Screen name="home" component={HomeScreen} />
      <BottomTab.Screen name="messenger" component={MessengerScreen} />
      <BottomTab.Screen name="notification" component={NotificationScreen} />
      <BottomTab.Screen name="profile" component={profileScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
