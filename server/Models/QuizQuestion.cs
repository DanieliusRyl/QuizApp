public class QuizQuestion
{
    public int Id { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public string QuestionType { get; set; } = string.Empty;
    public List<string> Options { get; set; } = new();
    public List<string> CorrectAnswers { get; set; } = new();
}