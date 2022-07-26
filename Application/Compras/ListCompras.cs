using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Compras
{
   /* public class ListCompras
    {
         public class Query : IRequest<List<UserRecarga>> { }

        public class Handler : IRequestHandler<Query, List<UserRecarga>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<UserRecarga>> Handle(Query request, CancellationToken cancellationToken)
            {
               var compras = await _context.UserRecargas.ToListAsync();

               return compras;
            }
        }
    }*/
       public class ListCompras
    {
         public class Query : IRequest<List<Compra>> { }

        public class Handler : IRequestHandler<Query, List<Compra>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Compra>> Handle(Query request, CancellationToken cancellationToken)
            {
               var compras = await _context.Compras.ToListAsync();

               return compras;
            }
        }
    }
}
//}