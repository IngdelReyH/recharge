using Application.Recargas;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class UserController : BaseController
    {
       
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> UserDetail(string id)
        {
            return await Mediator.Send(new UserDetail.Query{Id = id});
        }
        [AllowAnonymous]
         [HttpGet("lista")]
       /*  public async Task<ActionResult<List<AttendeeDto>>> ListUsersDto()
        {
            return await Mediator.Send(new ListUsersDto.Query());
        }*/
        public async Task<ActionResult<List<AppUser>>> ListUser()
        {
            return await Mediator.Send(new ListUser.Query());
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteUser(string id)
        {
            return await Mediator.Send(new DeleteUser.Command{Id=id});
        }

            

    }
}