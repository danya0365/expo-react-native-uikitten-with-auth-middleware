import {
  Icon,
  IconElement,
  IconProps,
  Spinner,
  SpinnerProps,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

export const IconWithTheme = (style: IconProps): IconElement => {
  const theme = useTheme();
  const textColor = theme["text-basic-color"];
  return <Icon fill={textColor} {...style} />;
};

export const DoneAllOutlineIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="done-all-outline" />
);

export const ArrowIosBackIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="arrow-ios-back" />
);

export const ArrowIosForwardIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="arrow-ios-forward" />
);

export const BookIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="book" />
);

export const BookmarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="bookmark" />
);

export const BookmarkOutlineIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="bookmark-outline" />
);

export const ColorPaletteIcon = (style: IconProps): IconElement => {
  return <IconWithTheme {...style} name="color-palette-outline" />;
};

export const CloseIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="close" />
);

export const GithubIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="github" />
);

export const GridIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="grid-outline" />
);

export const LayoutIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="layout-outline" />
);

export const ListIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="list" />
);

export const MenuIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="menu" />
);

export const MoreVerticalIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="more-vertical" />
);

export const SearchIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="search" />
);

export const SettingsIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="settings" />
);

export const StarIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="star" />
);

export const StarOutlineIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="star-outline" />
);

export const TrashIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="trash" />
);

export const AssetAuthIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="auth" />
);

export const AssetAuthDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="auth-dark" />
);

export const AssetSocialIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="social" />
);

export const AssetSocialDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="social-dark" />
);

export const AssetArticlesIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="articles" />
);

export const AssetArticlesDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="articles-dark" />
);

export const AssetMessagingIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="messaging" />
);

export const AssetMessagingDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="messaging-dark" />
);

export const AssetDashboardsIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="dashboards" />
);

export const AssetDashboardsDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="dashboards-dark" />
);

export const AssetEcommerceIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="ecommerce" />
);

export const AssetEcommerceDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="ecommerce-dark" />
);

export const AssetAutocompleteIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="autocomplete" />
);

export const AssetAutocompleteDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="autocomplete-dark" />
);

export const AssetAvatarIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="avatar" />
);

export const AssetAvatarDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="avatar-dark" />
);

export const AssetBottomNavigationIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="bottom-navigation" />
);

export const AssetBottomNavigationDarkIcon = (
  style: IconProps
): IconElement => (
  <IconWithTheme {...style} pack="app" name="bottom-navigation-dark" />
);

export const AssetButtonIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="button" />
);

export const AssetButtonDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="button-dark" />
);

export const AssetButtonGroupIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="button-group" />
);

export const AssetButtonGroupDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="button-group-dark" />
);

export const AssetCalendarIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="calendar" />
);

export const AssetCalendarDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="calendar-dark" />
);

export const AssetCardIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="card" />
);

export const AssetCardDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="card-dark" />
);

export const AssetCheckBoxIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="check-box" />
);

export const AssetCheckBoxDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="check-box-dark" />
);

export const AssetDatepickerIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="datepicker" />
);

export const AssetDatepickerDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="datepicker-dark" />
);

export const AssetDrawerIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="drawer" />
);

export const AssetDrawerDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="drawer-dark" />
);

export const AssetIconIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="icon" />
);

export const AssetIconDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="icon-dark" />
);

export const AssetInputIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="input" />
);

export const AssetInputDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="input-dark" />
);

export const AssetListIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="list" />
);

export const AssetListDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="list-dark" />
);

export const AssetMenuIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="menu" />
);

export const AssetMenuDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="menu-dark" />
);

export const AssetModalIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="modal" />
);

export const AssetModalDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="modal-dark" />
);

export const AssetOverflowMenuIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="overflow-menu" />
);

export const AssetOverflowMenuDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="overflow-menu-dark" />
);

export const AssetPopoverIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="popover" />
);

export const AssetPopoverDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="popover-dark" />
);

export const AssetRadioIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="radio" />
);

export const AssetRadioDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="radio-dark" />
);

export const AssetSelectIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="select" />
);

export const AssetSelectDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="select-dark" />
);

export const AssetSpinnerIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="spinner" />
);

export const AssetSpinnerDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="spinner-dark" />
);

export const AssetTabViewIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="tab-view" />
);

export const AssetTabViewDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="tab-view-dark" />
);

export const AssetTextIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="text" />
);

export const AssetTextDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="text-dark" />
);

export const AssetToggleIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="toggle" />
);

export const AssetToggleDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="toggle-dark" />
);

export const AssetTooltipIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="tooltip" />
);

export const AssetTooltipDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="tooltip-dark" />
);

export const AssetTopNavigationIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="top-navigation" />
);

export const AssetTopNavigationDarkIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} pack="app" name="top-navigation-dark" />
);

export const PersonOutlineIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="person-outline" />
);

export const LockOutlineIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="lock-outline" />
);

export const HeartOutlineIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="heart-outline" />
);

export const BellOutlineIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="bell-outline" />
);

export const BellIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="bell" />
);

