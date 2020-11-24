using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.PessoaFisica;
using Service.PessoaFisica.Dtos;
using Shared;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/pessoa-fisica")]
    [Authorize]
    [Produces("application/json")]
    public class PessoaFisicaController : Controller
    {
        private readonly IPessoaFisicaService _pessoaFisicaService;

        public PessoaFisicaController(IPessoaFisicaService pessoaFisicaService)
        {
            _pessoaFisicaService = pessoaFisicaService;
        }

        [HttpPost]
        [Route("cadastrar")]
        public ResponseApi Cadastrar([FromBody] CadastrandoPessoaFisicaDto dto)
        {
            var response = _pessoaFisicaService.Cadastrar(dto);

            return response;
        }


        [HttpPut]
        [Route("editar/{id}")]
        public ResponseApi Editar([FromBody] EditandoPessoaFisicaDto dto)
        {
            var response = _pessoaFisicaService.Atualizar(dto);

            return response;
        }

        [HttpGet]
        [Route("obter-todos")]
        public ListandoPessoaFisicaDto[] ObterTodos()
        {
            var response = _pessoaFisicaService.ObterLista();

            return response;
        }

        [HttpGet]
        [Route("obter/{id}")]
        public EditandoPessoaFisicaDto ObterPorId([FromRoute] int id)
        {
            var response = _pessoaFisicaService.ObterPorId(id);

            return response;
        }

    }
}
