using Tuna.Model.Dto;

namespace Tuna.Model.Services.User;

public interface IUserAccountsRepository
{
	Task<UserAccountDto?> TryGet(string name);

	Task Create(UserAccountDto dto);
}
