using CC.DTOs;

namespace CC.Services
{
	public interface ITokenService
	{
		List<RefreshTokenDTO> GetTokenByUserId(int userId);

		RefreshTokenDTO GetRefreshToken(int userId, string token);
	}
}
