public static class SeedData
{
    public static void Initialize(AppDbContext context)
    {
        if (!context.QuizQuestions.Any())
        {
            context.QuizQuestions.AddRange(
                new QuizQuestion
                {
                    Id = 1,
                    QuestionText = "In which country is 'Present Connection' located?",
                    QuestionType = "radio",
                    Options = new List<string> { "Latvia", "Lithuania", "Estonia", "Poland" },
                    CorrectAnswers = new List<string> { "Lithuania" }
                },
                new QuizQuestion
                {
                    Id = 2,
                    QuestionText = "What industry does 'Present Connection' primarily operate in?",
                    QuestionType = "radio",
                    Options = new List<string> { "Healthcare", "Information Technology", "Manufacturing", "Retail" },
                    CorrectAnswers = new List<string> { "Information Technology" }
                },
                new QuizQuestion
                {
                    Id = 3,
                    QuestionText = "What is a key value or culture emphasized by 'Present Connection'?",
                    QuestionType = "radio",
                    Options = new List<string> { "Aggressive Competition", "People-First Approach", "Cost-Cutting", "Isolation" },
                    CorrectAnswers = new List<string> { "People-First Approach" }
                },
                new QuizQuestion
                {
                    Id = 4,
                    QuestionText = "What type of clients does 'Present Connection' work with?",
                    QuestionType = "radio",
                    Options = new List<string> { "Only local clients", "Only international clients", "Both local and international clients", "Government agencies only" },
                    CorrectAnswers = new List<string> { "Both local and international clients" }
                },

                new QuizQuestion
                {
                    Id = 5,
                    QuestionText = "What is the full name of the company?",
                    QuestionType = "text",
                    CorrectAnswers = new List<string> { "Present Connection" }
                },
                new QuizQuestion
                {
                    Id = 6,
                    QuestionText = "What is the legal structure of 'Present Connection'?",
                    QuestionType = "text",
                    CorrectAnswers = new List<string> { "UAB" }
                },

                new QuizQuestion
                {
                    Id = 7,
                    QuestionText = "Which of the following services does 'Present Connection' provide? (Select all that apply)",
                    QuestionType = "checkbox",
                    Options = new List<string> { "Custom Software Development", "IT Consulting", "Digital Transformation", "Cloud Solutions" },
                    CorrectAnswers = new List<string> { "Custom Software Development", "IT Consulting", "Digital Transformation", "Cloud Solutions" }
                },
                new QuizQuestion
                {
                    Id = 8,
                    QuestionText = "Which of the following technologies are used by 'Present Connection'? (Select all that apply)",
                    QuestionType = "checkbox",
                    Options = new List<string> { ".NET", "Java", "Python", "React" },
                    CorrectAnswers = new List<string> { ".NET", "React" }
                },
                new QuizQuestion
                {
                    Id = 9,
                    QuestionText = "What are the key values of 'Present Connection'? (Select all that apply)",
                    QuestionType = "checkbox",
                    Options = new List<string> { "Innovation", "People-First Approach", "Cost-Cutting", "Aggressive Competition" },
                    CorrectAnswers = new List<string> { "Innovation", "People-First Approach" }
                },
                new QuizQuestion
                {
                    Id = 10,
                    QuestionText = "Which of the following are benefits of working with 'Present Connection'? (Select all that apply)",
                    QuestionType = "checkbox",
                    Options = new List<string> { "Flexible Work Environment", "Competitive Salary", "Strict Hierarchical Structure", "Limited Career Growth" },
                    CorrectAnswers = new List<string> { "Flexible Work Environment", "Competitive Salary" }
                }
            );

            context.SaveChanges();
        }
    }
}