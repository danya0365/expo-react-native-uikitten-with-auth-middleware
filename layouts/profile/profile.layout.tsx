import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import LoadingView from "@/components/organisms/loading.view";
import useAuth from "@/hooks/auth";
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

type Props = {};

export default (_: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const onLogoutButtonClick = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUser(null);
      router.replace("/");
    }, 3000);
  };

  return (
    <Layout level="1" style={{ width: "100%", flex: 1 }}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <Layout style={[styles.contentContainer, { gap: 16 }]} level="1">
            <Layout
              level="2"
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 16,
              }}
            >
              <View style={styles.titleContainer}>
                <Text category="h6" style={styles.textHeader}>
                  อัตราดอกเบี้ยสินเชื่อ
                </Text>
              </View>
              <Text category="p1">
                • อัตราดอกเบี้ย MLR - ลูกค้ารายใหญ่ชั้นดี ร้อยละ 9.95 ต่อปี
              </Text>
              <Text category="p1">
                • อัตราดอกเบี้ย MRR - ลูกค้ารายย่อยชั้นดี ร้อยละ 9.35 ต่อปี
              </Text>
              <Text category="p1">
                • อัตราดอกเบี้ยสูงสุดไม่เกิน ร้อยละ 24.00 ต่อปี
              </Text>
            </Layout>
            <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
              <Layout
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                level="1"
              >
                <Button
                  onPress={onLogoutButtonClick}
                  status="primary"
                  style={{ flex: 1, margin: 4 }}
                >
                  Log out
                </Button>
              </Layout>
            </View>
          </Layout>
        </KeyboardAvoidingView>
        {isLoading && <LoadingView onDismissPress={null} />}
      </ScrollView>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    marginBottom: 100,
  },
  label: {
    marginBottom: 4,
    color: "text-basic-color",
  },
  titleContainer: {
    borderBottomColor: "border-basic-color-5",
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  textHeader: {
    paddingBottom: 4,
    marginBottom: 4,
  },
});
