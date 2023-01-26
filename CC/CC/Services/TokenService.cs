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

		public RefreshTokenDTO GetRefreshToken(int userId, string userToken)
		{
			return _dbContext.UserTokens.Where(token => token.UserId == userId && token.Token == userToken).FirstOrDefault();
		}

		public List<RefreshTokenDTO> GetTokenByUserId(int userId)
		{
			List<RefreshTokenDTO> tokens = _dbContext.UserTokens.Where(token => token.UserId == userId).ToList();
			_dbContext.SaveChanges();

			return tokens;
		}

		public RefreshTokenDTO SetTokenExpiration(string userToken, DateTime logoutTime)
		{
			var currentToken = _dbContext.UserTokens.Where(token => token.Token == userToken).FirstOrDefault();
			if (currentToken != null)
			{
				currentToken.Expires = logoutTime;
			}
			_dbContext.SaveChanges();

			return currentToken;
		}
	}
}
