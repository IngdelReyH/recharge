using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;


            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
               var user = await _userManager.FindByNameAsync(_userAccessor.GetcurrentUserName());

               return new User
               {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Token = _jwtGenerator.CreateToken(user),
                Image = null,
                Id=user.Id
               };
            }
        }
    }
}