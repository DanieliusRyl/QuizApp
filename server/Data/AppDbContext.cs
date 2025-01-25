using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<QuizQuestion> QuizQuestions { get; set; }
    public DbSet<QuizResult> QuizResults { get; set; }
}