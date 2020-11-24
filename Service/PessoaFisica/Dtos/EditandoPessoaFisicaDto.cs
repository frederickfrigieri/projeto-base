namespace Service.PessoaFisica.Dtos
{
    public class EditandoPessoaFisicaDto
    {
        public int Id { get; set; }
        public string DataNascimento { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Cpf { get; set; }
    }
}
