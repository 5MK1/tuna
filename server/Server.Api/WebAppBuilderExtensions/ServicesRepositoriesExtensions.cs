using Scrutor;
using Tuna.Repository.InMemory;
using Tuna.Repository.PostgreSQL;

namespace Server.Api.WebAppBuilderExtensions;

public static class ServicesRepositoriesExtensions
{
	public static void AddInmemoryRepositories(ITypeSourceSelector typeSourceSelector)
	{
		typeSourceSelector.FromAssemblyOf<IRepositoryInMemoryAssemblyMarker>()
			.AddClasses(filter => filter.Where(type => type.Name.EndsWith("Repository")))
			.AsImplementedInterfaces()
			.WithScopedLifetime();
	}

	public static void AddPersistRepositories(ITypeSourceSelector typeSourceSelector)
	{
		typeSourceSelector.FromAssemblyOf<RepositoryPostgreSqlAssemblyMarker>()
			.AddClasses(filter => filter.Where(type => type.Name.EndsWith("Repository")))
			.AsImplementedInterfaces()
			.WithScopedLifetime();
	}

	public static IServiceCollection AddScanners(this IServiceCollection serviceCollection,
		params Action<ITypeSourceSelector>[] scanners)
	{
		return serviceCollection.Scan(selector =>
		{
			foreach (var scanner in scanners)
			{
				scanner(selector);
			}
		});
	}
}