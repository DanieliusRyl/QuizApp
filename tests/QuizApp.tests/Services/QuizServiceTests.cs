using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace QuizApp.Tests.Services
{
    public class QuizServiceTests
    {
        private readonly AppDbContext _dbContext;
        private readonly QuizService _quizService;

        public QuizServiceTests()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "QuizTestDB")
                .Options;
            _dbContext = new AppDbContext(options);
            _quizService = new QuizService(_dbContext);

            _dbContext.Database.EnsureDeleted();
            _dbContext.Database.EnsureCreated();

            SeedData.Initialize(_dbContext);
        }

        [Fact]
        public void GetQuestions_ReturnsAllQuestions()
        {
            var questions = _quizService.GetQuestions();

            Assert.Equal(10, questions.Count());
        }

        [Fact]
        public void GetHighScores_ReturnsTop10Scores()
        {
            _dbContext.QuizResults.AddRange(
                new QuizResult { Email = "user1@example.com", Score = 100 },
                new QuizResult { Email = "user2@example.com", Score = 90 },
                new QuizResult { Email = "user3@example.com", Score = 80 },
                new QuizResult { Email = "user4@example.com", Score = 70 },
                new QuizResult { Email = "user5@example.com", Score = 60 }
            );
            _dbContext.SaveChanges();

            var highScores = _quizService.GetHighScores();

            Assert.Equal(5, highScores.Count());
        }

        [Fact]
        public void CalculateScore_ReturnsCorrectScore()
        {
            var answers = new List<AnswerSubmission>
            {
                new AnswerSubmission { QuestionId = 1, Answers = new List<string> { "Lithuania" } },
                new AnswerSubmission { QuestionId = 2, Answers = new List<string> { "Healthcare" } }
            };

            var score = _quizService.CalculateScore(answers);

            Assert.Equal(100, score);
        }

        [Fact]
        public void SaveResult_SavesResultToDatabase()
        {
            var email = "test@example.com";
            var score = 100;

            _quizService.SaveResult(email, score);

            var result = _dbContext.QuizResults.FirstOrDefault(r => r.Email == email);
            Assert.NotNull(result);
            Assert.Equal(score, result.Score);
        }
    }
}