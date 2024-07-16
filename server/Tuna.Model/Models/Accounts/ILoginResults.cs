namespace Tuna.Model.Models.Accounts;

public interface ILoginResult
{
}

public class LoginFailedResult : ILoginResult
{
	public string FailureMessage { get; }

	private LoginFailedResult(string failureMessage)
	{
		FailureMessage = failureMessage;
	}

	public static LoginFailedResult DueToUserNameIsNotLongEnough(byte minimumNameLength)
	{
		return new LoginFailedResult($"The minimum name length is {minimumNameLength} characters");
	}

	public static LoginFailedResult DueToPasswordIsNotLongEnough(byte minimumPasswordLength)
	{
		return new LoginFailedResult($"The minimum password length is {minimumPasswordLength} characters");
	}

	public static LoginFailedResult DueToPasswordNotMatch()
	{
		return new LoginFailedResult("Invalid password");
	}
}

public class LoginSuccessResult : ILoginResult
{
	public Account Account { get; }
	public bool AccountJustCrated { get; }

	public LoginSuccessResult(Account account, bool accountJustCrated)
	{
		Account = account;
		AccountJustCrated = accountJustCrated;
	}
}
