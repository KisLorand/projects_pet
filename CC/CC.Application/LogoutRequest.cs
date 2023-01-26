using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CC.Application
{
	public class LogoutRequest
	{
		public RefreshToken userToken {get;set;}
		public DateTime logoutTime {get;set;}
		public User User {get;set;}
	}
}
