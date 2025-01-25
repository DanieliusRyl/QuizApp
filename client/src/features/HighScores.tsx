import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import "../styles/highScores.scss";
import { Link } from "react-router-dom";

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
            <span
              className="high-scores__rank"
              style={{
                color: "black",
                backgroundColor:
                  index === 0
                    ? "gold"
                    : index === 1
                    ? "silver"
                    : index === 2
                    ? "#cd7f32"
                    : "transparent",
                fontSize:
                  index === 0
                    ? "40px"
                    : index === 1
                    ? "30px"
                    : index === 2
                    ? "29px"
                    : "14px",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              {index + 1}.
            </span>
            <span className="high-scores__email">{result.email}</span>
            <span className="high-scores__score">{result.score}</span>
            <span className="high-scores__date">
              Submitted at: {new Date(result.submittedAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
      <div>
        {highScores.length === 0 ? (
          <Link to="/quiz" className="high-scores__link">
            There are no HighScores yet, be the first one to complete the quiz.
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HighScores;
