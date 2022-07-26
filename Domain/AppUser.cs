using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName {get; set;}

        public virtual ICollection<UserRecarga> UserRecargas {get; set;} 
    }
}