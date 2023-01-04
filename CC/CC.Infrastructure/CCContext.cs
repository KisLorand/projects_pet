
using Microsoft.EntityFrameworkCore;


namespace CC.Infrastructure
{
	public class BadcampContext : DbContext, ICCContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<RefreshToken> UserTokens { get; set; }

		void ICCContext.SaveChanges()
		{
			this.SaveChanges();
		}
	}
}