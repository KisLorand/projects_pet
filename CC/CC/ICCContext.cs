using Microsoft.EntityFrameworkCore;

namespace CC
{
	public interface ICCContext
	{
		DbSet<User> Users { get; set; }
		DbSet<RefreshToken> UserTokens { get; set; }
		void SaveChanges();
		
	}
}
