using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using CC.DTOs;
using Microsoft.EntityFrameworkCore;
namespace CC.Infrastructure
{
    public class CCSeed
    {
        private readonly CCContext _context;

        public CCSeed(CCContext context)
        {
            this._context = context;
        }
        public void Seed()
        {
            //_context.Database.Migrate();
            if (_context != null && _context.Database != null)
            {
                _context.Database.Migrate();
            }
            if (!_context.Users.Any())
            {
                using (var hmac = new HMACSHA512())
                {
                    _context.AddRange(
                        new User
                        {
                            Username = "John",
                            PasswordHash = hmac.Key,
                            PasswordSalt = hmac.ComputeHash(Encoding.UTF8.GetBytes("wasd"))
                        });
                }
                _context.SaveChanges();
            }
            if (!_context.UserTokens.Any())
            {
                using (var hmac = new HMACSHA512())
                {
                    _context.AddRange(
                        new RefreshTokenDTO
                        {
                            UserId = (_context.Users.Where(x => x.Username == "John").FirstOrDefault()).Id,
                            Token = hmac.ComputeHash(Encoding.UTF8.GetBytes("s")).ToString(),
                            Created = DateTime.Now,
                            Expires = DateTime.Now
                        });
                }
                _context.SaveChanges();
            }
        }
    }
}
