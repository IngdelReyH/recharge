using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;
    public class DataContext : IdentityDbContext<AppUser>//DbContext//
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Value> Values {get; set;}

        

        public DbSet<Recarga> Recargas {get; set;}

        public DbSet<AppUser> Usersx {get; set;}

        public DbSet<UserRecarga> UserRecargas {get; set;}
        public DbSet<Compra> Compras {get; set;}

        

       

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>().HasData(
                new Value {Id = 1, Name = "Value 101"},
                new Value {Id = 2, Name = "Value 102"},
                new Value {Id = 3, Name = "Value 103"}
            );

            builder.Entity<UserRecarga>(x => x.HasKey(ur => 
            new {ur.AppUserId, ur.RecargaId}));

            builder.Entity<UserRecarga>()
            .HasOne(u => u.AppUser)
            .WithMany(r => r.UserRecargas)
            .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserRecarga>()
            .HasOne(r => r.Recarga)
            .WithMany(u => u.UserRecargas)
            .HasForeignKey(r => r.RecargaId);
        }
    }

