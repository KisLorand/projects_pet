﻿using CC.DTOs;
using CC.Properties;
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
		private readonly IConfiguration _configuration;

		public AuthController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

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
			if (user.Username != userData.Username)
			{
				return BadRequest("User not found");
			}

			if (!VerifyPasswordHash(userData.Password, user.PasswordHash, user.PasswordSalt))
			{
				return BadRequest(userData.Password);
			}

			string token = CreateToken(user);

			return Ok("Token");
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
				new Claim(ClaimTypes.Name, user.Username)
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

	}
}
