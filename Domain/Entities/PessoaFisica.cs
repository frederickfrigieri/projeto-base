using System;
using Flunt.Validations;
using Shared.Domain;
using Shared.Extensions;

namespace Domain.Entities
{
    public class PessoaFisica : EntityBase
    {
        private PessoaFisica() { }

        public PessoaFisica(string nome, string sobrenome, string dataNascimento, string cpf)
        {
            var contrato = new Contract();

            contrato.IsNotNullOrEmpty(nome, nameof(Nome), ContractValidationMessage.PropertyIsNotNullOrEmpty(nameof(Nome)));
            contrato.IsNotNullOrEmpty(sobrenome, nameof(Sobrenome), ContractValidationMessage.PropertyIsNotNullOrEmpty(nameof(Sobrenome)));
            contrato.IsNotNullOrEmpty(dataNascimento, nameof(DataNascimento), ContractValidationMessage.PropertyIsNotNullOrEmpty(nameof(DataNascimento)));
            contrato.IsNotNullOrEmpty(cpf, nameof(Cpf), ContractValidationMessage.PropertyIsNotNullOrEmpty(nameof(Cpf)));
            AddNotifications(contrato);

            if (Invalid) return;

            Nome = nome;
            Sobrenome = sobrenome;
            DataNascimento = dataNascimento.ConvertToDatetime();
            Cpf = cpf;
            DataCadastro = DateTime.Now;
        }

        public void Atualizar(string nome, string sobrenome, string dataNascimento, string cpf)
        {
            var contrato = new Contract();

            contrato.IsNotNull(nome, nameof(Nome), ContractValidationMessage.PropertyIsNotNullOrEmpty(nameof(Nome)));
            contrato.IsNotNull(sobrenome, nameof(Sobrenome), ContractValidationMessage.PropertyIsNotNullOrEmpty(nameof(Sobrenome)));
            contrato.IsNotNull(dataNascimento, nameof(DataNascimento), ContractValidationMessage.PropertyIsNotNullOrEmpty(nameof(DataNascimento)));
            contrato.IsNotNullOrEmpty(cpf, nameof(Cpf), ContractValidationMessage.PropertyIsNotNullOrEmpty(nameof(Cpf)));
            AddNotifications(contrato);

            if (Invalid) return;

            Nome = nome;
            Sobrenome = sobrenome;
            DataNascimento = dataNascimento.ConvertToDatetime();
            Cpf = cpf;
        }

        public string Nome { get; private set; }
        public string Sobrenome { get; private set; }
        public DateTime DataNascimento { get; private set; }
        public string Cpf { get; private set; }
        public DateTime DataCadastro { get; private set; }
    }
}
