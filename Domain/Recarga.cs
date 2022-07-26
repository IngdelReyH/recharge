namespace Domain
{
    public class Recarga
    {
        public Guid Id { get; set;}

         public string title { get; set; }
        public string price { get; set; }
        public string description { get; set; }
        public string category { get; set; }

        public virtual ICollection<UserRecarga> UserRecargas {get; set;}

    }
}