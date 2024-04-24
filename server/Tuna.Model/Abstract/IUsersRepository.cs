using Tuna.Model.Dto;

namespace Tuna.Model.Abstract;

public interface IUsersRepository
{
	Task<UserDto[]> FindAll();

	Task Save(UserDto userDto);
}
