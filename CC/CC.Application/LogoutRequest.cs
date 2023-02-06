using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CC.Application
{
	public class LogoutRequest
	{
		public string UserToken {get;set;}

		public DateTime Created { get; set; }
		public DateTime Expires { get; set; }
		public DateTime LogoutTime {get;set;}
	}
}
