import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import HighScores from "../features/HighScores";
import { fetchHighScores } from "../features/quizSlice";
import { AppDispatch } from "../app/store";
import { Link } from "react-router-dom";
import "../styles/highScores.scss";

const DisplayHighScores = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHighScores());
  }, [dispatch]);

  return (
    <div className="high-scores">
      <Link to="/" className="high-scores__back-link">
        Go back
      </Link>
      <h1 className="high-scores__title">High Scores</h1>
      <div className="high-scores__content">
        <HighScores />
      </div>
    </div>
  );
};

export default DisplayHighScores;
