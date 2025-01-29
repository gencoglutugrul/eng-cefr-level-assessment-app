import { CEFRLevel, QuestionWithSelection } from "../types/assessment";

const getScoreForLevel = (level: CEFRLevel) => {
  switch (level) {
    case "A1":
      return 1;
    case "A2":
      return 2;
    case "B1":
      return 3;
    case "B2":
      return 4;
    case "C1":
      return 5;
    case "C2":
      return 6;
    default:
      return 0;
  }
};

export const calculateScore = (
  questionsWithSelections: QuestionWithSelection[]
) => {
  let maxScore = 0;
  let score = 0;

  for (let i = 0; i < questionsWithSelections.length; i++) {
    const question = questionsWithSelections[i];
    const questionScore = getScoreForLevel(question.cefrLevel);
    maxScore += questionScore;

    if (question.selectedIndex === question.correctIndex) {
      score += questionScore;
    }
  }

  return Math.round((score / maxScore) * 100);
};
