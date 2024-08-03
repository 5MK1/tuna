using Tuna.Model.Dto.Actions;
using Tuna.Model.Services.Documents;
using Tuna.Repository.PostgreSQL.Abstract;
using Tuna.Repository.PostgreSQL.Documents.StorageElements;

namespace Tuna.Repository.PostgreSQL.Documents;

public class DocumentNodesActionsRepository : IDocumentNodeActionsRepository
{
	private readonly TunaDbContext _dbContext;
	private readonly IModelMapper<DocumentNodeActionDto, DocumentNodeActionStorageElement> _mapper;

	public DocumentNodesActionsRepository(
		TunaDbContext dbContext,
		IModelMapper<DocumentNodeActionDto, DocumentNodeActionStorageElement> mapper
	)
	{
		_dbContext = dbContext;
		_mapper = mapper;
	}

	public async Task Save(DocumentNodeActionDto actionDto)
	{
		var storageElement = _mapper.Map(actionDto);
		await _dbContext.DocumentNodesActions.AddAsync(storageElement);
		await _dbContext.SaveChangesAsync();
	}
}