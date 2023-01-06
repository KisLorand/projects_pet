namespace CC.DTOs
{
	public class RefreshTokenDTO
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public string Token { get; set; } = string.Empty;
		public DateTime Created { get; set; } = DateTime.Now;
		public DateTime Expires { get; set; }
	}
}
