using System.Linq;
using Shared.Domain;

namespace Shared.Persistence
{
    public interface IRepository
    {
        IQueryable<T> Query<T>() where T : EntityBase;
        IQueryable<T> QueryNoTracking<T>() where T : EntityBase;
        void Add<T>(T entity) where T : EntityBase;
        void AddWithSave<T>(T entity) where T : EntityBase;
        void Update<T>(T entity) where T : EntityBase;
        void UpdateWithSave<T>(T entity) where T : EntityBase;
        void Remove<T>(T entity) where T : EntityBase;
        int SaveChanges();
    }
}
