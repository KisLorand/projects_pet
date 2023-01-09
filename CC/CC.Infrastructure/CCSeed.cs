using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            _context.Database.Migrate();
            if (!_context.Users.Any())
            {
                _context.AddRange(
                    new User
                    {
                        Username = "John",
                        //PasswordHash = "s"

                    });
                _context.SaveChanges();
            }
        }
    }
}
