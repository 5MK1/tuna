using Microsoft.EntityFrameworkCore.Storage;
using Tuna.Repository.PostgreSQL.Abstract;

namespace Tuna.Repository.PostgreSQL;

public class TransactionProvider : ITransactionProvider
{
	private readonly TunaDbContext _dbContext;

	public TransactionProvider(TunaDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public IDbContextTransaction Begin()
	{
		return _dbContext.Database.BeginTransaction();
	}

	public Task<IDbContextTransaction> BeginAsync()
	{
		return _dbContext.Database.BeginTransactionAsync();
	}
}