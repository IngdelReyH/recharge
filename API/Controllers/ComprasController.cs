using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Compras;
using Domain;

namespace API.Controllers
{
    public class ComprasController : BaseController
    {
          [AllowAnonymous]
         [HttpGet]
       /*  public async Task<ActionResult<List<AttendeeDto>>> ListUsersDto()
        {
            return await Mediator.Send(new ListUsersDto.Query());
        }*/
        public async Task<ActionResult<List<Compra>>> ListCompras()
        {
            return await Mediator.Send(new ListCompras.Query());
        }


         [AllowAnonymous]
         [HttpPost("createcompra2")]
        
        public async Task<ActionResult<Unit>> CreateCompra2(CreateCompra2.Command command)
        {
            return await Mediator.Send(command);
        }
        

        [AllowAnonymous]
        [HttpGet("{date}")]
        public async Task<ActionResult<UserRecarga>> CompraInfo(DateTime date)
        {
           
           return await Mediator.Send(new CompraInfo.Query{DateBought = date});
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditCompra(Guid id, EditCompra.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

       
         
    }
}