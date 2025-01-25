import QuizQuestions from "../features/QuizQuestions";
import { Link } from "react-router-dom";
import "../styles/quiz.scss";

const SolveQuiz = () => {
  return (
    <div className="solve-quiz">
      <Link to="/" className="solve-quiz__back-link">
        Quit quiz
      </Link>
      <h1 className="solve-quiz__title">Quiz Questions</h1>
      <div className="solve-quiz__content">
        <QuizQuestions />
      </div>
    </div>
  );
};

export default SolveQuiz;
