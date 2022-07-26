using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recargas
{
    public class List
    {
        public class Query : IRequest<List<RecargaDto>> { }

        public class Handler : IRequestHandler<Query, List<RecargaDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<List<RecargaDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var recargas = await _context.Recargas
                .ToListAsync();

                return _mapper.Map<List<Recarga>, List<RecargaDto>>(recargas);
            }
        }
    }
}

