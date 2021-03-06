﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using Service.Acesso.Dtos;
using Service.Email;
using Shared;
using Shared.Infra;
using Shared.Persistence;

namespace Service.Acesso
{
    public interface IAcessoService
    {
        string ObterToken(UsuarioLogandoDto dto);
        ResponseApi RecuperarSenha(string email, IEnviaEmailService enviaEmailService, IEmailLayoutRecuperarSenha emailLayoutRecuperarSenha);
    }

    public class AcessoService : IAcessoService
    {
        private readonly IRepository _repository;

        public AcessoService(IRepository repository)
        {
            _repository = repository;
        }

        public string ObterToken(UsuarioLogandoDto dto)
        {
            var usuario = _repository.QueryNoTracking<Usuario>()
                .Where(x => x.Email.Equals(dto.Email) && x.Senha.Equals(dto.Senha)).SingleOrDefault();

            if (usuario == null)
                return null;

            var expiration = DateTime.UtcNow.AddHours(2);
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Constant.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                        new Claim(ClaimTypes.Name, usuario.Nome),
                        new Claim(ClaimTypes.Email, usuario.Email),
                        new Claim(ClaimTypes.Expiration, expiration.ToString("dd/MM/yyyy HH:mm"))
                }),
                Expires = expiration,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public ResponseApi RecuperarSenha(string email, IEnviaEmailService enviaEmailService, IEmailLayoutRecuperarSenha emailLayoutRecuperarSenha)
        {
            var usuario = _repository.QueryNoTracking<Usuario>().Where(x => x.Email.Equals(email)).SingleOrDefault();

            if (usuario == null)
                return ResponseApi.Return("Email não encontrado.");

            enviaEmailService.Enviar(new DestinatarioDto(usuario.Nome, usuario.Email), emailLayoutRecuperarSenha.Obter(usuario.Nome));

            return ResponseApi.Return();
        }
    }
}
