using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tuna.Repository.PostgreSQL.Documents;

public class DocumentStorageElement
{
	public Guid Id { get; set; }

	public Guid AuthorId { get; set; }

	public Guid[] ContributorsIds { get; set; } = Array.Empty<Guid>();

	public string? Name { get; set; }

	public string Content { get; set; } = string.Empty;
}

public class DocumentConfiguration : IEntityTypeConfiguration<DocumentStorageElement>
{
	public void Configure(EntityTypeBuilder<DocumentStorageElement> builder)
	{
		builder.Metadata.SetTableName("document");
		builder.HasKey(se => se.Id);
		builder.HasIndex(se => se.AuthorId).HasMethod("hash");
		builder.Property(se => se.Name).HasMaxLength(100);
	}
}