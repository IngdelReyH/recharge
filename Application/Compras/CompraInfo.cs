using System.Net;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Compras
{
    public class CompraInfo
    {
         public class Query : IRequest<UserRecarga> { 
             public DateTime DateBought {get; set;}
         }
        
                public class Handler : IRequestHandler<Query, UserRecarga>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        _context = context;
        
                    }
        
                    public async Task<UserRecarga> Handle(Query request, CancellationToken cancellationToken)
                    {
                      //handler logic goes here
                       var compra = await _context.UserRecargas.SingleOrDefaultAsync(x=>x.DateBought == request.DateBought);
              if(compra == null) //if(user_recarga == null)//
                throw new RestException(HttpStatusCode.BadRequest, new {Compra = "No existe esta compra"});
               
               return compra;
                    }
                }
    }
}