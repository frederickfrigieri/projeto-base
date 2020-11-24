using Flunt.Notifications;

namespace Shared.Domain
{
    public class EntityBase : Notifiable
    {
        public int Id { get; set; }
    }
}
