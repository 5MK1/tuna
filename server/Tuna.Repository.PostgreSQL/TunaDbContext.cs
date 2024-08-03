using Microsoft.EntityFrameworkCore;
using Tuna.Repository.PostgreSQL.Converters;
using Tuna.Repository.PostgreSQL.Documents;
using Tuna.Repository.PostgreSQL.Documents.StorageElements;

namespace Tuna.Repository.PostgreSQL;

public class TunaDbContext : DbContext
{
	public DbSet<DocumentStorageElement> Documents { get; set; } = default!;

	public DbSet<DocumentNodeStorageElement> Nodes { get; set; } = default!;

	public DbSet<DocumentNodeActionStorageElement> DocumentNodesActions { get; set; } = default!;

	public TunaDbContext(DbContextOptions<TunaDbContext> options)
		: base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(TunaDbContext).Assembly);
	}

	protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
	{
		configurationBuilder.Properties<Ulid>().HaveConversion<UlidToStringConverter>();
		configurationBuilder.Properties<Ulid[]>().HaveConversion<UlidArrayToStringArrayConverter>();
	}
}