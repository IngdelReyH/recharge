using System.Net;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Compras
{
    public class EstadoCompra
    {
         public class Command : IRequest
                {
                     public Guid Id { get; set; }
                    public bool IsHost {get; set;}

                    public DateTime DateBought {get; set;}
                }
        
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
                    private readonly IUserAccessor _userAccessor;
                     public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
        
                    public  async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                       //handler logic
                     var compra = await _context.UserRecargas.SingleOrDefaultAsync(x=>x.DateBought == request.DateBought);
              if(compra == null) //if(user_recarga == null)//
                throw new RestException(HttpStatusCode.BadRequest, new {Compra = "No existe esta compra"});
               
                      
                      compra.IsHost= request.IsHost;
                       var success = await _context.SaveChangesAsync()>0;
        
                       if(success) return Unit.Value;
        
                       throw new Exception("Problem saving Changes");
                    }
                }
    }
}