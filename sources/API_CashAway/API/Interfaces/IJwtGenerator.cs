using Domain;

namespace API.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateToken(AppUser user);
    }
}