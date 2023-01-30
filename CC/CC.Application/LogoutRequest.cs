using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CC.Application
{
	public class LogoutRequest
	{
		public RefreshToken UserToken {get;set;}
		public DateTime LogoutTime {get;set;}
	}
}
