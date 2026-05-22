using AutoMapper;
using GRProntAPI.DTOs;
using GRProntAPI.Models;

namespace GRProntAPI.Profiles
{
    public class PatientProfile : Profile
    {
        public PatientProfile()
        {
            CreateMap<PatientCreateDto, Patient>();
            CreateMap<PatientUpdateDto, Patient>();
            CreateMap<Patient, PatientListDto>();
            CreateMap<Patient, PatientDetailDto>();
        }
    }
}
