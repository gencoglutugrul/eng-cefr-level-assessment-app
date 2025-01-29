import { useEffect, useState } from "react";
import { questions } from "../data/questions";
import { QuestionWithSelection } from "../types/assessment";

export const useAssessment = () => {
  const [questionsWithSelections, setQuestionsWithSelections] = useState<
    QuestionWithSelection[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const initializeQuestions = () => {
    return questions.map((q) => ({
      ...q,
      selectedIndex: null,
    }));
  };

  useEffect(() => {
    if (loading) {
      resetAssessment();
      setLoading(false);
    }
  }, [loading]);

  const selectAnswer = (index: number) => {
    setQuestionsWithSelections((prev) => {
      const newQuestions = [...prev];
      newQuestions[currentIndex].selectedIndex = index;
      return newQuestions;
    });
  };

  const nextQuestion = () => {
    if (currentIndex < questionsWithSelections.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return false;
    }

    return true;
  };

  const resetAssessment = () => {
    setQuestionsWithSelections(initializeQuestions());
    setCurrentIndex(0);
  };

  return {
    currentQuestion: questionsWithSelections[currentIndex],
    questionIndex: currentIndex,
    loading,
    selectAnswer,
    nextQuestion,
    resetAssessment,
    questions: questionsWithSelections,
  };
};
