using System.ComponentModel.DataAnnotations;

namespace GRProntAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string UserName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Role { get; set; } = "User";

        // Se quiser trabalhar com senha, use hash
        public string PasswordHash { get; set; } = string.Empty;

        public bool MustChangePassword { get; set; } = false;
    }
}
