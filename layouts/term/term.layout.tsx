import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import LoadingView from "@/components/organisms/loading.view";
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

type Props = {};

export default (props: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Layout level="1" style={{ width: "100%", flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                  ระยะเวลาผ่อนชำระ
                </Text>
              </View>
              <Text category="p1">
                • ระยะเวลาในการผ่อนชำระ 1 ปี ถึง 30 ปี (12 เดือน ถึง 360 เดือน)
              </Text>
            </Layout>
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
                  เอกสารประกอบการขอสินเชื่อ
                </Text>
              </View>
              <Layout
                level="2"
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 16,
                }}
              >
                <Text category="p1">• บุคคลธรรมดา</Text>
                <Layout
                  level="2"
                  style={{
                    width: "100%",
                    padding: 16,
                    borderRadius: 16,
                  }}
                >
                  <Text category="p1">
                    • สำเนาบัตรประจำตัวประชาชน และสำเนาทะเบียนบ้าน
                  </Text>
                  <Text category="p1">• สลิปเงินเดือน / สำเนาบัญชีธนาคาร</Text>
                  <Text category="p1">
                    • เอกสารแสดงรายละเอียดทรัพย์ เช่น โฉนดที่ดิน สัญญาซื้อขาย
                    ฯลฯ
                  </Text>
                </Layout>
              </Layout>
              <Layout
                level="2"
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 16,
                }}
              >
                <Text category="p1">• นิติบุคคล</Text>
                <Layout
                  level="2"
                  style={{
                    width: "100%",
                    padding: 16,
                    borderRadius: 16,
                  }}
                >
                  <Text category="p1">
                    • หนังสือจดทะเบียนการค้า หรือทะเบียนนิติบุคคล
                  </Text>
                  <Text category="p1">
                    • สำเนาประจำตัวประชาชน และสำเนาทะเบียนบ้าน
                    ของกรรมการผู้มีอำนาจ
                  </Text>
                  <Text category="p1">• สลิปเงินเดือน / สำเนาบัญชีธนาคาร</Text>
                  <Text category="p1">
                    • เอกสารแสดงรายละเอียดทรัพย์ เช่น โฉนดที่ดิน สัญญาซื้อขาย
                    ฯลฯ
                  </Text>
                </Layout>
              </Layout>
            </Layout>
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
                  ค่าบริการและค่าธรรมเนียม
                </Text>
              </View>
              <Text category="p1">
                • ค่าสำรวจและประเมินหลักประกัน (ผ่าน Application)
                กรณีเขตกรุงเทพมหานครและปริมณฑล ฟรี!
              </Text>
              <Text category="p1">
                • ค่าเบี้ยประกันอัคคีภัยและค่าประกันคุ้มครองหนี้
                เป็นไปตามที่บริษัทประกันเรียกเก็บ
              </Text>
            </Layout>
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
