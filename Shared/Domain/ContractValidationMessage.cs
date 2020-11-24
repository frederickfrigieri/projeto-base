namespace Shared.Domain
{
    public static class ContractValidationMessage
    {
        public static string PropertyIsNotNullOrEmpty(string valor)
        {
            return $"Propriedade {valor} não pode ser vazia.";
        }
    }
}
