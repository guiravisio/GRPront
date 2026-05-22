using System.ComponentModel.DataAnnotations;

public class PatientUpdateDto
{
    [Required]
    [MaxLength(200)]
    public string FullName { get; set; }

    public DateTime? DateOfBirth { get; set; }

    [MaxLength(20)]
    public string Gender { get; set; }

    [Required]
    [MaxLength(20)]
    public string IdentificationType { get; set; }

    [MaxLength(50)]
    public string Identification { get; set; }

    [MaxLength(20)]
    public string PhoneNumber { get; set; }

    [MaxLength(100)]
    public string Email { get; set; }

    [MaxLength(250)]
    public string Address { get; set; }

    [MaxLength(100)]
    public string City { get; set; }

    [MaxLength(100)]
    public string State { get; set; }

    [MaxLength(20)]
    public string ZipCode { get; set; }

    [MaxLength(200)]
    public string GuardianName { get; set; }

    [MaxLength(20)]
    public string GuardianCPF { get; set; }

    [MaxLength(200)]
    public string EmergencyContactName { get; set; }

    [MaxLength(20)]
    public string EmergencyContactPhone { get; set; }

    public string Notes { get; set; }
}
