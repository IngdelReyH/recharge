using Newtonsoft.Json;

namespace Application.Recargas
{
    public class RecargaDto
    {
        public Guid Id { get; set;}

         public string title { get; set; }
        public string price { get; set; }
        public string description { get; set; }
        public string category { get; set; }

        [JsonProperty("attendees")]
        public ICollection<AttendeeDto> UserRecargas {get; set;}
    }
}