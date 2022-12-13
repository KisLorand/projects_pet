using CC.DTOs;
using CC.Properties;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace CC.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		public static User user = new User();

		[HttpPost("register")]
		public async Task<ActionResult<User>> Register(UserDto userData)
		{
			CreatePasswordHash(userData.Password, out byte[] passwordHash, out byte[] passwordSalt);

			user.Username = userData.Username;
			user.PasswordHash = passwordHash;
			user.PasswordSalt = passwordSalt;

			return Ok(user);
		}


		[HttpPost("login")]
		public async Task<ActionResult<string>> Login(UserDto userData)
		{
			if (user.Username == userData.Username)
			{
				return BadRequest("User not found");
			}

			if (VerifyPasswordHash(userData.Password, user.PasswordHash, user.PasswordSalt))
			{
				return BadRequest("Wrong Password");
			}

			return Ok("Token");
		}

		//change the hashing in prod
		private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			using (var hmc = new HMACSHA512())
			{
				passwordSalt = hmc.Key;
				passwordHash = hmc.ComputeHash(
					System.Text.Encoding.UTF8.GetBytes(password)
					);

			}
		}
		//

		private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
		{
			using (var hmc = new HMACSHA512(passwordSalt))
			{
				var computedHash = hmc.ComputeHash(
					System.Text.Encoding.UTF8.GetBytes(password)
					);
				return computedHash.SequenceEqual(passwordHash);
			}
		}

	}
}
