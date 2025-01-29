export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type QuestionCategory =
  | "Grammar"
  | "Vocabulary"
  | "Idioms"
  | "Functional";

export interface Question {
  id: string;
  stem: string;
  choices: string[];
  correctIndex: number;
  cefrLevel: CEFRLevel;
  explanation: string;
  category: QuestionCategory;
}

export interface QuestionWithSelection extends Question {
  selectedIndex: number | null;
}

export interface AssessmentState {
  currentQuestionIndex: number;
  score: number;
  questions: Question[];
  incorrectAnswers: string[];
  startTime: number;
  endTime: number | null;
  currentDifficulty: CEFRLevel;
  performanceHistory: {
    correct: number;
    total: number;
  }[];
}

export interface AssessmentResult {
  rawScore: number;
  score: number;
  cefrLevel: CEFRLevel;
  timeSpent: number;
  incorrectQuestions: Question[];
}
