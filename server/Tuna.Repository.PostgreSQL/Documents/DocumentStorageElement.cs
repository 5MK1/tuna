using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tuna.Repository.PostgreSQL.Documents;

[Table("Document")]
public class DocumentStorageElement
{
	[Key]
	public Guid Id { get; set; }

	public Guid AuthorId { get; set; }

	public Guid[] ContributorsIds { get; set; } = Array.Empty<Guid>();

	[StringLength(100)]
	public string? Name { get; set; }

	public string Content { get; set; } = string.Empty;
}