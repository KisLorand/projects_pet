﻿namespace CC.Services
{
	public interface IUserService
	{
		string GetUserName();
		User AddUser(User user);
	}
}
