using System;
using System.Collections.Generic;
using System.Linq;
using Flunt.Notifications;

namespace Shared
{
    public class ResponseApi
    {
        private ResponseApi() { }

        public bool Sucesso { get; set; }
        public string[] MensagensDeErro { get; set; }

        public static ResponseApi Return(IReadOnlyCollection<Notification> notificacaoDeErro = null)
        {
            return new ResponseApi
            {
                MensagensDeErro = notificacaoDeErro?.Select(x => x.Message).ToArray(),
                Sucesso = notificacaoDeErro == null || notificacaoDeErro.Count == 0
            };
        }

        public static ResponseApi Return(string mensagem)
        {
            return new ResponseApi
            {
                MensagensDeErro = string.IsNullOrEmpty(mensagem) ? null : new string[] { mensagem },
                Sucesso = string.IsNullOrEmpty(mensagem)
            };
        }
    }
}
