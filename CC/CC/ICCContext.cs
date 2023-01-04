using Microsoft.EntityFrameworkCore;

namespace CC
{
	public interface ICCContext
	{
        DbSet<User> Users { get; set; }
        void SaveChanges();
    }
}
