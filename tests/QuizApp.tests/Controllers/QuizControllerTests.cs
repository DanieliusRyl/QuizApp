using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace QuizApp.Tests.Controllers
{
    public class QuizControllerTests
    {
        private readonly Mock<QuizService> _mockQuizService;
        private readonly QuizController _quizController;

        public QuizControllerTests()
        {
            _mockQuizService = new Mock<QuizService>(MockBehavior.Strict, null);
            _quizController = new QuizController(_mockQuizService.Object);
        }

        [Fact]
        public void GetQuestions_ReturnsOkResult()
        {
            var questions = new List<QuizQuestion>
            {
                new QuizQuestion { Id = 1, QuestionText = "Test Question", QuestionType = "radio" }
            };
            _mockQuizService.Setup(x => x.GetQuestions()).Returns(questions);

            var result = _quizController.GetQuestions();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedQuestions = Assert.IsType<List<QuizQuestion>>(okResult.Value);
            Assert.Single(returnedQuestions);
        }

        [Fact]
        public void GetHighScores_ReturnsOkResult()
        {
            var highScores = new List<QuizResult>
            {
                new QuizResult { Id = 1, Email = "test@example.com", Score = 100 }
            };
            _mockQuizService.Setup(x => x.GetHighScores()).Returns(highScores);

            var result = _quizController.GetHighScores();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedScores = Assert.IsType<List<QuizResult>>(okResult.Value);
            Assert.Single(returnedScores);
        }

        [Fact]
        public void SubmitQuiz_ValidSubmission_ReturnsOkResult()
        {
            var submission = new QuizSubmission
            {
                Email = "test@example.com",
                Answers = new List<AnswerSubmission>
                {
                    new AnswerSubmission { QuestionId = 1, Answers = new List<string> { "Lithuania" } }
                }
            };
            _mockQuizService.Setup(x => x.CalculateScore(submission.Answers)).Returns(100);
            _mockQuizService.Setup(x => x.SaveResult(submission.Email, 100)).Verifiable();

            var result = _quizController.SubmitQuiz(submission);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<QuizController.QuizResultResponse>(okResult.Value);
            Assert.Equal(100, response.Score);
            _mockQuizService.Verify();
        }

        [Fact]
        public void SubmitQuiz_InvalidSubmission_ReturnsBadRequest()
        {
            var submission = new QuizSubmission
            {
                Email = "",
                Answers = new List<AnswerSubmission>()
            };

            var result = _quizController.SubmitQuiz(submission);

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Invalid submission", badRequestResult.Value);
        }
    }
}