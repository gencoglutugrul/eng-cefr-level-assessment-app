import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import {
  CEFRLevel,
  QuestionCategory,
  QuestionWithSelection,
} from "../types/assessment";

const getCorrectPercentageForLevel = (
  questions: QuestionWithSelection[],
  level: string
) => {
  const totalQuestions = questions.filter(
    (question: QuestionWithSelection) => question.cefrLevel === level
  ).length;

  const correctQuestions = questions.filter(
    (question: QuestionWithSelection) =>
      question.cefrLevel === level &&
      question.correctIndex === question.selectedIndex
  ).length;

  return totalQuestions > 0 ? correctQuestions / totalQuestions : 0;
};

const getBenchmarkMapByLevel = (
  questions: QuestionWithSelection[]
): BenchmarkMapByLevel => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

  return levels.reduce((acc, level) => {
    acc[level] = getCorrectPercentageForLevel(questions, level);
    return acc;
  }, {} as BenchmarkMapByLevel);
};

const levelExplanation = {
  A1: "Beginner",
  A2: "Elementary",
  B1: "Intermediate",
  B2: "Upper Intermediate",
  C1: "Advanced",
  C2: "Proficient",
};

type BenchmarkMapByLevel = {
  A1: number;
  A2: number;
  B1: number;
  B2: number;
  C1: number;
  C2: number;
};

type BenchmarkMapByCategory = {
  Grammar: number;
  Vocabulary: number;
  Idioms: number;
  Functional: number;
};

const getCorrectPercentageForCategory = (
  questions: QuestionWithSelection[],
  category: string
) => {
  const totalQuestions = questions.filter(
    (question: QuestionWithSelection) => question.category === category
  ).length;

  const correctQuestions = questions.filter(
    (question: QuestionWithSelection) =>
      question.category === category &&
      question.correctIndex === question.selectedIndex
  ).length;

  return totalQuestions > 0 ? correctQuestions / totalQuestions : 0;
};

const getBenchmarkMapByCategory = (
  questions: QuestionWithSelection[]
): BenchmarkMapByCategory => {
  const categories = ["Grammar", "Vocabulary", "Idioms", "Functional"] as const;

  return categories.reduce((acc, category) => {
    acc[category] = getCorrectPercentageForCategory(questions, category);
    return acc;
  }, {} as BenchmarkMapByCategory);
};

const categoryExplanation = {
  Grammar: "Understanding of English grammar.",
  Vocabulary: "Knowledge of English words and phrases.",
  Idioms: "Understanding of English idiomatic expressions.",
  Functional: "Ability to use English in practical situations.",
};

type PerformanceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Performance"
>;

export const PerformanceScreen = ({ route }: PerformanceScreenProps) => {
  const { questions } = route.params;

  const [benchmarks, setBenchmarks] = useState({
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
    C1: 0,
    C2: 0,
  });

  const [categoryBenchmarks, setCategoryBenchmarks] =
    useState<BenchmarkMapByCategory>({
      Grammar: 0,
      Vocabulary: 0,
      Idioms: 0,
      Functional: 0,
    });

  useEffect(() => {
    setBenchmarks(getBenchmarkMapByLevel(questions));
    setCategoryBenchmarks(getBenchmarkMapByCategory(questions));
  }, [questions]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Performance Benchmarking</Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Benchmarks By Level</Text>
            <Text style={styles.cardSubtitle}>
              Percentage of correct answers by CEFR level
            </Text>
            {Object.entries(benchmarks).map(([level, value]) => (
              <View style={styles.benchmarkContainer} key={level}>
                <Text style={styles.benchmarkLabel}>{level} Level:</Text>
                <ProgressBar
                  progress={value}
                  color="#4CAF50"
                  style={styles.progressBar}
                />
                <View style={styles.benchmarkTextContainer}>
                  <Text style={styles.benchmarkExplanation}>
                    {levelExplanation[level as CEFRLevel]}
                  </Text>
                  <Text style={styles.benchmarkValue}>
                    {Math.round(value * 100).toFixed(0)}%
                  </Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Benchmarks By Category</Text>
            <Text style={styles.cardSubtitle}>
              Percentage of correct answers by question category
            </Text>
            {Object.entries(categoryBenchmarks).map(([category, value]) => (
              <View style={styles.benchmarkContainer} key={category}>
                <Text style={styles.benchmarkLabel}>{category}:</Text>
                <ProgressBar
                  progress={value}
                  color="#4CAF50"
                  style={styles.progressBar}
                />
                <View style={styles.benchmarkTextContainer}>
                  <Text style={styles.benchmarkExplanation}>
                    {categoryExplanation[category as QuestionCategory]}
                  </Text>
                  <Text style={styles.benchmarkValue}>
                    {Math.round(value * 100).toFixed(0)}%
                  </Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 25,
  },
  cardValue: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  benchmarkContainer: {
    marginBottom: 15,
  },
  benchmarkLabel: {
    fontSize: 14,
    color: "#666",
  },
  benchmarkTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  benchmarkValue: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  benchmarkExplanation: {
    fontSize: 12,
    color: "#999",
  },
});
