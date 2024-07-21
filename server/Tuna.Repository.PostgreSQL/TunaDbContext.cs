using Microsoft.EntityFrameworkCore;
using Tuna.Repository.PostgreSQL.Documents;

namespace Tuna.Repository.PostgreSQL;

public class TunaDbContext : DbContext
{
	public DbSet<DocumentStorageElement> Documents { get; set; } = default!;

	public TunaDbContext(DbContextOptions<TunaDbContext> options)
		: base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(TunaDbContext).Assembly);
	}
}