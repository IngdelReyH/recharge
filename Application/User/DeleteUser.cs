using System.Net;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.User
{
    public class DeleteUser
    {
        public class Command: IRequest
        {
            public string Id {get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            /*private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;*/
           
           // public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
             public Handler(DataContext context)
            
            {
               /* _jwtGenerator = jwtGenerator;
                _userManager = userManager;*/
                _context = context;
                
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //handler logic
               /* AppUser user = await _userManager.FindByIdAsync(request.Id);
                if(user != null){
                    IdentityResult result =  await _userManager.DeleteAsync(user);
                    if(!result.Succeeded)
                    {
                       throw new RestException(HttpStatusCode.Conflict, new {user = "Not found"});
                    }
                    
                }*/

                var user = await _context.Usersx.FindAsync(request.Id);
                if(user == null)
                       throw new RestException(HttpStatusCode.NotFound, new {user = "Not found"});
                _context.Remove(user);
                var success = await _context.SaveChangesAsync()>0;
                 if(success) return Unit.Value;
        
                       throw new Exception("Problem saving Changes");
            }
        }
    }
}