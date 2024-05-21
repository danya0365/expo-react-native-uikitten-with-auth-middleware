import { PlusOutlineIcon } from "@/components/atoms/icons";
import Alert from "@/components/molecules/alert/alert";
import KeyboardPlaceholder from "@/components/molecules/keyboard-placeholder.view";
import LoadingView from "@/components/organisms/loading.view";
import { dataURItoBlob } from "@/helpers/utils";
import { Json } from "@/models/json";
import {
  MessengerConversation,
  MessengerConversationType,
} from "@/models/messenger-conversation";
import { MessengerApiService, UploadApiService } from "@/services/api.service";
import { ApiErrorResponse } from "@/services/http-request.service";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setChannelId,
  setIsNewMessenger,
  setLastConversationSeen,
  setLocalCodeId,
  setTelephone,
} from "@/store/reducer/messenger-reducer";
import { useKeyboard } from "@react-native-community/hooks";
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import Constants from "expo-constants";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Platform, View } from "react-native";
import MessageItemView from "./message-item.view";
type ImagePickerAsset = ImagePicker.ImagePickerAsset;

type Props = {
  messengerApiService?: MessengerApiService;
  uploadApiService?: UploadApiService;
  dispatch?: UseAppDispatch;
};

export default (props: Props): React.ReactElement => {
  const {
    messengerApiService = new MessengerApiService(),
    uploadApiService = new UploadApiService(),
    dispatch = useAppDispatch(),
  } = props;
  const { keyboardHeight } = useKeyboard();
  const flatListRef = useRef<FlatList>(null);
  const customKeyboardHeight = useMemo(() => {
    return keyboardHeight - 44;
  }, [keyboardHeight]);

  const { telephone, channelId, localCodeId, isNewMessenger } = useAppSelector(
    (state) => state.messenger
  );
  const [attachImages, setAttachImages] = React.useState<ImagePickerAsset[]>(
    []
  );
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const [conversations, setConversations] = useState<MessengerConversation[]>(
    []
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [autoScrollToTop, setAutoScrollToTop] = useState(false);

  const renderItem = ({
    item,
    index,
  }: {
    item: MessengerConversation;
    index: number;
  }): React.ReactElement => <MessageItemView message={item} />;

  const getConversations = async () => {
    if (!channelId || !telephone) return;
    try {
      setIsLoading(true);
      const response = await messengerApiService.getLatestConversations({
        id: channelId,
        telephone,
      });
      if (response.status) {
        let newConversations = response.data.list.map((val) =>
          MessengerConversation.createFromApi(val)
        );
        newConversations = newConversations.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        setConversations(newConversations);
        const lastConversation = newConversations[newConversations.length - 1];
        dispatch(setLastConversationSeen(lastConversation));
        if (isNewMessenger) {
          dispatch(setIsNewMessenger(false));
        }

        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: false });
        }, 100);
      }
    } catch (error: any) {
      //console.log("error", error);
      const response = error.response as Json;
      if (response.status === 404) {
        dispatch(setTelephone(null));
        dispatch(setChannelId(null));
      }
    } finally {
      setIsLoading(false);
      setIsFirstLoad(false);
    }
  };

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

  const uploadAttachImage = async () => {
    const image = attachImages[0];
    let compressedImage = null;
    try {
      compressedImage = await doCompressImage(image);
    } catch (error) {
      console.error("doCompressImage failed", error);
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
      //console.error("error.response", error.response);

      if (error.response?.status === 401) {
        const data: ApiErrorResponse = error.response.data;
        //console.log("error upload 401", data);
      } else {
        //console.error("uploadApiService failed", error);
      }
    }
    Alert.alert("อัพโหลดล้มเหลว", "กรุณาลองใหม่อีกครั้ง", [
      {
        text: "รับทราบ",
        swalType: "confirm",
      },
    ]);
    return "";
  };

  const submitConversation = async () => {
    let type: MessengerConversationType = "text";
    let sendMessage = message;
    if (!channelId || !telephone || !localCodeId) return;

    if (attachImages.length > 0) {
      setIsSending(true);
      sendMessage = await uploadAttachImage();
      type = "url";
    }

    if (!sendMessage) {
      setIsSending(false);
      return;
    }
    try {
      setIsLoading(true);
      const response = await messengerApiService.submitNewConversation({
        id: channelId,
        telephone,
        content: sendMessage,
        local_code_id: localCodeId,
        type,
      });
      if (response.status) {
        getConversations();
      }
    } catch {
    } finally {
      setAttachImages([]);
      setMessage("");
      setIsSending(false);
    }
  };

  const onSubmitPress = async () => {
    submitConversation();
  };

  const requestCameraRollPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status == "granted";
  };

  const handleChooseAttachImage = async () => {
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
        setAttachImages(assets);
      }
    }
  };

  useEffect(() => {
    getConversations();
  }, [channelId, telephone, localCodeId]);

  useEffect(() => {
    if (!localCodeId) {
      dispatch(setLocalCodeId(Constants.sessionId));
    }
    const interval = setInterval(() => {
      getConversations();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getConversations();
      dispatch(setIsNewMessenger(false));
    });

    return unsubscribe;
  }, [navigation]);

  const onStartReached = async () => {
    console.log("onStartReached");
    //getConversations();
    setAutoScrollToTop(true);
  };

  const onEndReached = async () => {
    console.log("onEndReached");
    setAutoScrollToTop(false);
    getConversations();
  };

  return (
    <Layout level="1" style={{ width: "100%", flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Layout
          style={{ flexDirection: "row", width: "100%", padding: 16 }}
          level="1"
        >
          <Text
            style={[styles.noticeLabel, { width: "100%" }]}
            category="label"
          >
            การสนทนานี้ไม่ใช่การสนทนาแบบ Realtime -
            เจ้าหน้าที่จะตอบกลับโดยเร็วที่สุด ภายในเวลาทำการของบริษัท
            ระยะเวลาประมาณ 4-24 ชั่วโมง
          </Text>
        </Layout>
        <FlatList
          ref={flatListRef}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }}
          initialNumToRender={10}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          contentContainerStyle={{ flexGrow: 1 }}
          data={conversations}
          keyExtractor={(item) => {
            return `${item.id}`;
          }}
          renderItem={renderItem}
        />
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            flexDirection: "column",
          }}
        >
          <Layout style={{ flexDirection: "row", width: "100%" }} level="1">
            <Button
              onPress={handleChooseAttachImage}
              appearance="ghost"
              accessoryLeft={PlusOutlineIcon}
            />
            <View style={{ position: "relative", flexGrow: 1 }}>
              {attachImages.length === 0 ? (
                <Input
                  placeholder="ข้อความ"
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={{
                    borderRadius: 16,
                    flex: 1,
                  }}
                  value={message}
                  onChangeText={(value) => setMessage(value)}
                  onSubmitEditing={onSubmitPress}
                />
              ) : (
                <View>
                  <Input
                    editable={false}
                    placeholder="ข้อความ"
                    autoCorrect={false}
                    autoCapitalize="none"
                    status="success"
                    style={{
                      borderRadius: 16,
                      flex: 1,
                    }}
                    value={`ได้เลือกไฟล์แนบแล้ว`}
                    onSubmitEditing={onSubmitPress}
                  />
                  <Button
                    onPress={() => {
                      setAttachImages([]);
                    }}
                    appearance="ghost"
                    status="danger"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      height: 30,
                    }}
                  >
                    ลบ
                  </Button>
                </View>
              )}
            </View>
            <Button
              onPress={onSubmitPress}
              disabled={isSending}
              appearance="ghost"
            >
              {!isSending ? `ส่ง` : `...`}
            </Button>
          </Layout>
        </View>
        <KeyboardPlaceholder height={customKeyboardHeight} />
      </View>
      {isFirstLoad && <LoadingView onDismissPress={null} />}
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  noticeLabel: {
    color: "text-hint-color",
  },
});
