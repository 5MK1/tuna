using Microsoft.EntityFrameworkCore.Storage;

namespace Tuna.Repository.PostgreSQL.Abstract;

public interface ITransactionProvider
{
	IDbContextTransaction Begin();

	Task<IDbContextTransaction> BeginAsync();
}