using Redis.OM.Modeling;

namespace Tuna.Repository.InMemory.Users;

[Document(
	IndexName = "UsersIndex",
	StorageType = StorageType.Json,
	Prefixes = new string[] { "account" }
)]
public class UserAccountDocument
{
	[Indexed]
	public string Id { get; set; } = string.Empty;

	[Indexed]
	public string Name { get; set; } = string.Empty;

	public string PasswordHash { get; set; } = string.Empty;

	public string PasswordSalt { get; set; } = string.Empty;
}
