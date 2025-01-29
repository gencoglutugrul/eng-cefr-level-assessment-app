import { ActivityIndicator, Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "../components/ProgressBar";
import { Timer } from "../components/Timer";
import { useAssessment } from "../hooks/useAssessment";

const getCefrLevel = (score: number): string => {
  if (score <= 20) return "A1";
  if (score <= 40) return "A2";
  if (score <= 60) return "B1";
  if (score <= 80) return "B2";
  return "C2";
};

import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "../hooks/useTranslation";
import { RootStackParamList } from "../navigation/AppNavigator";
import { calculateScore } from "../utils/score";

type AssessmentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Assessment"
>;

interface AssessmentScreenProps {
  navigation: AssessmentScreenNavigationProp;
}

export const AssessmentScreen = ({ navigation }: AssessmentScreenProps) => {
  const { questionIndex, questions, loading, selectAnswer, nextQuestion } =
    useAssessment();
  const { t } = useTranslation();
  const currentQuestion = questions[questionIndex];

  const handleSubmit = () => {
    const score = calculateScore(questions);
    const cefrLevel = getCefrLevel(score);
    navigation.replace("Results", { score, cefrLevel, questions });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Timer
        totalTime={1800}
        onTimeout={handleSubmit}
        stop={questionIndex >= questions.length - 1}
      />
      <ProgressBar progress={questionIndex / questions.length} />
      <Text style={styles.progressText}>
        {questionIndex + 1}
        {t("assessment.progress_glue")}
        {questions.length}
        {t("assessment.progress_suffix")}
      </Text>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion?.stem}</Text>

        {currentQuestion?.choices.map((choice, index) => (
          <Button
            key={index}
            mode={
              currentQuestion.selectedIndex === index ? "contained" : "outlined"
            }
            style={[
              styles.choiceButton,
              currentQuestion.selectedIndex === index && styles.selectedChoice,
            ]}
            onPress={() => selectAnswer(index)}
            labelStyle={
              currentQuestion.selectedIndex === index
                ? styles.selectedLabel
                : undefined
            }
          >
            {choice}
          </Button>
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={() => {
            const isFinished = nextQuestion();

            if (isFinished) {
              handleSubmit();
            }
          }}
          style={styles.nextButton}
          disabled={currentQuestion.selectedIndex === null}
        >
          {questionIndex < questions.length - 1
            ? t("assessment.next")
            : t("assessment.finish")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  progressText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  choiceButton: {
    marginVertical: 8,
    borderColor: "#1a73e8",
  },
  selectedChoice: {
    backgroundColor: "#1a73e8",
    borderColor: "#1a73e8",
  },
  selectedLabel: {
    color: "#fff",
  },
  footer: {
    paddingBottom: 20,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#1a73e8",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 18,
  },
});
