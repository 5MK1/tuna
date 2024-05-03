using Tuna.Model.DomainObjects.Accounts;
using Tuna.Model.Dto;

namespace Tuna.Model.Services.User;

public interface IUserAccountService
{
	Task<ILoginResult> Login(string userName, string password);
}

public class UserAccountService : IUserAccountService
{
	private readonly IUserAccountsRepository _repo;

	public UserAccountService(IUserAccountsRepository repo)
	{
		_repo = repo;
	}

	public async Task<ILoginResult> Login(string userName, string password)
	{
		// bug: need to lock or transaction
		var dto = await _repo.SearchByName(userName);
		if (dto is null)
		{
			var cratePasswordResult = AccountPassword.TryCrateFrom(password);
			switch (cratePasswordResult)
			{
				case CreatePasswordFailedResult { ErrorMessage: var error }:
					return new LoginFailedResult(error);
				case PasswordCreateResult { Password: var accountPassword }:
					var newAccountDto = new UserAccountDto(
						Id: Guid.NewGuid(),
						userName,
						accountPassword.PasswordHash,
						accountPassword.PasswordSalt
					);
					await _repo.Crate(newAccountDto);
					return new LoginSuccessResult(newAccountDto.Id, newAccountDto.Name);
					break;
				default:
					throw new InvalidOperationException();
			}
		}

		var existingAccountPassword = new AccountPassword(dto.PasswordHash, dto.PasswordSalt);
		return existingAccountPassword.EqualsTo(password)
			? new LoginSuccessResult(dto.Id, dto.Name)
			: LoginFailedResult.DueToPasswordNotMatch();
	}
}
