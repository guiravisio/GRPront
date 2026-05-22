using System;
using System.ComponentModel.DataAnnotations;

namespace GRProntAPI.Models
{
    public class Patient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string FullName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        [MaxLength(20)]
        public string? Gender { get; set; }

        [MaxLength(50)]
        public string? Identification { get; set; }

        [Required]
        [MaxLength(20)]
        public string? IdentificationType { get; set; } // "CPF" ou "Other"

        [MaxLength(20)]
        public string? PhoneNumber { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; }

        [MaxLength(250)]
        public string? Address { get; set; }

        [MaxLength(100)]
        public string? City { get; set; }

        [MaxLength(100)]
        public string? State { get; set; }

        [MaxLength(20)]
        public string? ZipCode { get; set; }

        [MaxLength(200)]
        public string? GuardianName { get; set; }

        [MaxLength(20)]
        public string? GuardianCPF { get; set; }

        public string? Notes { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
