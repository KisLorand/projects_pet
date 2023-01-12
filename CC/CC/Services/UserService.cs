using System.Security.Claims;

namespace CC.Services
{
	public class UserService : IUserService
	{
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly ICCContext _dbContext;
		public UserService(IHttpContextAccessor httpContextAccessor, ICCContext context)
		{
			_httpContextAccessor = httpContextAccessor;
			_dbContext = context;
		}

		public string GetUserName() //GetCurrentUserName
		{
			var result = string.Empty;
			if (_httpContextAccessor.HttpContext != null)
			{
				result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
			}
			Console.WriteLine(result);
			return result;
		}

		public User GetUserById(int id)
		{
			throw new NotImplementedException();
		}

		public User GetUserByName(string userName)
		{
			throw new NotImplementedException();
		}

		public User AddUser(User user)
		{
			_dbContext.Users.Add(user);
			_dbContext.SaveChanges();

			return user;
		}
	}
}
