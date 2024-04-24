using Redis.OM.Modeling;

namespace Tuna.Repository.InMemory.Users;

[Document(
	IndexName = "UsersIndex",
	StorageType = StorageType.Json,
	Prefixes = new string[] { "user" }
)]
public class UserDocument
{
	[RedisIdField]
	public string Id { get; set; } = Guid.NewGuid().ToString();

	[Indexed(Sortable = true)]
	public string Name { get; set; } = string.Empty;
}
