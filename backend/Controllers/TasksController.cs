using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;

        public TasksController(TaskContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks() {
            return await _context.Tasks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(int id) {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null) {
                return NotFound();
            }
            
            return task;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, Task task) {
            if (id != task.Id) {
                return BadRequest();
            }
            
            _context.Entry(task).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateCurrencyException) {
                if (!TaskExists(id)) { 
                    return NotFound();
                }
                else {
                    throw;
                }
            }

            return NoContent();
        }

        [httpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id) {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Task>> PostTask(Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        private bool TaskExists(int id) {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}