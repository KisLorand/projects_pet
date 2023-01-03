
namespace CC
{
	public class RefreshToken
	{
		//public int Id { get; set; } for db storage, connected to a user
		public string Token { get; set; } = string.Empty;
		public DateTime Created { get; set; } = DateTime.Now;
		public DateTime Expires { get; set; } 


	}
}
