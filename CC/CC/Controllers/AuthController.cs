﻿using CC.Application;
using CC.DTOs;
using CC.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace CC.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		public static User user = new User();
		private ILogger<AuthController> _logger;
		private readonly IConfiguration _configuration;
		private readonly IUserService _userService;
		private readonly ITokenService _tokenService;

		public AuthController(IConfiguration configuration, IUserService userService, ITokenService tokenService, ILogger<AuthController> logger)
		{
			_configuration = configuration;
			_userService = userService;
			_tokenService = tokenService;
			_logger = logger;
		}

		// could be moved
		[HttpGet]
		[Authorize]
		public ActionResult<string> GetMe()
		{
			string userName =_userService.GetUserName();
			return Ok(userName);

			/*var userName = User?.Identity?.Name;
			var role = User.FindFirstValue(ClaimTypes.Role);
			return Ok(userName);*/
		}
		//

		[HttpGet("GetTestUser")]
		public ActionResult<User> GetTestUser()
		{
			var user =_userService.GetUserByName("John");
			return Ok(user);
		}


		[HttpPost("register")]
		public async Task<ActionResult<User>> Register(UserDto userData)
		{
			CreatePasswordHash(userData.Password, out byte[] passwordHash, out byte[] passwordSalt);

			var newUser = new User();
			newUser.Username = userData.Username;
			newUser.PasswordHash = passwordHash;
			newUser.PasswordSalt = passwordSalt;

			_userService.AddUser(newUser);

			return Ok(newUser);
		}


		[HttpPost("login")]
		public async Task<ActionResult<RefreshToken>> Login(UserDto userData)
		{
			user = _userService.GetUserByName(userData.Username);

			if (user is null || user.Username != userData.Username )
			{
				return NotFound("User not found");
			}

			if (!VerifyPasswordHash(userData.Password, user.PasswordHash, user.PasswordSalt))
			{
				return BadRequest(userData.Password);
			}

			string token = CreateToken(user); // return a token that conains user info

			var refreshToken = GenerateRefreshToken(token);
			SetRefreshToken(refreshToken); //http only, on javascript will be able to read it

			_tokenService.AddToken(new RefreshTokenDTO {
				UserId=user.Id,
				Token=refreshToken.Token,
				Created=refreshToken.Created,
				Expires=refreshToken.Expires,
			});

			return Ok(refreshToken);
		}

		//should be protected
		[HttpPost("logout")]
		public async Task<ActionResult<RefreshToken>> Logout(RefreshToken request)
		{
			RefreshTokenDTO refreshToken = _tokenService.GetRefreshTokenByTokenString(request.Token);
			if (refreshToken is null)
			{
				return NotFound("User or Token Not Found");
			}

/*			var currentUser = _userService.GetUserByName(request.User.Username);
			if(currentUser is null)
			{
				return BadRequest("No Token or User Found In Request");
			}*/

			var updatedToken = _tokenService.SetTokenExpiration(refreshToken.Token, DateTime.Now);

			return Ok(updatedToken);
		}

		[HttpPost("refresh-token")] // periodically called by the frontend to refresh the token
		public async Task<ActionResult<string>> RefreshToken()
		{
			var refreshToken = Request.Cookies["refreshToken"];

			//search the db, for user who has this token
			//
			if (!user.RefreshToken.Equals(refreshToken))
			{
				return Unauthorized("Invalid Refresh Token");
			}
			else if (user.TokenExpires < DateTime.Now)
			{
				return Unauthorized("Token expired");
			}
			//

			string token = CreateToken(user);
			var newRefreshToken = GenerateRefreshToken(token);
			SetRefreshToken(newRefreshToken);

			return Ok(token);
		}


		[HttpPost("getusertoken")]
		//[Authorize]
		public async Task<ActionResult<RefreshTokenDTO>> GetUserToken(RefreshToken refreshToken)
		{
			RefreshTokenDTO token = _tokenService.GetRefreshTokenByTokenString(refreshToken.Token);
			return Ok(token);
		}

		//change the hashing in prod
		private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			using (var hmac = new HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
			}
		}
		//

		private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
		{
			using (var hmac = new HMACSHA512(passwordSalt))
			{
				var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				return computedHash.SequenceEqual(passwordHash);
			}
		}

		private string CreateToken(User user)
		{
			List<Claim> claims = new List<Claim>
			{
				new Claim(ClaimTypes.Name, user.Username),
				new Claim(ClaimTypes.Role, "Admin"),
				// Id, email should be added
			};

			var key = new SymmetricSecurityKey(
				System.Text.Encoding.UTF8.GetBytes(
					_configuration.GetSection("AppSettings:Token").Value
					)
				);

			var credentials = new SigningCredentials(
				key, SecurityAlgorithms.HmacSha512Signature
				);

			var token = new JwtSecurityToken(
				claims: claims,
				expires: DateTime.UtcNow.AddDays(1), //VALID FOR ONE DAY
				signingCredentials: credentials
				);

			var jwt = new JwtSecurityTokenHandler().WriteToken(token);

			return jwt;
		}


		private RefreshToken GenerateRefreshToken(string token)
		{
			var refreshToken = new RefreshToken
			{
				Token = token, //Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
				Expires = DateTime.Now.AddDays(1), // could be 15 mins
				Created = DateTime.Now
			};

			return refreshToken;
		}

		private void SetRefreshToken(RefreshToken refreshToken)
		{
			var cookieOptions = new CookieOptions 
			{
				HttpOnly = true,
				Expires = refreshToken.Expires
			};
			Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);

			user.RefreshToken = refreshToken.Token;
			user.TokenCreated = refreshToken.Created;
			user.TokenExpires = refreshToken.Expires;
		}
	}
}
