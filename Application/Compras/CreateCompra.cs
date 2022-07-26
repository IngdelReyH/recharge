using System.Net;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Compras
{
    public class CreateCompra
    {
         public class Command : IRequest
                {
                     public Guid Id { get; set; }
            public string title { get; set; }
            public string price { get; set; }
            public string description { get; set; }
            public string category { get; set; }
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
                        var recarga = await _context.Recargas.FindAsync(request.Id);
                if(recarga == null)
                {
                    throw new RestException(HttpStatusCode.NotFound,new {Recarga = "Could not find recarga"});
                }
                
                
                var user = await _context.Users.SingleOrDefaultAsync(x => 
                x.UserName == _userAccessor.GetcurrentUserName());
                
               
               var attendance = new UserRecarga{
                    Recarga = recarga,
                    AppUser = user,
                    IsHost = false,
                    DateBought = DateTime.Now,
                    state = "Unattended",
                    refunded = false
                };
                    
                       /* var recarga = new Recarga
                {
                    Id = request.Id,
                    title = request.title,
                    price = request.price,
                    description = request.description,
                    category = request.category
                };

                

                var user = await _context.Users.SingleOrDefaultAsync(x=>
                 x.UserName == _userAccessor.GetcurrentUserName());

                 var attendee = new UserRecarga
                 {
                    AppUser = user,
                    Recarga = recarga,
                    IsHost = true,
                    DateBought = DateTime.Now
                 };*/

                 _context.UserRecargas.Add(attendance);
                       var success = await _context.SaveChangesAsync()>0;
        
                       if(success) return Unit.Value;
        
                       throw new Exception("Problem saving Changes");
                    }
                }
    }
}