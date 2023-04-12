using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArtiRateAPI.Models;

namespace ArtiRateAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneratorController : ControllerBase
    {
        private readonly ArtirateContext _context;

        public GeneratorController(ArtirateContext context)
        {
            _context = context;
        }

        // GET: api/Generator
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Generator>>> GetGenerators()
        {
          if (_context.Generators == null)
          {
              return NotFound();
          }
            return await _context.Generators.ToListAsync();
        }

        // GET: api/Generator/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Generator>> GetGenerator(int id)
        {
          if (_context.Generators == null)
          {
              return NotFound();
          }
            var generator = await _context.Generators.FindAsync(id);

            if (generator == null)
            {
                return NotFound();
            }

            return generator;
        }

        // PUT: api/Generator/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutGenerator(int id, Generator generator)
        {
            if (id != generator.GeneratorId)
            {
                return BadRequest();
            }

            _context.Entry(generator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GeneratorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Generator
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Generator>> PostGenerator(Generator generator)
        {
          if (_context.Generators == null)
          {
              return Problem("Entity set 'ArtirateContext.Generators'  is null.");
          }
            _context.Generators.Add(generator);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GeneratorExists(generator.GeneratorId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGenerator", new { id = generator.GeneratorId }, generator);
        }

        // DELETE: api/Generator/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteGenerator(int id)
        {
            if (_context.Generators == null)
            {
                return NotFound();
            }
            var generator = await _context.Generators.FindAsync(id);
            if (generator == null)
            {
                return NotFound();
            }

            _context.Generators.Remove(generator);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GeneratorExists(int id)
        {
            return (_context.Generators?.Any(e => e.GeneratorId == id)).GetValueOrDefault();
        }
    }
}
