namespace Tuna.Model.DomainObjects.Accounts;

public class CreatePasswordFailedResult : ICreatePasswordResult
{
	public string ErrorMessage { get; }

	public CreatePasswordFailedResult(string errorMessage)
	{
		ErrorMessage = errorMessage;
	}

	public static CreatePasswordFailedResult DueToNotEnoughLength(byte minimumLength)
	{
		return new CreatePasswordFailedResult($"Password length must be at least {minimumLength} characters");
	}
}