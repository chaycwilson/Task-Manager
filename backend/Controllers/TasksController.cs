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
    public class TasksController
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
    }
}