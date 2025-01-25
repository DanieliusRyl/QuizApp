import { Link } from "react-router-dom";
import "../styles/home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__title">Welcome to the Quiz App</h1>
        <div className="home__links">
          <Link to="/quiz" className="home__link">
            Start the quiz
          </Link>
          <Link to="/leaderboard" className="home__link">
            High Scores
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
