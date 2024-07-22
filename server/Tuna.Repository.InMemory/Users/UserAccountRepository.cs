using Redis.OM;
using Redis.OM.Searching;
using Tuna.Model.Dto;
using Tuna.Model.Services.User;

namespace Tuna.Repository.InMemory.Users;

public class UserAccountRepository : IUserAccountsRepository
{
	private readonly IRedisCollection<UserAccountDocument> _usersAccountsCollection;

	public UserAccountRepository(RedisConnectionProvider connectionProvider)
	{
		_usersAccountsCollection = connectionProvider.RedisCollection<UserAccountDocument>();
	}

	public async Task<UserAccountDto?> TryGet(string name)
	{
		var document = await _usersAccountsCollection.FindByIdAsync(name);
		return document is null ? null : Map(document);
	}

	public Task Create(UserAccountDto dto)
	{
		return _usersAccountsCollection.InsertAsync(Map(dto));
	}

	private static UserAccountDocument Map(UserAccountDto dto)
	{
		return new UserAccountDocument
		{
			Name = dto.Name,
			UserId = dto.Id.ToString(),
			PasswordHash = Convert.ToBase64String(dto.PasswordHash),
			PasswordSalt = Convert.ToBase64String(dto.PasswordSalt)
		};
	}

	private static UserAccountDto Map(UserAccountDocument document)
	{
		return new UserAccountDto(
			Id: Ulid.Parse(document.UserId),
			Name: document.Name,
			PasswordHash: Convert.FromBase64String(document.PasswordHash),
			PasswordSalt: Convert.FromBase64String(document.PasswordSalt)
		);
	}
}
