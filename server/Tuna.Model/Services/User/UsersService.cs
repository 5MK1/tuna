using Tuna.Model.Abstract;
using Tuna.Model.Dto;

namespace Tuna.Model.Services.User;

public class UsersService : IUsersService
{
	private readonly IUsersRepository repo;

	public UsersService(IUsersRepository repo)
	{
		this.repo = repo;
	}

	public Task<UserDto[]> FindAll()
	{
		return repo.FindAll();
	}

	public Task Save(UserDto userDto)
	{
		return repo.Save(userDto);
	}
}
