
using System.Net;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Recargas
{
    public class Edit
    {
        public class Command : IRequest
              {
                 public Guid Id { get; set;}

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
                  public Handler(DataContext context)
                  {
                      _context = context;
                  }
      
                  public  async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                  {
                     //handler logic
                     var recarga = await _context.Recargas.FindAsync(request.Id);
                     
                      if(recarga == null)
                       throw new RestException(HttpStatusCode.NotFound, new {recarga = "Not found"});

                     recarga.title = request.title ?? recarga.title;
                     recarga.price = request.price ?? recarga.price;
                     recarga.description = request.description ?? recarga.description;
                     recarga.category = request.category ?? recarga.category;

                     var success = await _context.SaveChangesAsync()>0;
      
                     if(success) return Unit.Value;
      
                     throw new Exception("Problem saving Changes");
                  }
              } 
    }
}