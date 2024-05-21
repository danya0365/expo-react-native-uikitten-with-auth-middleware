import {
  AttachOutlineIcon,
  EyeOffOutlineIcon,
  EyeOutlineIcon,
} from "@/components/atoms/icons";
import { MessengerConversation } from "@/models/messenger-conversation";
import { MessengerApiService } from "@/services/api.service";
import { useAppSelector } from "@/store/hooks";
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import * as Linking from "expo-linking";
import { memo, useCallback, useEffect, useMemo } from "react";
import { View } from "react-native";

type Props = {
  messengerApiService?: MessengerApiService;
  message: MessengerConversation;
};

export const MessageItem = ({
  message,
  messengerApiService = new MessengerApiService(),
}: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const { telephone } = useAppSelector((state) => state.messenger);
  const isYour = useMemo(() => {
    return message.author.name === telephone;
  }, [message]);

  const openLink = useCallback(
    (url: string) => {
      Linking.openURL(url);
    },
    [message]
  );

  useEffect(() => {
    if (!isYour && !message.isSeen) {
      messengerApiService.updateConversationSeen(message);
    }
  }, [isYour, message]);
  return (
    <View>
      {!isYour ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              padding: 8,
            }}
          >
            <>
              {message.type === "text" ? (
                <View
                  style={[
                    styles.secondary,
                    {
                      paddingHorizontal: 8,
                      paddingVertical: 8,
                      borderRadius: 16,
                    },
                  ]}
                >
                  <Text style={[styles.secondary]}>{message.content}</Text>
                </View>
              ) : null}
              {message.type === "url" ? (
                <View
                  style={{ alignItems: "center", flexDirection: "row", gap: 8 }}
                >
                  <View
                    style={[
                      styles.secondary,
                      {
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 16,
                      },
                    ]}
                  >
                    <Text
                      onPress={() => {
                        openLink(message.content);
                      }}
                      style={[styles.linkSecondary]}
                    >
                      เปิดไฟล์แนบ
                    </Text>
                  </View>
                  <AttachOutlineIcon />
                </View>
              ) : null}
            </>
          </View>
          <Text
            style={[styles.dateTime, { padding: 8, textAlign: "left" }]}
            category="label"
          >
            {message.formattedCreateDate}
          </Text>
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: 8,
            }}
          >
            <>
              {message.type === "text" ? (
                <View
                  style={[
                    styles.primary,
                    {
                      paddingHorizontal: 8,
                      paddingVertical: 8,
                      borderRadius: 16,
                    },
                  ]}
                >
                  <Text style={[styles.primary]}>{message.content}</Text>
                </View>
              ) : null}
              {message.type === "url" ? (
                <View
                  style={{ alignItems: "center", flexDirection: "row", gap: 8 }}
                >
                  <AttachOutlineIcon />
                  <View
                    style={[
                      styles.linkPrimary,
                      {
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 16,
                      },
                    ]}
                  >
                    <Text
                      onPress={() => {
                        openLink(message.content);
                      }}
                      style={[styles.linkPrimary]}
                    >
                      เปิดไฟล์แนบ
                    </Text>
                  </View>
                </View>
              ) : null}
            </>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 8,
            }}
          >
            <Text
              style={[styles.dateTime, { padding: 8, textAlign: "right" }]}
              category="label"
            >
              {message.formattedCreateDate}
            </Text>
            {message.isSeen ? <EyeOutlineIcon /> : <EyeOffOutlineIcon />}
          </View>
        </>
      )}
    </View>
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
  primary: {
    backgroundColor: "color-primary-default",
    color: "text-control-color",
  },
  linkPrimary: {
    backgroundColor: "color-primary-default",
    color: "text-control-color",
    textDecorationLine: "underline",
  },
  secondary: {
    backgroundColor: "color-secondary-default",
    color: "text-control-color",
  },
  linkSecondary: {
    backgroundColor: "color-secondary-default",
    color: "text-control-color",
    textDecorationLine: "underline",
  },
  dateTime: {
    color: "text-hint-color",
  },
});

export default memo(MessageItem);
