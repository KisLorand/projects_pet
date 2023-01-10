using CC.DTOs;
using Microsoft.EntityFrameworkCore;


namespace CC.Infrastructure
{
	public class CCContext : DbContext, ICCContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<RefreshTokenDTO> UserTokens { get; set; }

		public CCContext(DbContextOptions<CCContext> options)
		: base(options)
		{

		}

		void ICCContext.SaveChanges()
		{
			this.SaveChanges();
		}
	}
}