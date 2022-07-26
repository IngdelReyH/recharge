using System.Net;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Compras
{
    public class CreateCompra2
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
                    private readonly IUserAccessor _userAccessor;
                    public Handler(DataContext context, IUserAccessor userAccessor)
                    {
                        _userAccessor = userAccessor;
                        _context = context;
                    }
        
                    public  async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                       //handler logic

                        var compra = new Compra{
                            Id = request.Id,
                            state = "Unattended",
                            refunded = false,
                            DateBought = DateTime.Now,
                            title = request.title,
                            price = request.price,
                            buyer = request.buyer

                        };

                        _context.Compras.Add(compra);
                       var success = await _context.SaveChangesAsync()>0;
        
                       if(success) return Unit.Value;
        
                       throw new Exception("Problem saving Changes");
                    }
                }
    }
}