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

	public async Task<UserAccountDto?> SearchByName(string name)
	{
		var document = await _usersAccountsCollection
			.FirstOrDefaultAsync(doc => doc.Name == name);

		return document is null ? null : Map(document);
	}

	public async Task<UserAccountDto[]> FindAll()
	{
		var documents = await _usersAccountsCollection.ToListAsync();
		return documents.Select(Map).ToArray();
	}

	public Task Crate(UserAccountDto dto)
	{
		return _usersAccountsCollection.InsertAsync(
			new UserAccountDocument
			{
				Id = dto.Id.ToString(),
				Name = dto.Name,
				PasswordHash = Convert.ToBase64String(dto.PasswordHash),
				PasswordSalt = Convert.ToBase64String(dto.PasswordSalt)
			});
	}

	private static UserAccountDto Map(UserAccountDocument document)
	{
		return new UserAccountDto(
			Guid.Parse(document.Id),
			document.Name,
			Convert.FromBase64String(document.PasswordHash),
			Convert.FromBase64String(document.PasswordSalt)
		);
	}
}
