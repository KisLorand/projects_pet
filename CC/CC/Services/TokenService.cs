namespace CC.Services
{
	public class TokenService : ITokenService
	{
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly ICCContext _dbContext;
		public TokenService(IHttpContextAccessor httpContextAccessor, ICCContext context)
		{
			_httpContextAccessor = httpContextAccessor;
			_dbContext = context;
		}

		public RefreshToken GetTokenByUserId(int id)
		{
			throw new NotImplementedException();
		}
	}
}
