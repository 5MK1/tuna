using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tuna.Repository.PostgreSQL.Documents;

public class DocumentStorageElement
{
	public Ulid Id { get; set; }

	public Ulid AuthorId { get; set; }

	public Ulid[] ContributorsIds { get; set; } = Array.Empty<Ulid>();

	public string? Title { get; set; }
}

public class DocumentConfiguration : IEntityTypeConfiguration<DocumentStorageElement>
{
	public void Configure(EntityTypeBuilder<DocumentStorageElement> builder)
	{
		builder.Metadata.SetTableName("document");
		builder.HasKey(se => se.Id);
		builder.HasIndex(se => se.AuthorId).HasMethod("hash");
		builder.Property(se => se.Title).HasMaxLength(100);
	}
}