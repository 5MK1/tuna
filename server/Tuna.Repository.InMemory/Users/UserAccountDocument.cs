using Redis.OM.Modeling;

namespace Tuna.Repository.InMemory.Users;

[Document(
	StorageType = StorageType.Hash,
	Prefixes = new[] { "account" }
)]
public class UserAccountDocument
{
	[RedisIdField]
	public string Name { get; set; } = string.Empty;

	public string UserId { get; set; } = string.Empty;

	public string PasswordHash { get; set; } = string.Empty;

	public string PasswordSalt { get; set; } = string.Empty;
}
