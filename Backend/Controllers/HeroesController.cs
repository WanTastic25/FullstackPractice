using FullstackPractice.Data;
using FullstackPractice.Models;
using FullstackPractice.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullstackPractice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroesController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public HeroesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllHeroes()
        {
            var allHeroes = await dbContext.Heroes.ToListAsync();
            return Ok(allHeroes);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetHeroById(Guid id)
        {
            var hero = await dbContext.Heroes.FindAsync(id);

            if (hero == null)
                return NotFound();
            else
                return Ok(hero);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetHeroByName(string name)
        {
            var hero = await dbContext.Heroes.FirstOrDefaultAsync(h => h.Name.Equals(name));

            if (hero == null)
                return NotFound();
            else
                return Ok(hero);
        }

        [HttpPost]
        public async Task<IActionResult> AddHero(AddHeroDto addHeroDto)
        {
            var hero = new Hero()
            { 
                Name = addHeroDto.Name,
                Position = addHeroDto.Position,
                Health = addHeroDto.Health,
                Mana = addHeroDto.Mana,
            };

            await dbContext.Heroes.AddAsync(hero);
            await dbContext.SaveChangesAsync();

            return Ok(hero);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateHero(Guid id, UpdateHeroDto updateHeroDto)
        {
            var hero = await dbContext.Heroes.FindAsync(id);

            if (hero is not null)
            {
                hero.Position = updateHeroDto.Position;
                hero.Health = updateHeroDto.Health;
                hero.Mana = updateHeroDto.Mana;

                await dbContext.SaveChangesAsync();
            }
            else
            {
                return NotFound();
            }

            return Ok(hero);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteHero(Guid id)
        {
            var hero = await dbContext.Heroes.FindAsync(id);

            if (hero is not null)
            {
                dbContext.Heroes.Remove(hero);
                dbContext.SaveChanges();

                return Ok(hero);
            }

            return NotFound();
        }
    }
}
