type QuizStatus = "idle" | "loading" | "succeeded" | "failed";

export interface QuizQuestion {
  id: number;
  questionText: string;
  questionType: string;
  options: string[];
  correctAnswers: string[];
}

export interface QuizResult {
  id: number;
  email: string;
  score: number;
  submittedAt: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  highScores: QuizResult[];
  score: number | null;
  status: QuizStatus;
  error: string | null;
}
