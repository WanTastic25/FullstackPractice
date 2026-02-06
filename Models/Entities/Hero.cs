namespace FullstackPractice.Models.Entities
{
    public class Hero
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public string? Position {  get; set; }
        public int Health {  get; set; }
        public int Mana { get; set; }
    }
}
