import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../hooks/useTranslation";
import { RootStackParamList } from "../navigation/AppNavigator";

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, "Results">;

export const ResultsScreen = ({ navigation, route }: ResultsScreenProps) => {
  const { score, cefrLevel, questions } = route.params;
  const { t } = useTranslation();

  const handleRetakeConfirm = () => {
    navigation.popTo("AssessmentInfo");
  };

  const handleRetake = () => {
    Alert.alert(
      t("results.retake_confirm_title"),
      t("results.retake_confirm_message"),
      [
        {
          text: t("results.retake_confirm_cancel"),
          style: "cancel",
        },
        {
          text: t("results.retake_confirm_retake"),
          onPress: handleRetakeConfirm,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("results.title")}</Text>

        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text style={styles.scoreText}>
              {t("results.score_prefix")} {score}
            </Text>
            <Text style={styles.levelText}>
              {t("results.cefr_prefix")} {cefrLevel}
            </Text>
          </Card.Content>
        </Card>

        <Card
          style={styles.navCard}
          onPress={() => navigation.navigate("Certificate", { cefrLevel })}
        >
          <Card.Content>
            <Text style={styles.cardTitle}>
              {t("results.view_certificate")}
            </Text>
            <Text style={styles.cardSubtitle}>
              {t("results.view_certificate_subtitle")}
            </Text>
          </Card.Content>
        </Card>

        <Card
          style={styles.navCard}
          onPress={() => {
            navigation.navigate("ErrorAnalysis", { questions });
          }}
        >
          <Card.Content>
            <Text style={styles.cardTitle}>{t("results.error_analysis")}</Text>
            <Text style={styles.cardSubtitle}>
              {t("results.error_analysis_subtitle")}
            </Text>
          </Card.Content>
        </Card>

        <Card
          style={styles.navCard}
          onPress={() => navigation.navigate("Performance", { questions })}
        >
          <Card.Content>
            <Text style={styles.cardTitle}>
              {t("results.performance_benchmarking")}
            </Text>
            <Text style={styles.cardSubtitle}>
              {t("results.performance_benchmarking_subtitle")}
            </Text>
          </Card.Content>
        </Card>

        <Button mode="contained" style={styles.button} onPress={handleRetake}>
          {t("results.retake_test")}
        </Button>
      </View>
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
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  summaryCard: {
    marginBottom: 20,
    padding: 15,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  navCard: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
  },
});
