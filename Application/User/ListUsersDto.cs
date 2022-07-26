using Application.Recargas;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class ListUsersDto
    {
         public class Query : IRequest<List<AttendeeDto>> { }

        public class Handler : IRequestHandler<Query, List<AttendeeDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<List<AttendeeDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Usersx.ToListAsync();

                return _mapper.Map<List<AppUser>, List<AttendeeDto>>(users);
            }
        }
    }
}