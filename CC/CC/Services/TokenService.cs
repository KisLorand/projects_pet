using CC.DTOs;

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

		public RefreshTokenDTO GetRefreshToken(int userId, string token)
		{
			throw new NotImplementedException();
		}

		public List<RefreshTokenDTO> GetTokenByUserId(int userId)
		{
			List<RefreshTokenDTO> tokens = _dbContext.UserTokens.Where(token => token.UserId == userId).ToList();
			_dbContext.SaveChanges();

			return tokens;
		}
	}
}
