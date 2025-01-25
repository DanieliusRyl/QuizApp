public class QuizSubmission
{
    public string Email { get; set; } = string.Empty;
    public List<AnswerSubmission> Answers { get; set; } = new();
}