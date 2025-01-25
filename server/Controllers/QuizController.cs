using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
    private readonly QuizService _quizService;

    public QuizController(QuizService quizService)
    {
        _quizService = quizService;
    }

    [HttpGet("questions")]
    public IActionResult GetQuestions()
    {
        var questions = _quizService.GetQuestions();
        return Ok(questions);
    }

    [HttpGet("highscores")]
    public IActionResult GetHighScores()
    {
        var highScores = _quizService.GetHighScores();
        return Ok(highScores);
    }

    [HttpPost("submit")]
    public IActionResult SubmitQuiz([FromBody] QuizSubmission submission)
    {
        if (string.IsNullOrWhiteSpace(submission.Email) || submission.Answers == null || !submission.Answers.Any())
            return BadRequest("Invalid submission");

        int score = _quizService.CalculateScore(submission.Answers);
        _quizService.SaveResult(submission.Email, score);

        return Ok(new { Score = score });
    }
}