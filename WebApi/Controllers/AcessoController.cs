using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Acesso;
using Service.Acesso.Dtos;

namespace WebApi.Controllers
{
    [Route("api/acesso")]
    [ApiController]
    [Produces("application/json")]
    public class AcessoController : Controller
    {
        private readonly IAcessoService _acessoService;

        public AcessoController(IAcessoService acessoService)
        {
            _acessoService = acessoService;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Logar([FromBody] UsuarioLogandoDto usuario)
        {
            var token = _acessoService.ObterToken(usuario);

            return Ok(token);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("recuperar-senha")]
        public ActionResult RecuperarSenha(string email)
        {

        }
    }
}
