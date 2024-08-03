using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tuna.Repository.PostgreSQL.Documents.StorageElements;

public class DocumentNodeActionStorageElement
{
	public Ulid Id { get; set; }

	public Ulid UserId { get; set; }

	public Ulid DocumentNodeId { get; set; }

	public DateTime CreatedAt { get; set; }

	public string ActionType { get; set; } = string.Empty;

	public DocumentNodeActionData Data { get; set; } = null!;
}

public class DocumentNodeActionConfiguration : IEntityTypeConfiguration<DocumentNodeActionStorageElement>
{
	public void Configure(EntityTypeBuilder<DocumentNodeActionStorageElement> builder)
	{
		builder.Metadata.SetTableName("documentNodeAction");
		builder.HasKey(se => se.Id);
		builder.HasIndex(se => se.UserId).HasMethod("hash");
		builder.HasIndex(se => new { se.DocumentNodeId, se.CreatedAt });
		builder.Property(se => se.ActionType).HasMaxLength(20);
		builder.Property(se => se.Data).HasColumnType("jsonb");
	}
}