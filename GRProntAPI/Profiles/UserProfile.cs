using AutoMapper;
using GRProntAPI.Models;
using GRProntAPI.DTOs;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserListDto>();
        CreateMap<User, UserDetailDto>();
        CreateMap<UserCreateDto, User>();
        CreateMap<UserUpdateDto, User>();
    }
}
