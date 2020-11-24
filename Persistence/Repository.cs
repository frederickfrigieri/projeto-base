using System.Linq;
using Microsoft.EntityFrameworkCore;
using Shared.Domain;
using Shared.Persistence;

namespace Persistence
{
    public class Repository : IRepository
    {
        private readonly PersistenceDbContext _dbContext;

        public Repository(PersistenceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Add<T>(T entity) where T : EntityBase
        {
            _dbContext.Add(entity);
        }

        public void AddWithSave<T>(T entity) where T : EntityBase
        {
            _dbContext.Add(entity);
            _dbContext.SaveChanges();
        }

        public IQueryable<T> Query<T>() where T : EntityBase
        {
            return _dbContext.Set<T>().AsQueryable();
        }

        public IQueryable<T> QueryNoTracking<T>() where T : EntityBase
        {
            return _dbContext.Set<T>().AsNoTracking();
        }

        public void Remove<T>(T entity) where T : EntityBase
        {
            _dbContext.Remove(entity);
        }

        public int SaveChanges()
        {
            return _dbContext.SaveChanges();
        }

        public void Update<T>(T entity) where T : EntityBase
        {
            _dbContext.Update(entity);
        }

        public void UpdateWithSave<T>(T entity) where T : EntityBase
        {
            _dbContext.Update(entity);
            _dbContext.SaveChanges();
        }
    }
}
