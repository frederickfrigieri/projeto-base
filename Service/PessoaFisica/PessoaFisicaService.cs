using System.Linq;
using Service.PessoaFisica.Dtos;
using Shared;
using Shared.Persistence;

namespace Service.PessoaFisica
{
    public interface IPessoaFisicaService
    {
        ResponseApi Cadastrar(CadastrandoPessoaFisicaDto dto);
        ListandoPessoaFisicaDto[] ObterLista();
        ResponseApi Atualizar(EditandoPessoaFisicaDto dto);
        EditandoPessoaFisicaDto ObterPorId(int id);
    }

    public class PessoaFisicaService : IPessoaFisicaService
    {
        private readonly IRepository _repository;

        public PessoaFisicaService(IRepository repository)
        {
            _repository = repository;
        }

        public ResponseApi Cadastrar(CadastrandoPessoaFisicaDto dto)
        {
            var existeCpf = _repository.QueryNoTracking<Domain.Entities.PessoaFisica>()
                .Any(x => x.Cpf.Equals(dto.Cpf));

            if (existeCpf)
                return ResponseApi.Return("Já existe um CPF cadastrado em nossa base.");

            var pessoa = new Domain.Entities.PessoaFisica(dto.Nome, dto.Sobrenome, dto.DataNascimento, dto.Cpf);

            if (pessoa.Invalid)
                return ResponseApi.Return(pessoa.Notifications);

            _repository.Add(pessoa);
            _repository.SaveChanges();

            return ResponseApi.Return();
        }

        public ListandoPessoaFisicaDto[] ObterLista()
        {
            var pessoas = _repository.QueryNoTracking<Domain.Entities.PessoaFisica>()
                .Select(x => new ListandoPessoaFisicaDto
                {
                    Id = x.Id,
                    NomeCompleto = $"{x.Nome} {x.Sobrenome}",
                    Cpf = x.Cpf,
                    DataCadastro = x.DataCadastro.ToString("dd/MM/yyyy HH:mm")
                }).ToArray();

            return pessoas;
        }

        public ResponseApi Atualizar(EditandoPessoaFisicaDto dto)
        {
            var pessoa = _repository.Query<Domain.Entities.PessoaFisica>().Where(x => x.Id.Equals(dto.Id)).FirstOrDefault();

            if (pessoa == null)
                return ResponseApi.Return("Nenhuma pessoa foi encontrada com esse Id");

            var pessoaPorCpf = _repository.Query<Domain.Entities.PessoaFisica>().Where(x => x.Cpf.Equals(dto.Cpf)).FirstOrDefault();

            if (pessoaPorCpf != null && pessoaPorCpf.Id != pessoa.Id)
                return ResponseApi.Return("Já existe uma outra pessoa utilizando este CPF.");

            pessoa.Atualizar(dto.Nome, dto.Sobrenome, dto.DataNascimento, dto.Cpf);

            if (pessoa.Invalid)
                return ResponseApi.Return(pessoa.Notifications);

            _repository.Update(pessoa);
            _repository.SaveChanges();

            return ResponseApi.Return();
        }

        public EditandoPessoaFisicaDto ObterPorId(int id)
        {
            var query = _repository.QueryNoTracking<Domain.Entities.PessoaFisica>().Where(x => x.Id.Equals(id));

            return query.Select(x => new EditandoPessoaFisicaDto
            {
                DataNascimento = x.DataNascimento.ToString("dd/MM/yyyy"),
                Id = x.Id,
                Nome = x.Nome,
                Sobrenome = x.Sobrenome,
                Cpf = x.Cpf

            }).Single();
        }
    }
}
