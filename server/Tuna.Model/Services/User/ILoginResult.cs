namespace Tuna.Model.Services.User;

public interface ILoginResult
{
}

public class LoginFailedResult : ILoginResult
{
	public string FailureMessage { get; }

	public LoginFailedResult(string failureMessage)
	{
		FailureMessage = failureMessage;
	}

	public static LoginFailedResult DueToPasswordNotMatch()
	{
		return new LoginFailedResult("Invalid password");
	}
}

public class LoginSuccessResult : ILoginResult
{
	public string UserName { get; }

	public Guid UserId { get; }

	public LoginSuccessResult(Guid userId, string userName)
	{
		UserId = userId;
		UserName = userName;
	}
}
