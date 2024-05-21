import { PersonIcon } from "@/components/atoms/icons";
import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import LoadingView from "@/components/organisms/loading.view";
import { Json } from "@/models/json";
import { MessengerApiService } from "@/services/api.service";
import { UseAppDispatch, useAppDispatch } from "@/store/hooks";
import { setChannelId, setTelephone } from "@/store/reducer/messenger-reducer";
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { View } from "react-native";

type Props = {
  messengerApiService?: MessengerApiService;
  dispatch?: UseAppDispatch;
};

export default (props: Props): React.ReactElement => {
  const {
    messengerApiService = new MessengerApiService(),
    dispatch = useAppDispatch(),
  } = props;
  const styles = useStyleSheet(themedStyles);

  const [loading, setLoading] = useState(false);
  const [telephoneInput, setTelephoneInput] = React.useState<string>("");

  const onSubmitButtonPress = async () => {
    if (!telephoneInput) return;
    setLoading(true);
    try {
      const response = await messengerApiService.doCreateNewTelephoneChannel({
        telephone: telephoneInput,
      });

      if (response.status) {
        const data = response.data as Json;
        const channelId = data.id;

        dispatch(setTelephone(telephoneInput));
        dispatch(setChannelId(channelId));
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      level="3"
      style={{
        width: "100%",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: "100%",
        }}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <View style={[styles.container, { flex: 1 }]}>
          <Layout style={styles.formContainer} level="1">
            <Input
              placeholder="หมายเลขโทรศัพท์มือถือ"
              accessoryRight={PersonIcon}
              value={telephoneInput}
              onChangeText={setTelephoneInput}
              autoCorrect={false}
              autoCapitalize="none"
              style={{
                borderRadius: 16,
              }}
            />
          </Layout>
          <Button style={styles.submitButton} onPress={onSubmitButtonPress}>
            ติดต่อเจ้าหน้าที่
          </Button>
        </View>
      </KeyboardAvoidingView>

      {loading && <LoadingView onDismissPress={() => {}} />}
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
    padding: 16,
    margin: 16,
    borderRadius: 16,
    flexDirection: "column",
  },
  formContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  submitButton: {
    borderRadius: 16,
  },
});
