import { LoadingIndicator } from "@/components/atoms/icons";
import { dataURItoBlob } from "@/helpers/utils";
import { UploadApiService } from "@/services/api.service";
import httpRequest, { ApiErrorResponse } from "@/services/http-request.service";
import { ThemeContextValue, Theming } from "@/services/theme.service";
import {
  Button,
  ButtonProps,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Image,
  ImageStyle,
  Platform,
  ScrollView,
  View,
  ViewProps,
} from "react-native";
import Alert from "./alert/alert";

type ImagePickerAsset = ImagePicker.ImagePickerAsset;
const uploadLimit = 7;

export interface ButtonLoadingProps extends ButtonProps {
  isLoading: boolean;
}

export const ButtonLoading = (props: ButtonLoadingProps) => {
  const { isLoading, children, ...resProps } = props;
  return (
    <Button
      {...resProps}
      accessoryLeft={
        isLoading ? (
          <LoadingIndicator spinner={{ status: "success", size: "small" }} />
        ) : undefined
      }
    >
      {children}
    </Button>
  );
};

export const MultipleImageUpload = ({
  setUploadedImages,
}: {
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
}): React.ReactElement<ViewProps> => {
  const styles = useStyleSheet(themedStyles);
  const { currentTheme, isDarkMode }: ThemeContextValue = React.useContext(
    Theming.ThemeContext
  ) as ThemeContextValue;
  const uploadApiService = new UploadApiService(httpRequest);
  const [images, setImages] = React.useState<ImagePickerAsset[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisableChooseButton, setIsDisableChooseButton] =
    React.useState(false);
  const [isDisableUploadButton, setIsDisableUploadButton] =
    React.useState(true);
  const [isDisableUpload, setIsDisableUpload] = React.useState(false);

  const doCompressImage = async (image: any) => {
    const resize =
      image.width > image.height ? { width: 2000 } : { height: 2000 };
    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult;
  };

  const handleUploadImage = async () => {
    setIsLoading(true);
    setIsDisableUploadButton(true);
    const uploadedImages: string[] = await Promise.all(
      images.map(async (image: ImagePickerAsset): Promise<string> => {
        let compressedImage = null;
        if (Platform.OS != "web") {
          try {
            compressedImage = await doCompressImage(image);
          } catch (error) {
            console.error("doCompressImage failed", error);
          }
        }

        try {
          let blob: Blob | undefined = undefined;
          let file: { uri: string; type: string; name: string } | undefined =
            undefined;
          if (Platform.OS === "web") {
            blob = dataURItoBlob(compressedImage?.uri || image.uri);
          } else {
            file = {
              uri: compressedImage?.uri || image.uri,
              name: "photo.jpg",
              type: "image/jpeg",
            };
          }
          const response = await uploadApiService.doUploadOriginalImage(
            blob || file
          );

          if (response.status) {
            return response.data.original;
          }
        } catch (error: any) {
          if (error.response?.status === 401) {
            const data: ApiErrorResponse = error.response.data;
            console.log("error upload 401", data);
          } else {
            console.error("uploadApiService failed", error);
          }
        }
        return "";
      })
    );
    setIsLoading(false);
    setUploadedImages(uploadedImages.filter((image) => image != ""));
    setIsDisableUpload(true);
  };

  const handleChooseImage = async () => {
    if (!requestCameraRollPermission()) {
      alert("Sorry, we need camera roll permissions to upload an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
    });
    if (!result.canceled && result.assets) {
      const assets = result.assets;
      if (assets.length) {
        setImages((oldImages) => [...oldImages, ...assets]);
      }
    }
  };

  const requestCameraRollPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status == "granted";
  };

  const onRemoveImagePress = (imageToRemove: ImagePickerAsset) => {
    const removedImage = images.filter(
      (image) => image.uri != imageToRemove.uri
    );
    setImages(removedImage);
  };

  const imagePreview = () => {
    return images.map((image, index) => {
      return (
        <View style={styles.image} key={`imagePreview${index}`}>
          <Image
            style={styles.uploadImage as ImageStyle}
            source={{ uri: image.uri }}
          />
          <Button
            style={styles.removeButton}
            size="tiny"
            status="danger"
            onPress={() => {
              onRemoveImagePress(image);
            }}
          >
            ลบ
          </Button>
        </View>
      );
    });
  };

  const onResetUploadPress = () => {
    Alert.alert(
      "คุณต้องการลบรูปเดิมแล้วเลือกรูปใหม่ ?",
      "รูปเดิมจะถูกลบทั้งหมด",
      [
        {
          text: "ใช่",
          swalType: "confirm",
          onPress: () => {
            setImages([]);
            setIsDisableUploadButton(false);
            setIsDisableUpload(false);
          },
        },
        {
          text: "ไม่",
          swalType: "cancel",
        },
      ]
    );
  };

  React.useEffect(() => {
    if (images.length > 0) {
      setIsDisableUploadButton(false);
    } else {
      setIsDisableUploadButton(true);
    }

    if (images.length >= uploadLimit) {
      setIsDisableChooseButton(true);
    } else {
      setIsDisableChooseButton(false);
    }
  }, [images]);

  return (
    <View style={{ position: "relative" }}>
      <View style={styles.mainContainer}>
        <Text style={styles.textHeader}>
          รูปที่เลือก ({images.length}/{uploadLimit})
        </Text>
        <View style={styles.imageSectionContainer}>
          {images.length == 0 && (
            <Image
              style={styles.uploadImage as ImageStyle}
              source={
                isDarkMode()
                  ? require("@/assets/img/icon-image-placeholder-dark.png")
                  : require("@/assets/img/icon-image-placeholder.png")
              }
            />
          )}
          {images.length > 0 && (
            <ScrollView horizontal>{imagePreview()}</ScrollView>
          )}
        </View>
        <View style={styles.buttonSectionContainer}>
          <Button
            disabled={isDisableChooseButton}
            style={styles.chooseButton}
            status="info"
            appearance="outline"
            onPress={handleChooseImage}
          >
            เลือกรูป
          </Button>
          <ButtonLoading
            isLoading={isLoading}
            disabled={isDisableUploadButton}
            style={styles.uploadButton}
            status="success"
            appearance="outline"
            onPress={handleUploadImage}
          >
            อัพโหลดรูป
          </ButtonLoading>
        </View>
      </View>
      {isDisableUpload && (
        <View style={styles.disableViewContainer}>
          <Button onPress={onResetUploadPress}>
            คลิกที่นี่หากต้องการเลือกรูปใหม่
          </Button>
        </View>
      )}
    </View>
  );
};

const themedStyles = StyleService.create({
  disableViewContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  textHeader: {
    marginVertical: 8,
  },
  imageSectionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    padding: 16,
  },
  image: {
    alignSelf: "center",
  },
  removeButton: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0,
  },
  buttonSectionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 16,
  },
  uploadImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: "transparent",
    margin: 8,
  },
  uploadButton: {
    margin: 8,
  },
  chooseButton: {
    margin: 8,
  },
});
