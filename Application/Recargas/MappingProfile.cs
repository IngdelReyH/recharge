using AutoMapper;
using Domain;

namespace Application.Recargas
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Recarga, RecargaDto>();
            CreateMap<UserRecarga, AttendeeDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Displayname, o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}