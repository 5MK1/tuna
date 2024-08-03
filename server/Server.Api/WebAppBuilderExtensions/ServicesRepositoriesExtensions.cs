using Scrutor;
using Tuna.Repository.InMemory;
using Tuna.Repository.PostgreSQL;
using Tuna.Repository.PostgreSQL.Abstract;

namespace Server.Api.WebAppBuilderExtensions;

public static class ServicesRepositoriesExtensions
{
	public static IServiceCollection AddTransactionProvider(this IServiceCollection serviceCollection)
	{
		return serviceCollection.AddScoped<ITransactionProvider, TransactionProvider>();
	}

	public static ITypeSourceSelector AddScopedBySuffixFor<TAssemblyOf>(this ITypeSourceSelector selector, string suffix)
	{
		selector.FromAssemblyOf<TAssemblyOf>()
			.AddClasses(filter => filter.Where(type => type.Name.EndsWith(suffix)))
			.AsImplementedInterfaces()
			.WithScopedLifetime();
		return selector;
	}
}