using Scrutor;
using Tuna.Repository.InMemory;

namespace Server.Api.WebAppBuilderExtensions;

public static class ServicesRepositoriesExtensions
{
	public static ITypeSourceSelector AddRepositories(this ITypeSourceSelector typeSourceSelector,
		string repoTypeNameSuffix = "Repository")
	{
		typeSourceSelector.FromAssemblyOf<IRepositoryInMemoryAssemblyMarker>()
			.AddClasses(filter => filter.Where(type => type.Name.EndsWith(repoTypeNameSuffix)))
			.AsImplementedInterfaces()
			.WithScopedLifetime();
		return typeSourceSelector;
	}
}