using System;
using System.Collections.Generic;
using System.Text;

namespace Shared.Infra
{
    public interface IEnviaEmailService
    {
        void Enviar(DestinatarioDto dto, string body);
    }
    public class EnviaEmailService : IEnviaEmailService
    {
        public void Enviar(DestinatarioDto dto, string  body)
        {
            throw new NotImplementedException();
        }
    }

    public class DestinatarioDto
    {
        public string Nome { get; private set; }
        public string Email { get; private set; }

        public DestinatarioDto(string nome, string email)
        {
            Nome = nome;
            Email = email;
        }
    }
}
