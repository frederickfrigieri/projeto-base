using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Maps
{
    public class PessoaFisicaMap : IEntityTypeConfiguration<PessoaFisica>
    {
        public void Configure(EntityTypeBuilder<PessoaFisica> builder)
        {
            builder.ToTable("PessoasFisica");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.DataCadastro)
                .IsRequired();
            builder.Property(x => x.DataNascimento)
                .IsRequired();
            builder.Property(x => x.Nome)
                .HasMaxLength(100)
                .IsRequired();
            builder.Property(x => x.Sobrenome)
                .HasMaxLength(100)
                .IsRequired();
            builder.Ignore(x => x.Notifications);
        }
    }
}
