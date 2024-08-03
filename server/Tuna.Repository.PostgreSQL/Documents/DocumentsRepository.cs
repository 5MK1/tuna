using Microsoft.EntityFrameworkCore;
using Tuna.Model.Models.Documents;
using Tuna.Model.Services.Documents;
using Tuna.Repository.PostgreSQL.Abstract;
using Tuna.Repository.PostgreSQL.Documents.StorageElements;

namespace Tuna.Repository.PostgreSQL.Documents;

public class DocumentsRepository : IDocumentsRepository
{
	private readonly TunaDbContext _dbContext;
	private readonly IRepositoryMapper<TunaDocument, DocumentStorageElement> _documentsMapper;

	public DocumentsRepository(TunaDbContext dbContext,
		IRepositoryMapper<TunaDocument, DocumentStorageElement> documentsMapper
	)
	{
		_dbContext = dbContext;
		_documentsMapper = documentsMapper;
	}

	public async Task<TunaDocument?> TryGetForAuthorId(Ulid authorId, Ulid documentId)
	{
		var document = await _dbContext
			.Documents
			.FirstOrDefaultAsync(se => se.AuthorId == authorId && se.Id == documentId);
		return document is null ? null : _documentsMapper.Map(document);
	}

	public async Task<TunaDocument[]> ReadByAuthorId(Ulid authorId)
	{
		var storageElements = await _dbContext
			.Documents
			.Where(se => se.AuthorId == authorId)
			.ToArrayAsync();

		return storageElements.Select(_documentsMapper.Map).ToArray();
	}

	public async Task Create(TunaDocument dto)
	{
		var se = _documentsMapper.Map(dto);
		await _dbContext.Documents.AddAsync(se);
		await _dbContext.SaveChangesAsync();
	}
}