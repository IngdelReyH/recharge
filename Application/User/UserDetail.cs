using System.Net;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.User
{
    public class UserDetail
    {
public class Query : IRequest<AppUser> 
{ 
public string Id { get; set; }
}

        public class Handler : IRequestHandler<Query, AppUser>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<AppUser> Handle(Query request, CancellationToken cancellationToken)
            {
              //handler logic goes here
              var user = await _context.Usersx.FindAsync(request.Id);

              if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Not found" });
                return user;
            }
        }
    }
}