using System.Net;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Compras
{
    public class EditCompra
    {
         public class Command : IRequest
                {
                     public Guid Id { get; set;}
                    public string state { get; set; }

                    public bool refunded { get; set; }

                    public DateTime DateBought {get; set;}

                    public string title { get; set; }
                    public string price { get; set; }

                    public string buyer {get; set;}
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
                       var compra = await _context.Compras.FindAsync(request.Id);
                        if(compra == null) //if(user_recarga == null)//
                            throw new RestException(HttpStatusCode.BadRequest, new {Compra = "No existe esta compra"});
                        
                        //compra.AppUser=request.AppUser ?? compra.AppUser;
                        if(request.refunded!=compra.refunded)
                        compra.refunded=request.refunded;
                        compra.state=request.state ?? compra.state;
                       var success = await _context.SaveChangesAsync()>0;
        
                       if(success) return Unit.Value;
        
                       throw new Exception("Problem saving Changes");
                    }
                }
    }
}