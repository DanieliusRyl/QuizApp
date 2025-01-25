import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import "../styles/highScores.scss";

const HighScores = () => {
  const { highScores, status, error } = useSelector(
    (state: RootState) => state.quiz
  );

  if (status === "loading")
    return <div className="high-scores__loading">Loading...</div>;
  if (status === "failed")
    return <div className="high-scores__error">Error: {error}</div>;

  const top10Highscores = highScores.slice(0, 10);

  return (
    <div className="high-scores__list">
      <ul>
        {top10Highscores.map((result, index) => (
          <li key={index} className="high-scores__item">
            <span className="high-scores__rank">{index + 1}.</span>
            <span className="high-scores__email">{result.email}</span>
            <span className="high-scores__score">{result.score}</span>
            <span className="high-scores__date">
              Submitted at: {new Date(result.submittedAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighScores;
