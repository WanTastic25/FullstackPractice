using FullstackPractice.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FullstackPractice.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {            
        }

        public DbSet<Hero> Heroes { get; set; }
    }
}
