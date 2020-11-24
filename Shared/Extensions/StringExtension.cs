using System;

namespace Shared.Extensions
{
    public static class StringExtension
    {
        public static DateTime ConvertToDatetime(this string valor)
        {
            return Convert.ToDateTime(valor);
        }
    }
}
