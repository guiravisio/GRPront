using AutoMapper;
using GRProntAPI.Data;
using GRProntAPI.DTOs;
using GRProntAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GRProntAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper; 

        public UsersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserListDto>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserListDto>>(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDetailDto>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return _mapper.Map<UserDetailDto>(user);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<User>> CreateUser(UserCreateDto dto)
        {
            var user = new User
            {
                FullName = dto.FullName,
                UserName = dto.UserName,
                Email = dto.Email,
                Role = dto.Role,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password) 
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserUpdateDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.FullName = dto.FullName;
            user.Email = dto.Email;
            user.Role = dto.Role;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}/reset-password")]
        public async Task<IActionResult> ResetPassword(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            // Limpa o hash e marca que precisa trocar senha
            user.PasswordHash = string.Empty;
            user.MustChangePassword = true;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}/set-password")]
        public async Task<IActionResult> SetPassword(int id, [FromBody] SetPasswordDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.MustChangePassword = false;

            await _context.SaveChangesAsync();
            return NoContent();
        }

    }

}
