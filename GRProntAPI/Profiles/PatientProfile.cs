using AutoMapper;
using GRProntAPI.DTOs;
using GRProntAPI.Models;

namespace GRProntAPI.Profiles
{
    public class PatientProfile : Profile
    {
        public PatientProfile()
        {
            // Create → Model
            CreateMap<PatientCreateDto, Patient>();

            // Update → Model
            CreateMap<PatientUpdateDto, Patient>();

            // Model → List DTO
            CreateMap<Patient, PatientListDto>();

            // Model → Detail DTO
            CreateMap<Patient, PatientDetailDto>();
        }
    }
}
