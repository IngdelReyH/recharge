namespace Domain
{
    public class UserRecarga
    {
        public string AppUserId {get; set;}

        public  virtual AppUser AppUser {get; set;}

        public Guid RecargaId {get; set;}

        public virtual Recarga Recarga {get; set;}

        public DateTime DateBought {get; set;}

        public bool IsHost {get; set;}

         public string state { get; set; }

         public bool refunded { get; set; }

    }
}