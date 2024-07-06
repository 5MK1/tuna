namespace Tuna.Model.DomainObjects.Accounts;

public class PasswordCreatedResult : ICreatePasswordResult
{
	public AccountPassword Password { get; }

	public PasswordCreatedResult(AccountPassword password)
	{
		Password = password;
	}
}