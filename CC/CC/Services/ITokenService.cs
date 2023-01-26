namespace CC.Services
{
	public interface ITokenService
	{
		RefreshToken GetTokenByUserId(int id);
	}
}