export const TabBarBellOutlineIcon = (style: IconProps): IconElement => (
  <Icon {...style} name="bell-outline" />
);

export const HomeOutlineIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="home-outline" />
);

export const TabBarHomeOutlineIcon = (style: IconProps): IconElement => (
  <Icon {...style} name="home-outline" />
);

export const TabBarProfileOutlineIcon = (style: IconProps): IconElement => (
  <Icon {...style} name="person-outline" />
);

export const PaperPlaneOutlineIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="paper-plane-outline" />
);

export const TabBarPaperPlaneOutlineIcon = (style: IconProps): IconElement => (
  <Icon {...style} name="paper-plane-outline" />
);

export const TabBarPhoneOutlineIcon = (style: IconProps): IconElement => (
  <Icon {...style} name="phone-outline" />
);

export const PhoneOutlineIcon = (style: IconProps): IconElement => (
  <Icon {...style} name="phone-outline" />
);

export const FileTextOutlineIcon = (style: IconProps): IconElement => (
  <Icon {...style} name="file-text-outline" />
);

export const EditIcon = (props: IconProps): IconElement => (
  <IconWithTheme {...props} name="edit" />
);

export const InfoIcon = (props: IconProps): IconElement => (
  <IconWithTheme {...props} name="info" />
);

export const PlusOutlineIcon = (props: IconProps): IconElement => (
  <IconWithTheme {...props} name="plus-outline" />
);

export const DoneAllIcon = (style: IconProps): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      {...style}
      width={16}
      height={16}
      fill={theme["color-primary-500"]}
      name="done-all"
    />
  );
};

export const CheckmarkOutlineIcon = (style: IconProps): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      {...style}
      width={16}
      height={16}
      fill={theme["color-primary-500"]}
      name="checkmark-outline"
    />
  );
};

export const EyeOffOutlineIcon = (style: IconProps): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      width={16}
      height={16}
      fill={theme["color-basic-500"]}
      name="eye-off-outline"
      {...style}
    />
  );
};

export const EyeOutlineIcon = (style: IconProps): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      width={16}
      height={16}
      fill={theme["color-primary-500"]}
      name="eye-outline"
      {...style}
    />
  );
};

export const AttachOutlineIcon = (style: IconProps): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      width={16}
      height={16}
      fill={theme["color-primary-500"]}
      name="attach-outline"
      {...style}
    />
  );
};

export const LoginIcon = (props: IconProps): IconElement => (
  <IconWithTheme {...props} name="log-in" />
);

export const LogoutIcon = (props: IconProps): IconElement => (
  <IconWithTheme {...props} name="log-out" />
);

export const FileAddOutlineIcon = (props: IconProps): IconElement => (
  <IconWithTheme {...props} name="file-add-outline" />
);

export const BulbIcon = (style: IconProps): IconElement => {
  const theme = useTheme();
  return (
    <IconWithTheme
      width="24"
      height="24"
      fill={theme["text-control-color"]}
      name="bulb-outline"
      {...style}
    />
  );
};

export const ColorPaletteOutlineIcon = (style: IconProps): IconElement => {
  const theme = useTheme();
  return (
    <IconWithTheme
      width="24"
      height="24"
      fill={theme["text-control-color"]}
      name="color-palette-outline"
      {...style}
    />
  );
};

export const HeartIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="heart" />
);

export const MessageCircleIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="message-circle-outline" />
);

export const ShakeIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="shake-outline" />
);

export const ForwardIcon = (props: IconProps): IconElement => (
  <IconWithTheme {...props} name="arrow-ios-forward" />
);

export const AlertTriangleIcon = (props: IconProps): IconElement => (
  <IconWithTheme {...props} name="alert-triangle" />
);

export const AlertTriangleOutlineIcon = (props: IconProps): IconElement => (
  <IconWithTheme {...props} name="alert-triangle-outline" />
);

export const CalendarIcon = (props: IconProps): IconElement => (
  <IconWithTheme {...props} name="calendar" />
);

export const CameraIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="camera" />
);

export const PersonDeleteIcon = (style: IconProps): IconElement => {
  return <IconWithTheme {...style} name="person-delete-outline" />;
};

export const CheckmarkCircleIcon = (style: IconProps): IconElement => {
  return <IconWithTheme {...style} name="checkmark-circle-outline" />;
};

export const CheckmarkIcon = (style: IconProps): IconElement => {
  return <IconWithTheme {...style} name="checkmark-outline" />;
};

export const LoaderIcon = (style: IconProps): IconElement => {
  return <IconWithTheme {...style} name="loader-outline" />;
};

export const PersonIcon = (style: IconProps): IconElement => (
  <IconWithTheme {...style} name="person" />
);

interface LoadingIndicatorIconProps extends IconProps {
  spinner: SpinnerProps;
}

export const LoadingIndicator = (
  props: LoadingIndicatorIconProps
): React.ReactElement => {
  const { spinner } = props;
  return (
    <View
      style={[props.style, { justifyContent: "center", alignItems: "center" }]}
    >
      <Spinner {...spinner} />
    </View>
  );
};
