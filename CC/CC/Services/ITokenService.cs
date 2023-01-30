using CC.DTOs;

namespace CC.Services
{
	public interface ITokenService
	{
		List<RefreshTokenDTO> GetTokenByUserId(int userId);

		RefreshTokenDTO GetRefreshToken(int userId, string token);
		RefreshTokenDTO SetTokenExpiration(string token, DateTime logoutTime);
		RefreshTokenDTO AddToken(RefreshTokenDTO userToken);
		RefreshTokenDTO GetRefreshTokenByTokenString(string token);
	}
}
