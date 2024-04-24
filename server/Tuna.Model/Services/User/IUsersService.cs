using Tuna.Model.Dto;

namespace Tuna.Model.Services.User;

public interface IUsersService
{
	Task<UserDto[]> FindAll();

	Task Save(UserDto userDto);
}
