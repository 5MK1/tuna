using Tuna.Model.Dto;

namespace Tuna.Model.Services.User;

public interface IUserAccountsRepository
{
	Task<UserAccountDto?> SearchByName(string name);

	Task<UserAccountDto[]> FindAll();

	Task Crate(UserAccountDto dto);
}
