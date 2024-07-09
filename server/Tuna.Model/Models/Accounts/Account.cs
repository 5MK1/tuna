using Tuna.Model.Dto;
using Tuna.Model.Services.User;

namespace Tuna.Model.Models.Accounts;

public class Account
{
	internal const byte MIN_USER_NAME_LENGTH = 3;

	public Guid Id { get; }

	public string Name { get; }

	internal AccountPassword Password { get; }

	internal Account(Guid id, string name, AccountPassword password)
	{
		Id = id;
		Name = name;
		Password = password;
	}

	private Account(string name, AccountPassword password)
		: this(Guid.NewGuid(), name, password)
	{
	}

	private UserAccountDto ToDto()
	{
		return new UserAccountDto(Id, Name, Password.PasswordHash, Password.PasswordSalt);
	}

	public static async Task<ILoginResult> Login(IUserAccountsRepository repo, string userName, string password)
	{
		var dto = await repo.TryGet(userName);
		return dto is not null
			? CheckExistingAccountPassword(dto, password)
			: await CreateNewAccount(repo, userName, password);
	}

	private static ILoginResult CheckExistingAccountPassword(UserAccountDto dto, string password)
	{
		var account = FromDto(dto);
		return account.Password.EqualsTo(password)
			? new LoginSuccessResult(account)
			: LoginFailedResult.DueToPasswordNotMatch();
	}

	private static async Task<ILoginResult> CreateNewAccount(
		IUserAccountsRepository repo, string userName, string password
	)
	{
		if (userName.Length < MIN_USER_NAME_LENGTH)
		{
			return LoginFailedResult.DueToUserNameIsNotLongEnough(MIN_USER_NAME_LENGTH);
		}

		if (password.Length < AccountPassword.MIN_PASSWORD_LENGTH)
		{
			return LoginFailedResult.DueToPasswordIsNotLongEnough(AccountPassword.MIN_PASSWORD_LENGTH);
		}

		var accountPassword = AccountPassword.CrateFrom(password);
		var newAccount = new Account(userName, accountPassword);
		await repo.Create(newAccount.ToDto());
		return new LoginSuccessResult(newAccount);
	}

	private static Account FromDto(UserAccountDto dto)
	{
		return new Account(dto.Id, dto.Name, new AccountPassword(dto.PasswordHash, dto.PasswordSalt));
	}
}