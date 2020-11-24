using System;

namespace Service.Acesso.Dtos
{
    public class DadosDeAcessoDto
    {
        public Guid Token { get; set; }
        public string Email { get; set; }
        public string Nome { get; set; }
        public int  Id { get; set; }
        public DateTime DataAcesso { get; set; }
    }
}
