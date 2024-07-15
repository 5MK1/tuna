using Scrutor;
using Tuna.Repository.InMemory;

namespace Server.Api.WebAppBuilderExtensions;

public static class ServicesRepositoriesExtensions
{
	public static void AddRepositories(ITypeSourceSelector typeSourceSelector)
	{
		typeSourceSelector.FromAssemblyOf<IRepositoryInMemoryAssemblyMarker>()
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