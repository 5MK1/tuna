using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tuna.Repository.PostgreSQL.Documents.StorageElements;

public class DocumentNodeStorageElement
{
	public Ulid Id { get; set; }

	public Ulid DocumentId { get; set; }

	public Ulid? ParentNodeId { get; set; }

	public DocumentNodeData Data { get; set; } = new();

	public IList<DocumentNodeActionStorageElement> Actions { get; set; } =
		Array.Empty<DocumentNodeActionStorageElement>();
}

public class DocumentNodeConfiguration : IEntityTypeConfiguration<DocumentNodeStorageElement>
{
	public void Configure(EntityTypeBuilder<DocumentNodeStorageElement> builder)
	{
		builder.Metadata.SetTableName("documentNode");
		builder.HasKey(se => se.Id);
		builder.HasIndex(se => se.DocumentId).HasMethod("hash");
		builder.Property(se => se.Data).HasColumnType("jsonb");
		builder.HasMany(se => se.Actions)
			.WithOne()
			.HasForeignKey(se => se.DocumentNodeId);
	}
}