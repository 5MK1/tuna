using Redis.OM;
using Redis.OM.Searching;
using Tuna.Model.Abstract;
using Tuna.Model.Dto;

namespace Tuna.Repository.InMemory.Users;

public class UsersRepository : IUsersRepository
{
	private readonly IRedisCollection<UserDocument> _usersCollection;

	public UsersRepository(RedisConnectionProvider connectionProvider)
	{
		_usersCollection = connectionProvider.RedisCollection<UserDocument>();
	}

	public async Task<UserDto[]> FindAll()
	{
		var result = await _usersCollection.ToListAsync();
		return result
			.Select(doc => new UserDto(Guid.Parse(doc.Id), doc.Name))
			.ToArray();
	}

	public Task Save(UserDto userDto)
	{
		return _usersCollection.InsertAsync(new UserDocument
		{
			Id = userDto.Id.ToString(),
			Name = userDto.Name
		});
	}
}
