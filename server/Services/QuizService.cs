public class QuizService
{
    private readonly AppDbContext _context;

    public QuizService(AppDbContext context)
    {
        _context = context;
    }

    public virtual IEnumerable<QuizQuestion> GetQuestions() => _context.QuizQuestions.ToList();

    public virtual IEnumerable<QuizResult> GetHighScores()
    {
        return _context.QuizResults
            .OrderByDescending(r => r.Score)
            .ThenBy(r => r.SubmittedAt)
            .Take(10)
            .ToList();
    }

    public virtual int CalculateScore(List<AnswerSubmission> answers)
    {
        int totalScore = 0;

        foreach (var answer in answers)
        {
            var question = _context.QuizQuestions.Find(answer.QuestionId);
            if (question == null) continue;

            switch (question.QuestionType)
            {
                case "radio":
                    if (question.CorrectAnswers.Contains(answer.Answers.FirstOrDefault() ?? string.Empty))
                        totalScore += 100;
                    break;

                case "checkbox":
                    var correctCount = question.CorrectAnswers.Count;
                    var matchingCount = question.CorrectAnswers.Intersect(answer.Answers).Count();
                    totalScore += (int)Math.Ceiling(100.0 / correctCount * matchingCount);
                    break;

                case "text":
                    if (question.CorrectAnswers.FirstOrDefault()?.Equals(answer.Answers.FirstOrDefault(), StringComparison.OrdinalIgnoreCase) == true)
                        totalScore += 100;
                    break;
            }
        }

        return totalScore;
    }

    public virtual void SaveResult(string email, int score)
    {
        _context.QuizResults.Add(new QuizResult { Email = email, Score = score });
        _context.SaveChanges();
    }
}