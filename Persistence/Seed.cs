using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName="Bob",
                        UserName="bob",
                        Email="bob@test.com"
                    },
                     new AppUser
                    {
                        DisplayName="Tom",
                        UserName="tom",
                        Email="tom@test.com"
                    },
                     new AppUser
                    {
                        DisplayName="Jane",
                        UserName="jane",
                        Email="jane@test.com"
                    }
                };
                foreach (var user in users)
                {
                   await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            if(!context.Recargas.Any()){

                var recargas = new List<Recarga>{
                     new Recarga
                    {
                        title = "Especial",
                        price = "500",
                        description = "doble",
                        category = "nauta",
                    },
                    new Recarga
                    {
                       title = "Especial",
                        price = "250",
                        description = "doble",
                        category = "cup",
                    },
                    new Recarga
                    {
                        title = "Especial",
                        price = "700",
                        description = "doble",
                        category = "mlc",
                    }
                };
                context.Recargas.AddRange(recargas);
                context.SaveChanges();
            }

            if(!context.Compras.Any())
            {
                var compras = new List<Compra>
                {
                    new Compra{
                    state = "Unattended",
                    refunded = false,
                    DateBought = DateTime.Now,
                    title = "Promox",
                    price = "750",
                    buyer = "Jorge"
                    }
                };
                context.Compras.AddRange(compras);
                context.SaveChanges();
            }

        }
    }
}