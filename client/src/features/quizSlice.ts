import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { QuizState, QuizQuestion, QuizResult } from "../types/types";

const API_URL = "http://localhost:5232/api/quiz";

const initialState: QuizState = {
  questions: [],
  highScores: [],
  score: null,
  status: "idle",
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async () => {
    const response = await axios.get<QuizQuestion[]>(`${API_URL}/questions`);
    return response.data;
  }
);

export const fetchHighScores = createAsyncThunk(
  "quiz/fetchHighScores",
  async () => {
    const response = await axios.get<QuizResult[]>(`${API_URL}/highscores`);
    console.log("API Response (High Scores):", response.data);
    return response.data;
  }
);

export const submitQuiz = createAsyncThunk(
  "quiz/submitQuiz",
  async (
    submission: {
      email: string;
      answers: { questionId: number; answers: string[] }[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post<{ Score: number }>(
        `${API_URL}/submit`,
        submission
      );
      console.log("API Response (Submit Quiz):", response.data);
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Submission failed");
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch questions";
      })

      .addCase(fetchHighScores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHighScores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.highScores = action.payload;
      })
      .addCase(fetchHighScores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch high scores";
      })

      .addCase(submitQuiz.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.score = action.payload.Score;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to submit quiz";
      });
  },
});

export default quizSlice.reducer;
