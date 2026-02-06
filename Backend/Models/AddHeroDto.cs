namespace FullstackPractice.Models
{
    public class AddHeroDto
    {
        public required string Name { get; set; }
        public string? Position { get; set; }
        public int Health { get; set; }
        public int Mana { get; set; }
    }
}
