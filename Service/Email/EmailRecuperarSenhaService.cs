using Shared.Infra;

namespace Service.Email
{
    public interface IEmailLayoutRecuperarSenha
    {
        string Obter(string nome);
    }

    public class EmailLayoutRecuperarSenha : IEmailLayoutRecuperarSenha
    {
        public string Obter(string nome)
        {
            return $"{nome} foi enviado um link de recuperação da senha para seu email";
        }
    }
}
