using Redis.OM.Modeling;

namespace Tuna.Repository.InMemory.Documents;

[Document(
	StorageType = StorageType.Hash,
	Prefixes = new[] { "document" }
)]
public class DocumentDocument
{
	[RedisIdField]
	public string Id { get; set; } = string.Empty;

	public string AuthorId { get; set; } = string.Empty;

	public string[] Contributors { get; set; } = Array.Empty<string>();

	public string Content { get; set; } = string.Empty;
}