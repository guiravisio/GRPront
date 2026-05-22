public class PatientDetailDto
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string Gender { get; set; }
    public string IdentificationType { get; set; }
    public string Identification { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string GuardianName { get; set; }
    public string GuardianCPF { get; set; }
    public string EmergencyContactName { get; set; }
    public string EmergencyContactPhone { get; set; }
    public string Notes { get; set; }
}
