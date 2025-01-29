import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../hooks/useTranslation";
import { RootStackParamList } from "../navigation/AppNavigator";

type AssessmentInfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AssessmentInfo"
>;

export const AssessmentInfoScreen = () => {
  const navigation = useNavigation<AssessmentInfoScreenNavigationProp>();
  const { displayName, user, logout } = useAuth();
  const { t } = useTranslation();

  const handleStartAssessment = () => {
    navigation.navigate("Assessment");
  };

  useEffect(() => {
    if (!user) {
      navigation.popTo("AuthGate");
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t("assesment_info.title")}</Text>
        <Text style={styles.subtitle}>
          {t("assesment_info.subtitle_prefix")} {displayName}
          {t("assesment_info.subtitle_suffix")}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("assesment_info.section.1.title")}
          </Text>
          <Text style={styles.text}>{t("assesment_info.section.1.text")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("assesment_info.section.2.title")}
          </Text>
          <Text style={styles.text}>{t("assesment_info.section.2.text")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("assesment_info.section.3.title")}
          </Text>
          <Text style={styles.text}>{t("assesment_info.section.3.text")}</Text>
        </View>

        <Button
          mode="contained"
          onPress={handleStartAssessment}
          style={styles.button}
        >
          {t("assesment_info.start_assessment")}
        </Button>

        <Button onPress={() => logout()} style={styles.button} mode="contained">
          {t("assesment_info.logout")}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a73e8",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1a73e8",
  },
});
