using Microsoft.EntityFrameworkCore;
using Tuna.Model.Dto;
using Tuna.Model.Services.Documents;

namespace Tuna.Repository.PostgreSQL.Documents;

public class DocumentsRepository : IDocumentsRepository
{
	private readonly TunaDbContext _dbContext;

	public DocumentsRepository(TunaDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<DocumentDto?> TryGet(Ulid documentId)
	{
		var document = await _dbContext
			.Documents
			.FirstOrDefaultAsync(se => se.Id == documentId);
		return document is null ? null : Map(document);
	}

	public async Task<DocumentDto[]> SearchByAuthorId(Ulid authorId)
	{
		var storageElements = await _dbContext
			.Documents
			.Where(se => se.AuthorId == authorId)
			.ToArrayAsync();

		return storageElements
			.Select(Map)
			.ToArray();
	}

	public async Task Create(DocumentDto dto)
	{
		var se = Map(dto);
		await _dbContext.Documents.AddAsync(se);
		await _dbContext.SaveChangesAsync();
	}

	private static DocumentDto Map(DocumentStorageElement se)
	{
		return new DocumentDto(se.Id, se.AuthorId, se.ContributorsIds, se.Title ?? string.Empty);
	}

	private static DocumentStorageElement Map(DocumentDto dto)
	{
		return new DocumentStorageElement
		{
			Id = dto.Id,
			AuthorId = dto.AuthorId,
			ContributorsIds = dto.Contributors,
			Title = "New document"
		};
	}
}