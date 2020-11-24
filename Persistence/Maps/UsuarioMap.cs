using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Shared.Extensions;

namespace Persistence.Maps
{
    public class UsuarioMap : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("Usuarios");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.DataCadastro)
                .IsRequired();
            builder.Property(x => x.Email)
                .HasMaxLength(100)
                .IsRequired();
            builder.Property(x => x.Nome)
                .HasMaxLength(100)
                .IsRequired();
            builder.Property(x => x.Senha)
                .HasMaxLength(10)
                .IsRequired();
            builder.Ignore(x => x.Notifications);
            builder.HasIndex(x => x.Email).IsUnique();

            var usuario = new Usuario("admin@porto.com.br", "administrador", "123@Trocar");

            usuario.SetProperty(x => x.Id, 1);
            builder.HasData(usuario);
        }
    }
}
