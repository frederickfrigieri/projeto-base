using Microsoft.EntityFrameworkCore;
using Persistence.Maps;

namespace Persistence
{
    public class PersistenceDbContext : DbContext
    {
        private PersistenceDbContext() { }

        public PersistenceDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UsuarioMap());
            modelBuilder.ApplyConfiguration(new PessoaFisicaMap());
        }
    }
}
