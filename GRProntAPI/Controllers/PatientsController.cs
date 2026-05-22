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
    public class PatientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PatientsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientListDto>>> GetPatients()
        {
            var patients = await _context.Patients.ToListAsync();
            return _mapper.Map<List<PatientListDto>>(patients);
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientDetailDto>> GetPatientById(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null) return NotFound();

            return _mapper.Map<PatientDetailDto>(patient);
        }

        // POST: api/Patients
        [HttpPost]
        [Authorize(Roles = "Admin,Doctor")]
        public async Task<ActionResult<Patient>> CreatePatient(PatientCreateDto dto)
        {
            var patient = _mapper.Map<Patient>(dto);

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPatientById), new { id = patient.Id }, patient);
        }

        // PUT: api/Patients/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Doctor")]
        public async Task<IActionResult> UpdatePatient(int id, PatientUpdateDto dto)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null) return NotFound();

            _mapper.Map(dto, patient);
            patient.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Doctor")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null) return NotFound();

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
