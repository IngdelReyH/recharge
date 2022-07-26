
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recargas
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string title { get; set; }
            public string price { get; set; }
            public string description { get; set; }
            public string category { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.title).NotEmpty();
                RuleFor(x => x.price).NotEmpty();
                RuleFor(x => x.description).NotEmpty();
                RuleFor(x => x.category).NotEmpty();
            }
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

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var recarga = new Recarga
                {
                    Id = request.Id,
                    title = request.title,
                    price = request.price,
                    description = request.description,
                    category = request.category
                };

                _context.Recargas.Add(recarga);

                /*var user = await _context.Users.SingleOrDefaultAsync(x=>
                 x.UserName == _userAccessor.GetcurrentUserName());

                 var attendee = new UserRecarga
                 {
                    AppUser = user,
                    Recarga = recarga,
                    IsHost = true,
                    DateBought = DateTime.Now
                 };

                 _context.UserRecargas.Add(attendee);*/

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving Changes");
            }
        }
    }
}