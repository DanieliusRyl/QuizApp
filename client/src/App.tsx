import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DisplayHighScores from "./pages/DisplayHighScores";
import SolveQuiz from "./pages/SolveQuiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<SolveQuiz />} />
        <Route path="/leaderboard" element={<DisplayHighScores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
