using System.Net;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Recargas
{
    public class Delete
    {
        public class Command : IRequest
                {
                    public Guid Id { get; set; }
                }
        
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        _context = context;
                    }
        
                    public  async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                       //handler logic
                       var recarga= await _context.Recargas.FindAsync(request.Id);
                       if(recarga == null)
                       throw new RestException(HttpStatusCode.NotFound, new {recarga = "Not found"});

                       _context.Remove(recarga);
                       var success = await _context.SaveChangesAsync()>0;
        
                       if(success) return Unit.Value;
        
                       throw new Exception("Problem saving Changes");
                    }
                }
    }
}