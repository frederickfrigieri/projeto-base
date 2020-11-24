using System;
using Flunt.Validations;
using Shared.Domain;

namespace Domain.Entities
{
    public class Usuario : EntityBase
    {
        private Usuario() { }

        public Usuario(string email, string nome, string senha)
        {
            var contrato = new Contract();

            contrato.IsNotNullOrEmpty(email, nameof(Email), ContractValidationMessage.PropertyIsNotNullOrEmpty(Email));
            contrato.IsNotNullOrEmpty(nome, nameof(Nome), ContractValidationMessage.PropertyIsNotNullOrEmpty(Nome));
            contrato.IsNotNullOrEmpty(senha, nameof(Senha), ContractValidationMessage.PropertyIsNotNullOrEmpty(Senha));
            contrato.AddNotifications();

            if (Invalid) return;

            Nome = nome;
            Email = email;
            Senha = senha;
            DataCadastro = DateTime.Now;
        }

        public string Nome { get; private set; }
        public string Email { get; private set; }
        public string Senha { get; private set; }
        public DateTime DataCadastro { get; private set; }
    }
}
