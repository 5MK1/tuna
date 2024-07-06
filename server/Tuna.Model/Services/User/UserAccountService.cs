using RedLockNet;
using Tuna.Model.DomainObjects.Accounts;
using Tuna.Model.Dto;

namespace Tuna.Model.Services.User;

public class UserAccountService : IUserAccountService
{
	private readonly IUserAccountsRepository _repo;
	private readonly IDistributedLockFactory _lockFactory;

	public UserAccountService(
		IUserAccountsRepository repo,
		IDistributedLockFactory lockFactory
	)
	{
		_repo = repo;
		_lockFactory = lockFactory;
	}

	public async ValueTask<ILoginResult> Login(string userName, string password)
	{
		var resource = $"account:{userName}";
		await using var redLock = await _lockFactory.CreateLockAsync(resource, TimeSpan.FromMilliseconds(5));
		if (redLock.IsAcquired)
		{
			var dto = await _repo.TryGet(userName);
			return dto is not null
				? CheckExistingAccountPassword(dto, password)
				: await CreateNewAccount(userName, password);
		}

		return new LoginFailedResult(string.Empty);
	}

	private async Task<ILoginResult> CreateNewAccount(string userName, string password)
	{
		var cratePasswordResult = AccountPassword.TryCrateFrom(password);
		switch (cratePasswordResult)
		{
			case CreatePasswordFailedResult { ErrorMessage: var error }:
				return new LoginFailedResult(error);
			case PasswordCreatedResult { Password: var accountPassword }:
				var newAccountDto = new UserAccountDto(
					Id: Guid.NewGuid(),
					userName,
					accountPassword.PasswordHash,
					accountPassword.PasswordSalt
				);
				await _repo.Create(newAccountDto);
				return new LoginSuccessResult(newAccountDto.Id, newAccountDto.Name);
			default:
				throw new InvalidOperationException();
		}
	}

	private ILoginResult CheckExistingAccountPassword(UserAccountDto dto, string password)
	{
		var existingAccountPassword = new AccountPassword(dto.PasswordHash, dto.PasswordSalt);
		return existingAccountPassword.EqualsTo(password)
			? new LoginSuccessResult(dto.Id, dto.Name)
			: LoginFailedResult.DueToPasswordNotMatch();
	}
}