
using System.Text;
using Application.Interfaces;
using Application.Recargas;
using Domain;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using FluentValidation.AspNetCore;
using API.Middleware;
using System.Text.Json.Serialization;

internal class Program
{
   
    private static void Main(string[] args)
    {

        //-----------------
       
        //----------
var builder = WebApplication.CreateBuilder(args);
//-------

// Add services to the container.
var serviceCollection = builder.Services.AddDbContext<DataContext>(opt =>
        {
            opt.UseLazyLoadingProxies();
            opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
        });

    builder.Services.AddControllers();
    builder.Services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy =>{
                policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();//WithOrigins("http://localhost:3000");
            });
        });
        builder.Services.AddMediatR(typeof(List.Handler).Assembly);
        builder.Services.AddAutoMapper(typeof(List.Handler));
        builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
        builder.Services.AddMvc(opt => {
            var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            opt.Filters.Add(new AuthorizeFilter(policy));
        })
        .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<Create>());

        var constructor= builder.Services.AddIdentityCore<AppUser>();
        
        var key =  new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]));
         builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>{
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateAudience = false,
                ValidateIssuer =false,
                ValidateLifetime=true,
                
            };
         });
        var identityBuilder = new IdentityBuilder(constructor.UserType, constructor.Services);
        identityBuilder.AddEntityFrameworkStores<DataContext>();
        identityBuilder.AddSignInManager<SignInManager<AppUser>>();
        builder.Services.AddScoped<IJwtGenerator, JwtGenerator>();
        builder.Services.AddScoped<IUserAccessor, UserAccessor>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using(var scope = app.Services.CreateScope())
{
// Configure the HTTP request pipeline.
app.UseMiddleware<ErrorHandlingMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

var services= scope.ServiceProvider;
try{
     var context = services.GetRequiredService<DataContext>();
     var userManager = services.GetRequiredService<UserManager<AppUser>>();
                context.Database.Migrate();
                Seed.SeedData(context, userManager).Wait();
}
catch(Exception ex)
{
   var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error ocurred during migration"); 
}

}
app.Run();
    }
}
