import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, submitQuiz } from "./quizSlice";
import { RootState, AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";
import "../styles/quiz.scss";

const QuizQuestions = () => {
  const dispatch: AppDispatch = useDispatch();
  const { questions, status, error } = useSelector(
    (state: RootState) => state.quiz
  );

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [questionId: number]: string[];
  }>({});

  const [email, setEmail] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleCheckboxChange = (questionId: number, option: string) => {
    setSelectedAnswers((prev) => {
      const currentSelections = prev[questionId] || [];
      const updatedSelections = currentSelections.includes(option)
        ? currentSelections.filter((item) => item !== option)
        : [...currentSelections, option];

      return {
        ...prev,
        [questionId]: updatedSelections,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const unansweredQuestions = questions.filter(
      (question) => !selectedAnswers[question.id]?.length
    );

    if (unansweredQuestions.length > 0) {
      setShowUnansweredWarning(true);
      return;
    }

    const submission = {
      email: email,
      answers: Object.entries(selectedAnswers).map(([questionId, answers]) => ({
        questionId: parseInt(questionId),
        answers: answers,
      })),
    };

    try {
      const response = await dispatch(submitQuiz(submission)).unwrap();
      alert(`congratulations your score was: ${response.score}`);
      navigate("/leaderboard");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (status === "loading")
    return <div className="quiz__loading">Loading...</div>;
  if (status === "failed")
    return <div className="quiz__error">Error: {error}</div>;

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div className="quiz__not-found">Question not found</div>;
  }

  const unansweredQuestions = questions.filter(
    (question) => !selectedAnswers[question.id]?.length
  );

  return (
    <div className="quiz">
      <form onSubmit={handleSubmit} className="quiz__form">
        <div className="quiz__email">
          <label htmlFor="email" className="quiz__label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="quiz__input"
          />
        </div>

        <div className="quiz__question">
          <h3 className="quiz__question-number">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h3>
          <h4 className="quiz__question-text">
            {currentQuestion?.questionText}
          </h4>
          {currentQuestion.questionType === "text" ? (
            <input
              type="text"
              name={`question-${currentQuestion.id}`}
              value={selectedAnswers[currentQuestion.id]?.[0] || ""}
              onChange={(e) => {
                setSelectedAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: [e.target.value],
                }));
              }}
              className="quiz__input"
            />
          ) : (
            <ul className="quiz__options">
              {currentQuestion.options.map((option, index) => (
                <li key={index} className="quiz__option">
                  <label className="quiz__option-label">
                    <input
                      type={
                        currentQuestion.questionType === "checkbox"
                          ? "checkbox"
                          : "radio"
                      }
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={
                        selectedAnswers[currentQuestion.id]?.includes(option) ||
                        false
                      }
                      onChange={() =>
                        handleCheckboxChange(currentQuestion.id, option)
                      }
                      className="quiz__option-input"
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="quiz__navigation">
          {currentQuestionIndex > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="quiz__button quiz__button--back"
            >
              Back
            </button>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="quiz__button quiz__button--next"
            >
              Next
            </button>
          ) : (
            <button type="submit" className="quiz__button quiz__button--submit">
              Submit Quiz
            </button>
          )}
        </div>

        {showUnansweredWarning && unansweredQuestions.length > 0 && (
          <div
            className={`quiz__warning ${
              showUnansweredWarning ? "quiz__warning--visible" : ""
            }`}
          >
            <h4 className="quiz__warning-title">
              Please answer the following questions:
            </h4>
            <ul className="quiz__warning-list">
              {unansweredQuestions.map((question) => (
                <li key={question.id} className="quiz__warning-item">
                  {question.questionText}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuizQuestions;
