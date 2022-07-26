using System.Net;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recargas
{
    public class Details
    {
        public class Query : IRequest<RecargaDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, RecargaDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<RecargaDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var recarga = await _context.Recargas
                .FindAsync(request.Id);

                if (recarga == null)
                    throw new RestException(HttpStatusCode.NotFound, new { recarga = "Not found" });

                    var recargaToReturn = _mapper.Map<Recarga, RecargaDto>(recarga);

                return recargaToReturn;
            }
        }
    }
}