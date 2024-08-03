using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tuna.Repository.PostgreSQL.Documents.StorageElements;

public class DocumentStorageElement
{
	public Ulid Id { get; set; }

	public Ulid AuthorId { get; set; }

	public string? Title { get; set; }

	public IList<DocumentNodeStorageElement> Nodes { get; set; } = Array.Empty<DocumentNodeStorageElement>();
}

public class DocumentConfiguration : IEntityTypeConfiguration<DocumentStorageElement>
{
	public void Configure(EntityTypeBuilder<DocumentStorageElement> builder)
	{
		builder.Metadata.SetTableName("document");
		builder.HasKey(se => se.Id);
		builder.HasIndex(se => se.AuthorId).HasMethod("hash");
		builder.Property(se => se.Title).HasMaxLength(100);
		builder.HasMany(se => se.Nodes)
			.WithOne()
			.HasForeignKey(nodeSe => nodeSe.DocumentId);
	}
}