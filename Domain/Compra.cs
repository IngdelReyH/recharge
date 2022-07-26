namespace Domain
{
    public class Compra
    {
        public Guid Id { get; set;}
         public string state { get; set; }

         public bool refunded { get; set; }

        public DateTime DateBought {get; set;}

        public string title { get; set; }
        public string price { get; set; }

        public string buyer {get; set;}
    }
}