import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/AppNavigator";

type ErrorAnalysisScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ErrorAnalysis"
>;

export const ErrorAnalysisScreen = ({ route }: ErrorAnalysisScreenProps) => {
  const { questions } = route.params;

  const incorrectQuestions = questions.filter(
    (q) => q.correctIndex !== q.selectedIndex
  );
  const hasPerfectScore = incorrectQuestions.length === 0;

  if (hasPerfectScore) {
    return (
      <SafeAreaView style={styles.safeAreaAnimation}>
        <LottieView
          source={require("../../assets/animations/stars.json")}
          autoPlay
          loop={true}
          style={styles.starAnimation}
        />
        <View style={styles.animationTextContainer}>
          <Text style={styles.perfectScoreText}>Perfect Score!</Text>
          <Text style={styles.subtitle}>
            Congratulations! You have no incorrect answers. All stars for you!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Error Analysis</Text>

        <Text style={styles.subtitle}>
          Let's review your mistakes and improve:
        </Text>

        {incorrectQuestions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.stem}</Text>
            <Text style={styles.correctAnswer}>
              Level: {question.cefrLevel}
            </Text>
            <Text style={styles.correctAnswer}>
              Your Answer:{" "}
              {question.selectedIndex !== null
                ? question.choices[question.selectedIndex]
                : "Empty"}
            </Text>
            <Text style={styles.correctAnswer}>
              Correct Answer: {question.choices[question.correctIndex]}
            </Text>
            <Text style={styles.explanation}>
              {question.explanation || "No explanation available"}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaAnimation: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  starAnimation: {
    width: Dimensions.get("window").height * 0.75,
    height: Dimensions.get("window").height,
    position: "absolute",
    left:
      Dimensions.get("window").width / 2 -
      (Dimensions.get("window").height * 0.75) / 2,
    bottom: 0,
  },
  perfectScoreText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1a73e8",
    textAlign: "center",
    marginBottom: 10,
  },
  animationTextContainer: {
    position: "absolute",
    top: Dimensions.get("window").height / 2 - 50,
    width: Dimensions.get("window").width - 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  questionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  correctAnswer: {
    fontSize: 14,
    color: "#1a73e8",
    fontWeight: "bold",
    marginBottom: 10,
  },
  explanation: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 8,
    backgroundColor: "#1a73e8",
  },
});
