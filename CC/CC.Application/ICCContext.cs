using CC.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CC
{
	public interface ICCContext
	{
		DbSet<User> Users { get; set; }
		DbSet<RefreshTokenDTO> UserTokens { get; set; }
		void SaveChanges();
		
	}
}
